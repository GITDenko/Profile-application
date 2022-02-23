import { DecodedToken, Jwk } from "Types/auth"
import { AuthenticationErrror, AuthorizationError } from "Types/errors"
import { base64url } from "rfc4648"

export const decodeToken = (token: string): DecodedToken => {
  const tokenParts = token.split(".")
  const jwsHeader = decodeURIComponent(escape(atob(tokenParts[0])))
  const jwsPayload = decodeURIComponent(escape(atob(tokenParts[1])))

  return {
    header: JSON.parse(jwsHeader),
    payload: JSON.parse(jwsPayload),
  }
}

export const verifySignature = async (jws: string, jwk: any) => {
  const tokenParts = jws.split(".")
  const jwsHeader = JSON.parse(atob(tokenParts[0]))
  const jwsSigningInput = tokenParts[0] + "." + tokenParts[1]
  const jwsSignature = tokenParts[2]
  const alg = jwsHeader.alg
  var match = alg.match(/^(RS)(256|384|512)$|^(none)$/)
  if (!match) {
    console.error("AuthError: Unsupported algo")
    throw new AuthenticationErrror("Unsupported algo")
  }
  const bits = match[2]
  const key = await crypto.subtle.importKey(
    "jwk",
    jwk,
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: { name: `SHA-${bits}` },
    },
    false,
    ["verify"]
  )
  return crypto.subtle.verify({ name: "RSASSA-PKCS1-v1_5" }, key, base64url.parse(jwsSignature, { loose: true }), new TextEncoder().encode(jwsSigningInput))
}

export const verifyTokenValidity = (payload: any, allowedAudiences: any[string]) => {
  const now = Date.now()
  if (typeof payload.nbf !== "undefined") {
    if (typeof payload.nbf !== "number") {
      console.error("AuthError: invalid nbf value for", payload.oid)
      throw new AuthenticationErrror()
    }
    const nbfTime = payload.nbf * 1000
    if (nbfTime > now) {
      console.error("AuthError: JWT not active for", payload.oid, "before", new Date(nbfTime).toLocaleString("sv-SE"))
      throw new AuthenticationErrror()
    }
  }

  if (typeof payload.exp !== "undefined") {
    if (typeof payload.exp !== "number") {
      console.error("AuthError: invalid exp value for", payload.oid)
      throw new AuthenticationErrror()
    }
    const expTime = payload.exp * 1000
    if (expTime <= now) {
      console.error("AuthError: JWT expired for", payload.oid, "at", new Date(expTime).toLocaleString("sv-SE"))
      throw new AuthenticationErrror()
    }
  }

  const aud: string = payload.aud || ""
  if (!allowedAudiences.includes(aud)) {
    console.error(`AuthError: JWT audience invalid ${aud}`)
    throw new AuthenticationErrror()
  }
}

export const getJwk = async (kid: string) => {
  const response = await fetch(`https://login.microsoftonline.com/common/discovery/keys`, {
    cf: {
      // Always cache this fetch 24h regardless of content type before revalidating the resource
      cacheTtl: 86400,
      cacheEverything: true,
    },
  })

  if (!response.ok) {
    console.error(`AuthError: Could not connect to keys url`, response.status)
    throw new AuthorizationError()
  }

  const jwks = await response.json()
  const keys: [Jwk] = jwks.keys
  const jwk: Jwk | undefined = keys.find((key: Jwk) => key.kid === kid)

  if (!jwk) {
    console.error(`AuthError: Found no jwk matching kid: ${kid}`)
    throw new AuthenticationErrror()
  }
  return jwk
}
