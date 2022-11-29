<template>
  <div class="jnv-heroes__filter-group--complexity jnv-heroes__filter-group-member">
    <Complexity :editable="true" :level="isActive.level" @choose-level="clickIcon"/>
  </div>
</template>
  
<script setup>
  import Complexity from '../../../svg/hero_base/Complexity.vue'

  const props = defineProps({
    isActive: {
      type: Object,
      default: {}
    }
  })

  const emit = defineEmits(['onClick'])

  const clickIcon = (type, value) => {
    emit('onClick', type, value)
  }
</script>