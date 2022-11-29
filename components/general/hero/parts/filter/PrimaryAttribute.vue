<template>
  <div class="jnv-heroes__filter-group--primary-attribute jnv-heroes__filter-group-member">
    <div :class="{'jnv-attribute__normal': true, 'jnv-heroes__filter-member-active': isActive.strength }" @click="clickIcon('0')">
      <Strength width="38px" :fill="isActive.strength ?  '#c41616' : '#b3b3b3'"/>
    </div>

    <div :class="{'jnv-attribute__normal': true, 'jnv-heroes__filter-member-active': isActive.agility }" @click="clickIcon('1')">
      <Agility width="38px" :fill="isActive.agility ? '#1fb11d' : '#b3b3b3'"/>
    </div>

    <div :class="{'jnv-attribute__normal': true, 'jnv-heroes__filter-member-active': isActive.intelligence }" @click="clickIcon('2')">
      <Intelligence width="38px" :fill="isActive.intelligence ? '#328AF1' : '#b3b3b3'"/>
    </div>
  </div>
</template>
  
<script setup>
  import Strength from '../../../svg/attributes/Strength.vue'
  import Agility from '../../../svg/attributes/Agility.vue'
  import Intelligence from '../../../svg/attributes/Intelligence.vue'

  const props = defineProps({
    isActive: {
      type: Object,
      default: {}
    }
  })

  const emit = defineEmits(['onClick'])

  const clickIcon = (value) => {
    emit('onClick', 'primary_attr', value)
  }
</script>