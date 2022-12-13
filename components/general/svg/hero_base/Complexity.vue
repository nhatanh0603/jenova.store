<template>
  <div class="jnv-hero-complexity">
    <div :class="['jnv-hero-complexity__diamond-piece',
          level >= 1 ? 'jnv-hero-complexity__diamond-piece--filled' : null]"
          :style="{width: size, height: size}"
          @click="chooseLevel(1)"
    ></div>
    <div :class="['jnv-hero-complexity__diamond-piece',
          level >= 2 ? 'jnv-hero-complexity__diamond-piece--filled' : null]"
          :style="{width: size, height: size}"
          @click="chooseLevel(2)"
    ></div>
    <div :class="['jnv-hero-complexity__diamond-piece',
          level == 3 ? 'jnv-hero-complexity__diamond-piece--filled' : null]"
          :style="{width: size, height: size}"
          @click="chooseLevel(3)"
    ></div>
  </div>
</template>
  
<script setup>
  const props = defineProps({
    level: {
      type: Number,
      default: 0
    },
    editable: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: '15px'
    }
  })

  const emit = defineEmits(['chooseLevel'])

  const level = ref(props.level)

  const chooseLevel = (lvl) => {
    if(props.editable) {
      lvl === level.value ? level.value = 0 : level.value = lvl
      emit('chooseLevel', 'complexity', level.value)
    }
  }
</script>
  
<style lang="scss">
  .jnv-hero-complexity {
    display: flex;
    column-gap: 12px;
    margin: 0 3.2px;
    justify-content: space-between;
    align-items: center;

    .jnv-hero-complexity__diamond-piece {
      border: 1px solid white;
      transform: rotateZ(45deg);
    }

    .jnv-hero-complexity__diamond-piece--filled {
      background-color: white;      
    }
  }
</style>