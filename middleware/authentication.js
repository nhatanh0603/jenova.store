import { useAuthStore } from "~~/stores/auth"
import { useInitialDataStore } from "~~/stores/initialData"

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()
  const ini = useInitialDataStore()
  const checkAuth = () => {
    if(!auth.user.signedIn) {
      auth.showAuthModal.sign_in = true
  
      if(from.fullPath == to.fullPath)
        return navigateTo('/')
      return abortNavigation()
    }
  }

  if(ini.firstTimeAccess) {
    watch(() => ini.firstTimeAccess, () => {
      return checkAuth()
    })
  } else {
    return checkAuth()
  }
})