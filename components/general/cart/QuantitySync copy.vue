<template>
  <div class="jnv-quantity-sync">
    <div :class="['jnv-quantity-sync__decrease', quantity <= limit.min ? 'jnv-quantity-sync__disable' : '' ]" 
          @click="editQuantity('decre')"
    >
      <span>-</span>
    </div>

    <div class="jnv-quantity-sync__input">
      <input type="text"
              v-model="quantity"
              @keypress="numbersOnly"
              @click="$event.target.select()"
              @focusout="editQuantity('multi')"
      >
    </div>

    <div :class="['jnv-quantity-sync__increase', quantity >= limit.max ? 'jnv-quantity-sync__disable' : '']"
          @click="editQuantity('incre')"
    >
      <span>+</span>
    </div>
  </div>
</template>
  
<script setup>
  import { useCartStore } from '@/stores/cart'
  import { storeToRefs } from 'pinia'

  const { cart } = storeToRefs(useCartStore())
  const { updateQuantity } = useCartStore()

  const props = defineProps({
    index: Number
  })
  const quantity = ref(1)
  const limit = reactive({
    min: 1,
    max: 10
  })

  onMounted(() => {
    quantity.value = cart.value.products[props.index].quantity

    if(cart.value.products[props.index].stock < limit.max)
      limit.max = cart.value.products[props.index].stock
  })

  watch(quantity, (newQuantity) => {
    if(newQuantity < limit.min)
      quantity.value = limit.min
    if(newQuantity > limit.max)
      quantity.value = limit.max
  })

  watch(cart, (newCart) => {
    if(newCart && newCart.products[props.index]) {
      if(newCart.products[props.index].stock <= 10)
        limit.max = newCart.products[props.index].stock
      else
        limit.max = 10
    }
  })

  const editQuantity = (type) => {
    if(type == 'incre' && quantity.value < limit.max) {
      quantity.value++
      updateQuantity(cart.value.products[props.index].id, quantity.value)
    }

    if(type == 'decre' && quantity.value > limit.min) {
      quantity.value--
      updateQuantity(cart.value.products[props.index].id, quantity.value)
    }
      
    if(type == 'multi')
      updateQuantity(cart.value.products[props.index].id, quantity.value)
  }

  const numbersOnly = (evt) => {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
      evt.preventDefault();;
    } else {
      return true;
    }
  }
</script>
  
<style lang="scss">
  @import '@/assets/css/variables.scss';
  
  .jnv-quantity-sync {
    display: flex;

    .jnv-quantity-sync__decrease {
      background-color:  rgb(196 22 22 / 80%);
    }

    .jnv-quantity-sync__increase {
      background-color: rgb(31 177 29 / 80%);
    }

    .jnv-quantity-sync__decrease, .jnv-quantity-sync__increase {
      padding: 0 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-size: 17px;
      font-weight: 900;
    }

    .jnv-quantity-sync__disable {
      background-color: rgb(155 155 155 / 80%);
      cursor: default;
    }

    .jnv-quantity-sync__input input {
      width: 40px;
      padding: 5px 0;
      border: none;
      text-align: center;
      color: $jnv__color--light-black;
    }
  }
</style>