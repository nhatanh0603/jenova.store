<template>
  <NuxtLink to="/cart" class="jnv-cart-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 44.24194" :width="width">
      <path d="M8.79912,43.56336H39.50946A2.01749,2.01749,0,0,0,41.4344,42.15l4.6522-14.82467a2.01751,2.01751,0,0,0-3.8499-1.20817L38.02808,39.52835H10.30589L9.4266,36.55841H34.46613a2.0175,2.0175,0,0,0,1.92958-1.42835l1.84921-6.05676a2.01752,2.01752,0,0,0-1.92958-2.60663H5.80291l-.9416-2.68988H46.40288A2.01754,2.01754,0,0,0,48.33166,22.351l2.58846-8.437H61.98249a2.01751,2.01751,0,1,0,0-4.035H49.42876A2.01753,2.01753,0,0,0,47.5,11.30478l-2.58845,8.437H2.01752a2.01748,2.01748,0,0,0-1.9042,2.68408L2.4674,29.15075a2.01749,2.01749,0,0,0,1.90421,1.35093H33.58993l-.61726,2.02171H6.72525a2.01756,2.01756,0,0,0-1.9345,2.59026l2.07387,7.005A2.01746,2.01746,0,0,0,8.79912,43.56336Z" transform="translate(0 -9.87903)" :fill="fill"/>

      <path d="M28.92465,49.81258a4.30926,4.30926,0,1,0,4.30882-4.30942A4.309,4.309,0,0,0,28.92465,49.81258Z" transform="translate(0 -9.87903)" :fill="fill"/>

      <path d="M13.23321,49.81258a4.30912,4.30912,0,1,0,4.30868-4.30942A4.30838,4.30838,0,0,0,13.23321,49.81258Z" transform="translate(0 -9.87903)" :fill="fill"/>
    </svg>

    <span class="jnv-cart-icon__counter" v-if="isCartReady">
      {{ useCartStore().cartItemCount }}
    </span>
  </NuxtLink>
</template>
  
<script setup>
  import { useCartStore } from '@/stores/cart'
  import { useAuthStore } from '@/stores/auth'

  const props = defineProps({
    width: {
      type: String,
      default: '30px'
    },
    fill: {
      type: String,
      default: '#fff'
    }
  })

  const isCartReady = computed(() => {
    if(useAuthStore()?.user?.signedIn)
      return useCartStore()?.cartItemCount > 0 ? true : false
    return false
  })
</script>
  
<style lang="scss">
  @import '@/assets/css/variables.scss';

  .jnv-cart-icon {
    display: flex;
    margin-right: 15px;
    cursor: pointer;
    background-color: $jnv__color--scarlet;
    border-radius: 999px;
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &:hover {
      box-shadow: 0 0 10px $jnv__color--scarlet;
    }

    .jnv-cart-icon__counter {
      position: absolute;
      top: -6px;
      right: 16px;
      background-color: $jnv__color--white;
      border-radius: 10px;
      padding: 2px 5px;
      font-size: 11px;
      font-weight: 700;
      height: 15px;
      width: fit-content;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $jnv__color--scarlet;
    }
  }
</style>