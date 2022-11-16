<template>
  <div class="jnv-quantity-editable">
    <div :class="['jnv-quantity-editable__decrease', quantity <= limit.min ? 'jnv-quantity-editable__disable' : '' ]" 
          @click="editQuantity('decre')"
    >
      <span>-</span>
    </div>

    <div class="jnv-quantity-editable__input">
      <input type="text"
              v-model="quantity"
              @keypress="numbersOnly"
              @click="$event.target.select()"
      >
    </div>

    <div :class="['jnv-quantity-editable__increase', quantity >= limit.max ? 'jnv-quantity-editable__disable' : '']"
          @click="editQuantity('incre')"
    >
      <span>+</span>
    </div>
  </div>
</template>
  
<script setup>
  const props = defineProps({
    stock: Number
  })
  const quantity = ref(1)
  const limit = reactive({
    min: 1,
    max: 10
  })

  const emit = defineEmits(['quantityChange'])

  onMounted(() => {
    if(props.stock < limit.max)
      limit.max = props.stock
  })

  watch(quantity, (newQuantity) => {
    if(newQuantity < limit.min)
      quantity.value = limit.min
    if(newQuantity > limit.max)
      quantity.value = limit.max

    emit('quantityChange', parseInt(quantity.value))
  })

  const editQuantity = (type) => {
    if(type == 'incre' && quantity.value < limit.max) {
      quantity.value++
    }

    if(type == 'decre' && quantity.value > limit.min) {
      quantity.value--
    }
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
  
  .jnv-quantity-editable {
    display: flex;

    .jnv-quantity-editable__decrease {
      background-color:  rgb(196 22 22 / 80%);
    }

    .jnv-quantity-editable__increase {
      background-color: rgb(31 177 29 / 80%);
    }

    .jnv-quantity-editable__decrease, .jnv-quantity-editable__increase {
      padding: 0 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-size: 25px;
      font-weight: 900;
    }

    .jnv-quantity-editable__disable {
      background-color: rgb(155 155 155 / 80%);
      cursor: default;
    }

    .jnv-quantity-editable__input input {
      width: 40px;
      padding: 8px 0;
      font-size: 17px;
      border: none;
      text-align: center;
      color: $jnv__color--light-black;
      font-weight: 900;
    }
  }
</style>