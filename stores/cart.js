import { useInitialDataStore } from './initialData'
import { useAuthStore } from './auth'
import { storeToRefs } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const { globalPending, globalNotification } = storeToRefs(useInitialDataStore())
  const cart = ref({})
  const checkoutList = ref({})
  const checkoutResponse = ref([])
  const isBuyNow = ref(false)

  const cartItemCount = computed(() => {
    if(cart.value.products !== undefined)
      return cart.value.products.length < 99 ? cart.value.products.length : '99+'
  })

  const fetchCart = async () => {
    await useApi('/cart/whole', {
      async onRequest() {
        globalPending.value = true
      },

      async onRequestError({ error }) {
        globalPending.value = false
        console.error(error)
      },

      async onResponse({ response }) {
        if(response.status == 200) {
          cart.value = response._data.data
          globalPending.value = false
        }
      },

      async onResponseError({ response }) {
        globalPending.value = false
        resolveResponse(response)
      }
    })
  }

  const fetchCheckout = async (buyNow = false) => {
    let sortable = []
    isBuyNow.value = buyNow

    if(!buyNow) {
      /* Sắp xếp lại thứ tự checkoutList */
      cart.value.products.forEach(element => {
        if(checkoutList.value.hasOwnProperty(element.id)) {
          sortable.push({ 'id' : element.id, 'quantity': checkoutList.value[element.id]})
        }
      })
    } else {
      var key = Object.keys(checkoutList.value)[0]
      sortable.push({ 'id' : key, 'quantity': checkoutList.value[key]})
    }

    await useApi('/cart/checkout', {
      method: 'POST',
      body: {
        checkout: sortable
      },

      async onRequest() {
        globalPending.value = true
      },

      async onRequestError({ error }) {
        globalPending.value = false
        console.error(error)
      },

      async onResponse({ response }) {
        if(response.status == 200) {
          globalPending.value = false
          checkoutResponse.value = response._data.data
          useRouter().push('/checkout')
        }        
      },

      async onResponseError({ response }) {
        globalPending.value = false
        notification('danger', response._data.message)

        if(response.status == 422)
          notification('warning', 'You have not selected any items for checkout')

        if(response.status == 409) {
          notification('danger', response._data.message)
          await fetchCart()
          syncAllCheckoutList()
        }
      }
    })
  }

  const addToCart = async (product_id, quantity) => {
    await useApi('/cart/add', {
      method: 'POST',
      body: {
        product_id: product_id,
        quantity: quantity
      },

      async onRequest() {
        globalPending.value = true
      },

      async onRequestError({ error }) {
        globalPending.value = false
        console.error(error)
      },

      async onResponse({ response }) {
        resolveResponse(response, 'Item has been added to your cart.')
      },

      async onResponseError({ response }) {
        fetchCart()
      }
    })
  }

  const buyNow = (product_id, quantity) => {
    checkoutList.value = {}
    checkoutList.value[product_id] = quantity

    fetchCheckout(true)
  }

  const updateQuantity = async (product_id, quantity) => {
    await useApi('/cart/quantity', {
      method: 'PATCH',
      body: {
        product_id: product_id,
        quantity: quantity
      },
      
      async onRequest() {
        globalPending.value = true
      },

      async onRequestError({ error }) {
        globalPending.value = false
        fetchCart()
        console.log('[fetch request error]', error)
      },

      async onResponse({ response }) {
        if(response.status == 200) {
          cart.value = response._data.data
          updateCheckoutListQuantity(product_id, quantity)
          globalPending.value = false
        }
      },

      async onResponseError({ response }) {
        fetchCart()
        resolveResponse(response)
      }
    })
  }

  const removeItem = async (product_id) => {
    await useApi('/cart/delete', {
      method: 'DELETE',
      body: {
        product_id: product_id
      },

      async onRequest() {
        globalPending.value = true
      },

      async onRequestError({ error }) {
        globalPending.value = false
        console.error(error)
      },

      async onResponse({ response }) {
        resolveResponse(response, 'Item has been removed to your cart.')
        syncCheckoutList(product_id, 0)
      },

      async onResponseError({ response }) {
        fetchCart()
        resolveResponse(response)
      }
    })
  }

  const resolveResponse = (response, successMessage = '') => {
    globalPending.value = false

    if(response.status == 200) {
      cart.value = response._data.data
    }

    globalNotification.value.type = response.status == 200 ? 'success' : 
                                    (response.status == 401 ? 'danger' : 'warning')
    globalNotification.value.show = true
    globalNotification.value.content = response.status == 200 ? successMessage : response._data.message

    if(response.status == 401)
      useAuthStore().showAuthModal.sign_in = true
  }

  const syncCheckoutList = (product_id, quantity = 0) => {
    if(quantity)
      checkoutList.value[product_id] = quantity
    else
      delete checkoutList.value[product_id]
  }

  const syncAllCheckoutList = () => {
    cart.value.products.forEach(element => {
      if(checkoutList.value.hasOwnProperty(element.id))
        syncCheckoutList(element.id, element.quantity)
    })
  }

  const updateCheckoutListQuantity = (product_id, quantity) => {
    if(checkoutList.value.hasOwnProperty(product_id))
      syncCheckoutList(product_id, quantity)
  }

  return { 
    cart,
    checkoutList,
    checkoutResponse,
    isBuyNow,
    cartItemCount, 
    fetchCart, 
    fetchCheckout, 
    addToCart,
    buyNow,
    updateQuantity, 
    removeItem, 
    syncCheckoutList 
  }
})