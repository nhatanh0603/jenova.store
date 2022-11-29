import { useAuthStore } from '~~/stores/auth'
import { useCartStore } from '~~/stores/cart'
import { useInitialDataStore } from '@/stores/initialData'

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()
  const initialData = useInitialDataStore()
  const cart = useCartStore()

  if(process.client) {
    // Để dùng được window
    const token = localStorage.getItem(useRuntimeConfig().appTokenName)

    if(token != null) {
      if(initialData.firstTimeAccess) {
        useApi('/auth/user', {
          async onRequest() {
            initialData.firstTimeAccess = true
          },

          async onRequestError() {
            initialData.firstTimeAccess = false
          },

          async onResponse({ response }) {
            if(response.status == 200) {
              auth.localSignIn(response._data.user)

              if(useRouter().currentRoute.value.path != '/cart') {
                cart.fetchCart()
              }

              initialData.firstTimeAccess = false
            }
          },

          async onResponseError() {
            initialData.firstTimeAccess = false
            auth.user.signedIn = false
          }
        })
      }

      if (to.path != '/cart') {
        if(cart.checkoutList != undefined)
          cart.checkoutList = {}
      }

      if (to.path != '/checkout') {
        if(cart.checkoutResponse != undefined)
          cart.checkoutResponse = []
      }
    }else {
      auth.localSignOut()
      initialData.firstTimeAccess = false
    }
  }
})