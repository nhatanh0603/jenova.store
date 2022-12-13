<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 59.97266 60" :width="width">
    <rect x="1.19034" y="20.00042" width="12.38297" height="39.99958" :fill="fill"/>
    <path d="M9.33559,16.76364A7.38207,7.38207,0,1,0,2.01367,9.3805,7.35364,7.35364,0,0,0,9.33559,16.76364Z" transform="translate(-2.01367 -2)" :fill="fill"/>
    <path d="M35.37625,41.00255c0-5.62352,2.59056-8.97389,7.54534-8.97389,4.55172,0,6.74174,3.2169,6.74174,8.97389V62h12.323V36.67285c0-10.71316-6.0744-15.89415-14.55388-15.89415a13.95012,13.95012,0,0,0-12.0562,6.60968v-5.388H23.49995V62h11.8763Z" transform="translate(-2.01367 -2)" :fill="fill"/>
  </svg>
</template>
  
<script setup>
  defineProps({
    width: {
      type: String,
      default: '30'
    },
    fill: {
      type: String,
      default: '#fff'
    }
  })
</script>