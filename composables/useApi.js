export const useApi = (url, options) => {
  const runtimeConfig = useRuntimeConfig()
  const serverRoute = runtimeConfig.apiBase
  const apiRoute = `${serverRoute}/api`
  const token = localStorage.getItem(runtimeConfig.appTokenName)

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...options?.headers
  }

  token ? headers.Authorization = 'Bearer ' + token : null

  const opts = options ? (({headers, ...opts}) => opts)(options) : null

  const baseURL = !options?.baseURL ? apiRoute : options.baseURL

  return $fetch(url, {
    baseURL: baseURL,
    headers,
    ...opts
  })
}