<template>
  <div :class="class">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.666 7.708" :width="width.value + width.unit">
      <path d="M10,13.854,4.167,8.021,6.062,6.146,10,10.083l3.938-3.937,1.895,1.875Z" transform="translate(-4.167 -6.146)" :fill="fill" v-if="type === 'more'"/>

      <path d="M6.062,13.854,4.167,11.959,10,6.146l5.833,5.813-1.895,1.895L10,9.896Z" transform="translate(-4.167 -6.146)" :fill="fill" v-else/>
    </svg>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'more'
  },
  fill: {
    type: String,
    default: '#328AF1'
  },
  width: {
    type: Object,
    default(rawProps) {
      return { value: '12', unit: 'px'}
    }
  },
  class: String
})
</script>