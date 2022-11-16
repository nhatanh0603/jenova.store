<template>
  <div class="jnv-svg__notification-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 49.00903" :width="width" :height="height" v-if="type == 'success'">
      <polygon points="55.304 0 23.559 31.746 8.675 16.779 0 25.455 23.555 49.009 64 8.563 55.304 0" :fill="fill"/>
    </svg>
    
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.86232 64" :width="width" :height="height" v-if="type == 'warning'">
      <path d="M31.99638,48.615A7.39744,7.39744,0,0,0,24.56884,56.308,7.39721,7.39721,0,0,0,31.99638,64a7.31817,7.31817,0,0,0,7.43478-7.692A7.31892,7.31892,0,0,0,31.99638,48.615Z" transform="translate(-24.56884)" :fill="fill"/>
      <polygon points="12.629 46.236 13.978 0 0.884 0 2.233 46.236 12.629 46.236" :fill="fill"/>
    </svg>

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" :width="width" :height="height" v-if="type == 'danger'">
      <polygon points="41.071 32.1 64 54.829 54.628 64 31.9 41.272 9.172 64 0 54.829 22.728 32.1 0 9.372 9.172 0 31.9 22.929 54.628 0 64 9.372 41.071 32.1" :fill="fill"/>
    </svg>
  </div>
</template>
  
<script setup>
  const props = defineProps({
    type: {
      type: String,
      default: 'success' //success, warning, danger
    },
    fill: {
      type: String,
      default: '#fff'
    },
    width: {
      type: String,
      default: '50px'
    },
    height: {
      type: String,
      default: '50px'
    }
  })
</script>
  
<style lang="scss">
  .jnv-svg__notification-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>