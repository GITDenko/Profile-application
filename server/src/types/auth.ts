import { User } from "./user"

export interface TokenPayload {
  aud: string
  iss: string
  iat: number
  nbf: number
  exp: number
  acr: string
  aio: string
  amr: string[]
  appid: string
  appidacr: string
  family_name: string
  given_name: string
  groups: string[]
  ipaddr: string
  name: string
  oid: string
  rh: string
  scp: string
  sub: string
  tid: string
  unique_name: string
  upn: string
  uti: string
  ver: string
  wids: string[]
}

export interface TokenHeader {
  typ: string
  alg: string
  x5t: string
  kid: string
}

export interface DecodedToken {
  header: TokenHeader
  payload: TokenPayload
}

export interface Jwk {
  kty: string
  use: string
  kid: string
  x5t: string
  n: string
  e: string
  x5c: string
}

export interface Authorized {
  user: User
  token: string
}

export const LogikfabrikenGroup = "0d22f54c-83f2-44d0-8f05-f030386e798d"
export const LedningsgruppGroup = "0d4674e0-b7b0-4d66-addc-fde0383e6d8d"
