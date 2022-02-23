const assetUrl = ASSET_URL
import { Params } from "tiny-request-router"

export const serveStaticAsset = async (params: Params, request: Request): Promise<Response> => {
  let path = new URL(request.url).pathname
  let cache = "no-cache"

  if (path === "/" || path === "index.html") {
    path = "/index.html" // Don't cache index document so browser can fetch new versions of app
  } else if (path.startsWith("/static/")) {
    cache = "max-age=31536000"
  } else if (path === "/robots.txt") {
    cache = "max-age=31536000"
  }
  // Always default to index.html if not a valid asset file to fetch
  else if (!path.includes(".")) {
    path = "/index.html"
  }
  const dst = new URL(assetUrl + path + SAS_TOKEN)
  const originalResponse = await fetch(dst.toString())

  //TODO: Handle 404. Shall we return index.html if status code 404, requires extra fetch :(, or can we handle this on client side?
  if (originalResponse.status == 404) {
    return new Response(null, originalResponse)
  }

  const ct = originalResponse.headers.get("Content-Type") || ""
  return new Response(originalResponse.body, {
    // Not sure why content-type drops and needs to be re-added
    headers: {
      "Cache-Control": cache,
      "Content-Type": ct,
      ...originalResponse.headers,
    },
  })
}
