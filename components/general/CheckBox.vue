<template>
  <div class="jnv-custom-checkbox" @click="handleCheck">
    <div class="jnv-custom-checkbox__background" >
      <div class="jnv-custom-checkbox__checked" v-if="isChecked"></div>
    </div>

    <label class="jnv-custom-checkbox__label" v-if="props.label">{{ props.label }}</label>
  </div>
</template>
  
<script setup>
  const props = defineProps({
    value: {
      type: Object,
      default: {}
    },
    checked: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    }
  })

  const emit = defineEmits(['boxClick'])

  const isChecked = ref(props.checked)

  watch(props, () => {
    isChecked.value = props.checked
  })
  
  const handleCheck = () => {
    isChecked.value= !isChecked.value
    emit('boxClick', isChecked.value, props.value)
  }
</script>
  
<style lang="scss">
  .jnv-custom-checkbox {
    display: flex;
    align-items: center;
    cursor: pointer;

    .jnv-custom-checkbox__background {
      background-color: #adacac;
      width: 18px;
      height: 18px;
      border-radius: 999px;
      display: flex;
      justify-content: center;
      align-items: center;      

      .jnv-custom-checkbox__checked {
        background: radial-gradient(#028312, #19cd04);
        width: 12px;
        height: 12px;
        border-radius: 999px;
        box-shadow: 0 0 8px white;
      }
    }
    
    .jnv-custom-checkbox__label {
      margin-left: 10px;
      cursor: pointer;
    }
  }
</style>