<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100" :width="width" :class="class"><rect width="120" height="20" rx="7.49999" :fill="fill" /><rect y="40" width="120" height="20" rx="7.49999" :fill="fill" /><rect y="80" width="120" height="20" rx="7.49999" :fill="fill" /></svg>
</template>

<script setup>
const props = defineProps({
  width: {
    type: String,
    default: "25"
  },

  fill: {
    type: String,
    default: "#e3e3e3"
  },

  class: {
    type: String,
    default: "jnv-svg__hamburger-menu"
  }
})
</script>

<style lang="scss">
@import '~~/assets/css/variables.scss';
.jnv-svg__hamburger-menu {
  &:hover {
    rect {
      fill: $jnv__color--white;
    }
  }
}
</style>