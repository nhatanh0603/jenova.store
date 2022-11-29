<template>
  <div class="jnv-heroes__filter-group--attack-type jnv-heroes__filter-group-member">
    <div :class="{'jnv-heroes__filter-group-member': true, 'jnv-heroes__filter-member-active': isActive.melee}"
         @click="clickIcon('1')"
    >
      <Melee width="36px" :fill="isActive.melee ? '#ff1313' : '#b3b3b3'"/>
    </div>

    <div :class="{'jnv-heroes__filter-group-member': true, 'jnv-heroes__filter-member-active': isActive.ranged}"
         @click="clickIcon('2')"
    >
      <Ranged width="36px" :fill="isActive.ranged ? '#ff1313' : '#b3b3b3'"/>
    </div>
  </div>
</template>
  
<script setup>
  import Melee from '../../../svg/hero_base/Melee.vue'
  import Ranged from '../../../svg/hero_base/Ranged.vue'

  const props = defineProps({
    isActive: {
      type: Object,
      default: {}
    }
  })

  const emit = defineEmits(['onClick'])

  const clickIcon = (value) => {
    emit('onClick', 'attack_capability', value)
  }
</script>