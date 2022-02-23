import { Params } from "tiny-request-router"

export const localDevOrigin = "http://localhost:3000"
export type Handler = (params: Params, request: Request) => Promise<Response>
