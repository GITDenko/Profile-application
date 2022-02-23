import { NotFoundError } from "Types/errors"

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json;odata=nometadata",
  "x-ms-version": "2019-12-12", // needed for body to be in JSON instead of XML when errors are returned
}
const get = async <TOut>(url: string, { headers: customHeaders, ...customConfig }: RequestInit = {}): Promise<TOut> => {
  const init = {
    method: "GET",
    headers: {
      ...defaultHeaders,
      ...customHeaders,
    },
    ...customConfig,
  }

  const response = await fetch(url, init)
  return handleResponse<TOut>(response)
}

const post = async <TOut>(url: string, { body, headers: customHeaders, ...customConfig }: RequestInit = {}): Promise<TOut> => {
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...customHeaders,
    },
    body: body,
    ...customConfig,
  }
  const response = await fetch(url, init)
  return handleResponse(response)
}

const put = async <TOut>(url: string, { body, headers: customHeaders, ...customConfig }: RequestInit = {}): Promise<TOut> => {
  const init = {
    method: "PUT",
    headers: {
      ...defaultHeaders,
      ...customHeaders,
    },
    body: body,
    ...customConfig,
  }
  const response = await fetch(url, init)
  return handleResponse(response)
}

const del = async <TOut>(url: string, { headers: customHeaders, ...customConfig }: RequestInit = {}): Promise<TOut> => {
  const init = {
    method: "DELETE",
    headers: {
      ...defaultHeaders,
      ...customHeaders,
    },
    ...customConfig,
  }
  const response = await fetch(url, init)
  return handleResponse(response)
}

const handleResponse = async <TOut>(response: Response): Promise<TOut> => {
  const contentType = response.headers.get("Content-Type") || ""
  let data: any = null
  // Blob Store unfortunately always returns xml when 404..
  if (contentType.startsWith("application/json")) {
    data = await response.json()
  }
  if (contentType.startsWith("application/xml")) {
    data = await response.text()
    console.log(data)
  }
  if (!response.ok) {
    let error = new Error(response.statusText)
    if (response.status === 404) error = new NotFoundError()
    return Promise.reject(error)
  }
  return data
}

export const apiClient = {
  get,
  post,
  put,
  del,
}
