import { useInitialDataStore } from "./initialData"
import { useCartStore } from "./cart"

export const useOrderStore = defineStore('order', () => {
  const ini = useInitialDataStore()
  const cart = useCartStore()
  const order = ref({})
  const orders = ref({})

  const place = async (checkoutRes) => {
    await useApi('/order/place', {
      method: 'POST',
      body: {
        order: checkoutRes
      },

      async onRequest() {
        ini.globalPending = true
      },

      async onRequestError({ error }) {
        notification('danger', error)
        ini.globalPending = false
      },

      async onResponse({ response }) {
        if(response.status == 200) {
          order.value = await response._data.order
          ini.globalPending = false
          await cart.fetchCart()
          useRouter().push('/order')
        }
      },

      async onResponseError({ response }) {
        if(response.status == 409 && response._data.products)
          cart.checkoutResponse = response._data.products

        notification('danger', response._data.message)
        ini.globalPending = false
      }
    })
  }

  const fetch = async (next = null) => {
    var link = next || '/order/whole/5'

    await useApi(link, {
      async onRequest() {
        ini.globalPending = true
      },

      async onRequestError({ error }) {
        ini.globalPending = false
        notification('danger', error)
      },

      async onResponse({ response }) {
        if(response.status == 200) {
          ini.globalPending = false

          if(!next)
            orders.value = response._data
          else {
            orders.value.data.push(...response._data.data)
            orders.value.links = response._data.links
            order.value.meta = response._data.meta
          }
        }
      },

      async onResponseError({ response }) {
        ini.globalPending = false
        notification('danger', response._data.message)
      }
    })
  }

  const fetchOrderDetail = async (id) => {
    await useApi('/order/' + id, {
      async onRequest() {
        ini.globalPending = true
      },

      async onRequestError({ error }) {
        ini.globalPending = false
        notification('danger', error)
      },

      async onResponse({ response }) {
        if(response.status == 200) {
          ini.globalPending = false
          order.value = response._data.data
        }
      },

      async onResponseError({ response }) {
        ini.globalPending = false
        notification('danger', response._data.message)
      }
    })
  }

  return { order, orders, place, fetch, fetchOrderDetail }
})