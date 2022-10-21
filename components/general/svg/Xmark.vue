<template>
  <svg :width="width" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13.95816,11l6.4292-6.42919a2.09173,2.09173,0,0,0-2.95814-2.95816L11,8.04187,4.57077,1.61268A2.09173,2.09173,0,0,0,1.61263,4.57084L8.04183,11,1.61263,17.4292a2.09173,2.09173,0,0,0,2.95814,2.95817L11,13.95817l6.42922,6.4292a2.09173,2.09173,0,0,0,2.95814-2.95817Z" transform="translate(-1 -1)" :fill="fill" :class="class"/></svg>
</template>

<script setup>
const props = defineProps({
  width: {
    type: String,
    default: "18"
  },
  
  fill: {
    type: String,
    default: "#e3e3e3"
  },

  class: {
    type: String,
    default: "jnv-svg__x-mark"
  }
})
</script>