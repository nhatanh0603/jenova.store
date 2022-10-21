<template>
  <div class="jnv-hero-complexity">
    <div :class="['jnv-hero-complexity__diamond-piece',
          level >= 1 ? 'jnv-hero-complexity__diamond-piece--filled' : null]"></div>
    <div :class="['jnv-hero-complexity__diamond-piece',
          level >= 2 ? 'jnv-hero-complexity__diamond-piece--filled' : null]"></div>
    <div :class="['jnv-hero-complexity__diamond-piece',
          level == 3 ? 'jnv-hero-complexity__diamond-piece--filled' : null]"></div>
  </div>
</template>
  
<script setup>
  const props = defineProps({
    level: {
      type: Number,
      default: 0
    }
  })
</script>
  
<style lang="scss">
  .jnv-hero-complexity {
    display: flex;
    width: 70px;
    justify-content: space-between;

    .jnv-hero-complexity__diamond-piece {
      width: 15px;
      height: 15px;
      border: 1px solid white;
      transform: rotateZ(45deg);
    }

    .jnv-hero-complexity__diamond-piece--filled {
      background-color: white;
    }
  }
</style>