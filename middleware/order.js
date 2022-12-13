export default defineNuxtRouteMiddleware((to, from) => {
  if(from.fullPath != '/checkout')
    return abortNavigation()
})