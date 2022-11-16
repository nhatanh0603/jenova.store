<template>
  <div class="jnv-svg__recycle-bin">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.64766 64" :width="width" :height="height">
      <path d="M13.58682,64a7.51519,7.51519,0,0,1-5.47529-2.19011,7.31049,7.31049,0,0,1-2.23067-5.43473V11.51838H1.17617V3.89354H19.91381V0H44.00507V3.89354H62.82383v7.62484H58.11914V56.37516a7.2829,7.2829,0,0,1-2.27124,5.39417A7.48309,7.48309,0,0,1,50.41318,64ZM50.41318,11.51838H13.58682V56.37516H50.41318ZM21.77947,50.04816h6.24588v-32.365H21.77947Zm14.19518,0h6.327v-32.365h-6.327ZM13.58682,11.51838v0Z" transform="translate(-1.17617)" :fill="fill"/>
    </svg>
  </div>
</template>
  
<script setup>
  const props = defineProps({
    width: {
      type: String,
      default: '18px'
    },
    height: {
      type: String,
      default: '18px'
    },
    fill: {
      type: String,
      default: '#fff'
    }
  })
</script>
  
<style lang="scss">
  .jnv-svg__recycle-bin {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover svg path {
      fill: #c41616;
    }
  }
</style>