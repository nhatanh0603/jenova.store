<template>
  <div class="jnv-attribute">
    <Strength :width="width" v-if="primary == 0"/>
    <Agility :width="width" v-else-if="primary == 1"/>
    <Intelligence :width="width" v-else/>

    <span v-if="hasLabel" class="jnv-attribute__label">{{ label[primary] }}</span>
  </div>
</template>
  
<script setup>
  import Strength from './Strength.vue'
  import Agility from './Agility.vue'
  import Intelligence from './Intelligence.vue'

  const props = defineProps({
    primary: {
      type: Number,
      default: 0
    },
    hasLabel: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '30px'
    }
  })

  const label = {
    0: 'Strength',
    1: 'Agility',
    2: 'Intelligence'
  }
</script>
  
<style lang="scss">
  .jnv-attribute {
    display: flex;
    justify-content: center;
    align-items: center;

    .jnv-attribute__label {
      margin-left: 10px;
    }
  }
</style>