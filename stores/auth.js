import { storeToRefs } from "pinia"
import { useInitialDataStore } from "./initialData"
import { useCartStore } from "./cart"

export const useAuthStore = defineStore('auth', () => {
  const { globalPending } = storeToRefs(useInitialDataStore())

  const showAuthModal = reactive({
    sign_in: false,
    sign_up: false,
    forgot_password: false
  })

  const user = reactive({
    signedIn: false,
    info: {}
  })

  /* type = signin, signup */
  async function request(type, input, modalName, pending) {
    await useApi('/auth/' + type, {
      method: 'POST',
      body: {
        username: input.name,
        email: input.email,
        password: input.password
      },

      async onRequest() {
        pending.value = true
      },

      async onRequestError() {
        pending.value = false
      },

      async onResponse({ response }) {
        pending.value = false

        if(response.status == 200) {
          localSignIn(response._data.user, response._data.access_token)
          showAuthModal[modalName] = false
          await useCartStore().fetchCart()
          
          notification('success', (type == 'signin' ? 'Welcome Back, ' : 'Welcome To Jenova Store, ') + response._data.user.name)
        }
      },

      async onResponseError({ response }) {
        //Object.assign(input.errors, response._data.errors) //shallow copy
        input.errors = structuredClone(response._data.errors) //deep copy
      }
    })
  }

  /* Gửi request đăng xuất lên server */
  async function signOut() {
    await useApi('/auth/signout', {
      method: 'DELETE',
      async onRequest() {
        globalPending.value = true
      },

      async onRequestError() {
        globalPending.value = false
      },

      async onResponse({ response }) {
        if(response.status == 200) {          
          localSignOut()
          useCartStore().cart = {}
          useRouter().push('/')
          notification('success', 'See You Later, Alligator!')
          globalPending.value = false
        }
      },

      async onResponseError() {
        globalPending.value = false
      }
    })
  }

  /* Lưu thông tin đăng nhập trong local */
  function localSignIn(data, token) {
    if(token)
      localStorage.setItem(useRuntimeConfig().appTokenName, token)
    
    user.signedIn = true
    user.info = data
  }
  
  /* Xóa thông tin đăng nhập trong local */
  function localSignOut() {
    if(localStorage.getItem(useRuntimeConfig().appTokenName))
      localStorage.removeItem(useRuntimeConfig().appTokenName)

    user.signedIn = false
    user.info = {}
  }

  return { showAuthModal, user, request, signOut, localSignIn, localSignOut }
})