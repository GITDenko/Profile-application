import { serveStaticAsset } from "./util/static-asset-handler"
import { requestHandler as profileHandler } from "./api/profile"
import { requestHandler as skillHandler } from "./api/skill"
import { requestHandler as roleHandler } from "./api/role"
import { requestHandler as authHandler } from "./api/auth"
import { requestHandler as imageHandler } from "./api/image"
import { authorize } from "./services/auth"
import { handleError, handleRoutes } from "./util"
import { Router } from "tiny-request-router"
import { Handler, localDevOrigin } from "./types/router"

const corsHeaders = {
  "Access-Control-Allow-Origin": localDevOrigin,
  "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS, PUT, DELETE",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

function handleOptions(request: any) {
  // Make sure the necessary headers are present for this to be a valid pre-flight request

  if (request.headers.get("Origin") !== null && request.headers.get("Access-Control-Request-Method") !== null && request.headers.get("Access-Control-Request-Headers") !== null) {
    // Check the requested method + headers
    return new Response(null, {
      headers: corsHeaders,
    })
  } else {
    // Handle standard OPTIONS request.
    return new Response(null, {
      headers: {
        Allow: "OPTIONS",
      },
    })
  }
}

addEventListener("fetch", (event: any) => {
  const request = event.request
  if (request.method === "OPTIONS") {
    // Handle CORS preflight requests
    event.respondWith(handleOptions(request))
  } else {
    // Handle requests to the backend
    event.respondWith(handleRequest(request))
  }
})

async function handleRequest(request: Request) {
  const r = new Router<Handler>()

  try {
    //TODO: trailing slashes?
    r.all("/api/profile/(.*)", profileHandler)
    r.all("/api/skill/(.*)", skillHandler)
    r.all("/api/role/(.*)", roleHandler)
    r.all("/api/auth/(.*)", authHandler)
    r.all("/api/image/(.*)", imageHandler)

    r.all("/api/(.*)", async () => {
      await authorize(request)
      return new Response("404")
    })
    //r.all('*', serveStaticAsset) //TODO: Add frontend

    return await handleRoutes(r, request)
  } catch (error: any) {
    return handleError(error)
  }
}
