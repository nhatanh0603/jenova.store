<template>
  <div class="jnv-loader">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65 65" :width="width + unit">
      <path d="M32.5,65A32.5,32.5,0,1,1,65,32.5a5,5,0,0,1-10,0A22.5,22.5,0,1,0,32.5,55a5,5,0,0,1,0,10Z" :fill="fill"/>

      <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="0"
          to="360"
          dur="0.7s"
          repeatCount="indefinite"
        />
    </svg>
  </div>
</template>
  
<script setup>
  const props = defineProps({
    width: {
      type: String,
      default: '20'
    },
    unit: {
      type: String,
      default: 'px'
    },
    fill: {
      type: String,
      default: '#b3b3b3'
    }
  })
</script>

<style lang="scss">
  .jnv-loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 18px;
  }
</style>