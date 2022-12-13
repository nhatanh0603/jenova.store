<template>
  <div class="jnv-checkout" v-if="auth.user.signedIn">
    <CheckoutMobile :products="checkoutResponse" v-if="isMobileWidth"/>

    <CheckoutDesktop :products="checkoutResponse" v-else/>

    <div class="jnv-checkout__review-info">
      <div class="jnv-checkout__total-payment">
        <span class="jnv-checkout__total-text">Total Payment</span>

        <div class="jnv-checkout__total-value">
          <img :src="url.misc + 'coin.svg'"  alt="Coin Icon" width="22">
          <span>{{ $toDec(total, 2, true).toLocaleString() }}</span>
        </div>
      </div>

      <button class="jnv-checkout__place-order-button" @click="placeOrder">Place Order</button>
    </div>
  </div>
</template>
  
<script setup>
  import { useAuthStore } from '@/stores/auth'
  import { useCartStore } from '@/stores/cart'
  import { useOrderStore } from '@/stores/order'
  import { storeToRefs } from 'pinia'
  import CheckoutDesktop from '@/components/general/checkout/CheckoutDesktop.vue'
  import CheckoutMobile from '@/components/general/checkout/CheckoutMobile.vue'

  useHead({
    title: 'Checkout'
  })

  definePageMeta({
    middleware: 'authentication'
  })

  const isMobileWidth = ref(false)
  const auth = useAuthStore()
  const { checkoutResponse } = storeToRefs(useCartStore())
  const { url } = useAppConfig()

  const total = computed(() => {
    var total = 0

    if(checkoutResponse !== undefined)
      checkoutResponse.value.forEach((element) => {
          total += element.price * element.quantity
      })

    return total
  })

  onBeforeMount(() => {
    if(window.innerWidth < 888)
      isMobileWidth.value = true

    window.addEventListener('resize', responsiveTracker)

    if(checkoutResponse.value.length == 0)
      useRouter().back()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', responsiveTracker)
  })

  const responsiveTracker = () => {
    if(window.innerWidth < 888)
      isMobileWidth.value = true
    else
      isMobileWidth.value = false
  }

  const placeOrder = () => {
    useOrderStore().place(checkoutResponse.value)
  }
</script>
  
<style lang="scss">
  @import '@/assets/css/variables.scss';

  .jnv-checkout {
    display: flex;

    .jnv-checkout__review-info {
      white-space: nowrap;
      display: flex;
      height: fit-content;
      flex-direction: column;
      align-items: flex-end;
      margin-left: 20px;
      padding: 2rem 3rem;
      background: rgba(0, 0, 0, 0.5);
      box-shadow: 0 0 5px 0 $jnv__shadow-color--almost-black;

      .jnv-checkout__total-payment {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        .jnv-checkout__total-text {
          text-transform: uppercase;
          font-size: 17px;
          font-weight: 800;
          color: $jnv__color--apricot;
          margin-bottom: 8px;
        }

        .jnv-checkout__total-value {
          display: flex;
          margin-bottom: 8px;
          align-items: center;

          span {
            margin-left: 8px;
            font-size: 17px;
            font-weight: 800;
            @include golden-gradient-text;
          }
        }
      }

      .jnv-checkout__place-order-button {
        background: $jnv__color--kelly-green;
        padding: 0.8rem 2rem;
        font-weight: 800;
        margin-top: 15px;
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

  @media screen and (max-width: 888px){
    .jnv-checkout {
      flex-direction: column;

      .jnv-checkout__product-table {
        margin-right: 0;
        margin-bottom: 15px;
      }

      .jnv-checkout__review-info {
        margin-left: 0;
        margin-top: 15px;
      }
    }
  }
</style>