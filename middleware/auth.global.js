import { useAuthStore } from '~~/stores/auth'
import { useInitialDataStore } from '@/stores/initialData'

let firstTimeAccess = true

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()
  const initialData = useInitialDataStore()

  if(process.client) {
    // Để dùng được window
    const token = localStorage.getItem(useRuntimeConfig().appTokenName)
    
    if(token != null) {
      if(firstTimeAccess) {
        useApi('/auth/user', {
          async onRequestError() {
            initialData.initialDataStatus.all = true
          },
          async onResponse({ response }) {
            if(response.status == 200) {
              auth.localSignIn(response._data.user)
            }
            initialData.initialDataStatus.authentication = true
          },
          async onResponseError() {
            auth.user.signedIn = false
          }
        })
      }
    }else {
      auth.localSignOut()
      initialData.initialDataStatus.authentication = true
    }
  }

  firstTimeAccess = false
})