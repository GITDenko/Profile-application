import { User, AppApprover, AppUser } from "Types/user"
import { Authorized, DecodedToken, LedningsgruppGroup, LogikfabrikenGroup, TokenPayload } from "Types/auth"
import { AuthenticationErrror, AuthorizationError } from "Types/errors"
import { decodeToken, getJwk, verifySignature, verifyTokenValidity } from "./jwt"

export const authorize = async (req: Request): Promise<Authorized> => {
  return await verify(req)
}

const verify = async (req: Request): Promise<Authorized> => {
  try {
    const authorizationHeader = req.headers.get("Authorization")
    //If dev env and no token is provided then mock the user context
    if (!authorizationHeader && MODE === "dev")
      return {
        user: {
          email: "John.Doe@logikfabriken.se",
          name: "John Doe",
          roles: [AppUser, AppApprover],
        },
        token: "",
      }

    if (!authorizationHeader) throw new AuthenticationErrror()

    const token = authorizationHeader.replace("Bearer ", "")

    if (!token) {
      console.error("AuthError: No token in header")
      throw new AuthenticationErrror()
    }

    const { header, payload }: DecodedToken = decodeToken(token)
    verifyTokenValidity(payload, ["api://9e57a408-032f-45e1-a567-8615fd13d31b", "de67adef-e2d0-4b88-9095-507ceda874c6", "api://f0f06431-4b42-4a5d-b7c5-a80c2566c29b"])

    // Find JWK matching kid
    const jwk = await getJwk(header.kid)

    if (!jwk) {
      console.error(`AuthError: Found no jwk matching kid: ${header.kid}`)
      throw new AuthenticationErrror()
    }
    const sigValid = await verifySignature(token, jwk)
    if (!sigValid) {
      console.error("AuthError: Invalid signature")
      throw new AuthenticationErrror() //Authz?
    }
    // Set roles on user manually
    payload.groups = ["0d22f54c-83f2-44d0-8f05-f030386e798d", "0d4674e0-b7b0-4d66-addc-fde0383e6d8d"]

    const result: Authorized = {
      user: getUser(payload),
      token: token,
    }

    return result
  } catch (error: any) {
    console.error("AuthError: " + error)
    if (error instanceof AuthenticationErrror) throw error

    throw new AuthorizationError(error.message)
  }
}

const getUser = (payload: TokenPayload): User => {
  const user: User = {
    name: payload.name,
    email: payload.unique_name,
    roles: getRoles(payload),
  }
  return user
}

const getRoles = (payload: TokenPayload): string[] => {
  if (!payload.groups) throw new AuthorizationError("No groups defined")

  const roles = []

  if (payload.groups.find((c) => c.toLowerCase() === LogikfabrikenGroup)) {
    roles.push(AppUser)
  }
  if (payload.groups.find((c) => c.toLowerCase() === LedningsgruppGroup)) {
    roles.push(AppApprover)
  }

  if (roles.length === 0) throw new AuthorizationError("No roles defined")

  return roles
}
