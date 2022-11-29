<template>
  <div class="jnv-search__background">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" :width="width">
      <path d="M62.19489,53.94055,42.85962,35.44244A22.52359,22.52359,0,0,0,46.6803,22.90491,23.13226,23.13226,0,0,0,23.33337,0,23.12044,23.12044,0,0,0,0,22.90491,23.12321,23.12321,0,0,0,23.33337,45.82336,23.55879,23.55879,0,0,0,33.963,43.29175L53.87134,62.339a6.04333,6.04333,0,0,0,8.43274-.10712A5.78606,5.78606,0,0,0,62.19489,53.94055ZM35.24561,32.32147a15.479,15.479,0,0,1-11.91224,5.59894A15.1598,15.1598,0,0,1,8.03705,22.90491,15.15975,15.15975,0,0,1,23.33337,7.88947,15.15969,15.15969,0,0,1,38.62958,22.90491,14.75572,14.75572,0,0,1,35.24561,32.32147Z" :fill="fill"/>
    </svg>
  </div>
</template>
  
<script setup>
  const props = defineProps({
    width: {
      type: String,
      default: '20px'
    },
    fill: {
      type: String,
      default: '#fff'
    }
  })
</script>
  
<style lang="scss">
  .jnv-search__background {
    background-color: #c41616;
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 999px;

    svg {
      position: absolute;
      top: 6px;
      left: 6px;
    }
  }
</style>