<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.59096 60" :height="height" v-if="type === 'up'">
    <path d="M28.61118,62V14.69917L14.9132,28.53983l-4.70868-4.78L31.96433,2,53.79548,23.75981,49.0868,28.46849,35.31748,14.69917V62Z" transform="translate(-10.20452 -2)" :fill="fill"/>
  </svg>

  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.59096 60" :height="height" v-else-if="type === 'down'">
    <path d="M31.96433,62,10.20452,40.16885l4.70868-4.70868,13.698,13.76932V2h6.7063V49.22949L49.0868,35.46017l4.70868,4.70868Z" transform="translate(-10.20452 -2)" :fill="fill"/>
  </svg>

  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.5849 60" :height="height" v-else-if="type === 'left'">
    <path d="M43.20755,62l-30-30,30-30,7.5849,7.5849L28.37736,32,50.79245,54.41509Z" transform="translate(-13.20755 -2)" :fill="fill"/>
  </svg>

  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.58491 60" :height="height" v-else-if="type === 'right'">
    <path d="M20.79245,62l-7.5849-7.5849L35.62264,32,13.20755,9.58491,20.79245,2l30,30Z" transform="translate(-13.20755 -2)" :fill="fill"/>
  </svg>

  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.27154 60" :height="height" v-else>
    <path d="M32,62,15.86423,45.86423l5.32637-5.32637L32,51.42559,42.8094,40.53786l5.32637,5.32637ZM21.1906,23.38381l-5.32637-5.248L32,2,48.13577,18.13577l-5.32637,5.248L32,12.57441Z" transform="translate(-15.86423 -2)" :fill="fill"/>
  </svg>
</template>
  
<script setup>
  const props = defineProps({
    type: {
      validator(value) {
        return ['up', 'down', 'left', 'right', 'unfold'].includes(value)
      }
    },
    height: {
      type: String,
      default: '18px'
    },
    fill: {
      type: String,
      default: '#c41616'
    }
  })
</script>