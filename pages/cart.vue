<template>
  <div>
    <div class="jnv-cart" v-if="!isCartEmpty">
      <div class="jnv-cart__item-wrapper">
        <CartMobile v-if="isMobileWidth"/>
        <CartDesktop v-else/>
      </div>
      
      <div class="jnv-cart__total">
        <div class="jnv-cart__select-all">
          <CheckBox @box-click="selectAllCart"
                    :checked="isCheckedAll"
                    label="Select All"
          />
        </div>

        <div class="jnv-cart__total-value">
          <span class="jnv-cart__total-value-title">Total</span>

          <div class="jnv-cart__total-value-wrapper">
            <img :src="url.misc + 'coin.svg'" alt="Coin Icon" width="20">
            <span class="jnv-cart__total-value-display">{{ $toDec(total, 2, true).toLocaleString() }}</span>
          </div>
        </div>

        <div class="jnv-cart__checkout">
          <button class="jnv-cart__checkout-button" @click="checkout">Checkout</button>
        </div>
      </div>
    </div>

  <CuteAstronaut first-message="Your cart is empty!"
                 second-message="Looks like you have not added anything to you cart. Go ahead & explore top categories."
                 :background="true" v-else
  />
  </div>
</template>
  
<script setup>
  import CuteAstronaut from '@/components/general/CuteAstronaut.vue'
  import CartDesktop from '~~/components/general/cart/CartDesktop.vue'
  import CartMobile from '~~/components/general/cart/CartMobile.vue'
  import CheckBox from '~~/components/general/CheckBox.vue'
  import { useCartStore } from '@/stores/cart'
  import { storeToRefs } from 'pinia'

  useHead({
    title: 'Cart'
  })

  definePageMeta({
    middleware: 'authentication'
  })

  const isMobileWidth = ref(false)
  const { url } = useAppConfig()
  const { cart, checkoutList } = storeToRefs(useCartStore())
  const { fetchCart, fetchCheckout, syncCheckoutList } = useCartStore()

  const isCartEmpty = computed(() => {
    return cart.value.products ? (cart.value.products.length > 0 ? false : true) : true
  })

  const isCheckedAll = computed(() => {
    if(cart.value.products == undefined)
      return false
    else if(checkoutList.value == undefined)
      return false
    else
      return cart.value.products.length == Object.keys(checkoutList.value).length
  })

  const total = computed(() => {
    var keys = checkoutList.value !== undefined ? Object.keys(checkoutList.value) : [] // ['1', '2']
    var total = 0

    if(cart.value.products != undefined) {
      cart.value.products.forEach((element) => {
        if(keys.includes('' + element.id))
          total += element.price * element.quantity
      }) 
    }

    return total
  })

  onBeforeMount(() => {
    useCartStore().fetchCart()

    if(window.innerWidth < 1000)
      isMobileWidth.value = true

    window.addEventListener('resize', mobileWidthTracker)   
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', mobileWidthTracker)
  })

  const mobileWidthTracker = () => {
    if(window.innerWidth < 1000)
      isMobileWidth.value = true
    else
      isMobileWidth.value = false
  }

  const selectAllCart = async (isChecked) => {
    if(isChecked) {
      await fetchCart()
      checkoutList.value = {}
      cart.value.products.forEach(element => {
        syncCheckoutList(element.id, element.quantity)
      })
    }else {
      checkoutList.value = {}
    }
  }

  const checkout = () => {
    fetchCheckout()
  }
</script>
  
<style lang="scss">
  @import '@/assets/css/variables.scss';

  .jnv-cart {

    /* TOTAL */
    .jnv-cart__total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: linear-gradient(61deg, #021e15, #010620);
      box-shadow: 0 0 10px #010e1c;
      width: 100%;
      padding: 2rem;
      margin-top: 2rem;
      position: sticky;
      bottom: 0;

      .jnv-cart__select-all {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
      }

      .jnv-cart__total-value {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .jnv-cart__total-value-title {
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 8px;
          color: $jnv__color--apricot;
        }

        .jnv-cart__total-value-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;

          .jnv-cart__total-value-display {
            margin-left: 10px;
          }
        }
      }

      .jnv-cart__checkout {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .jnv-cart__checkout-button {
          background: $jnv__color--kelly-green;
          padding: 0.8rem 2rem;
          font-weight: 800;
          box-shadow: 0 0 7px $jnv__color--green;

          &:hover {
            box-shadow: 0 0 10px $jnv__color--white;
          }
          &:active {
            box-shadow: 0 0 7px $jnv__color--green;
          }
        }
      }
    }
  }

  @media screen and (max-width: 550px) {
    .jnv-cart__total {
      flex-direction: column;
      padding: 2rem 1rem !important;

      .jnv-cart__select-all {
        margin-bottom: 15px;
      }

      .jnv-cart__total-value {
        justify-content: flex-start !important;
        margin-bottom: 15px;
        flex-direction: row !important;

        .jnv-cart__total-value-title {
          margin-bottom: 0 !important;
          margin-right: 15px;
        }
      }

      .jnv-cart__checkout {
        margin-top: 10px;
        justify-content: center !important;
      }
    }
  }
</style>