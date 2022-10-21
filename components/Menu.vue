<template>
  <div :class="'jnv-menu__container--' + forDevice">
    <div :class="'jnv-menu__wrapper--' + forDevice">
      <NuxtLink to="/heroes" active-class="jnv-menu__active" :class="'jnv-menu__item--' + forDevice"
                @click="linkClicked">Heroes</NuxtLink>
      <NuxtLink to="/news" active-class="jnv-menu__active" :class="'jnv-menu__item--' + forDevice"
                @click="linkClicked">News</NuxtLink>
      <NuxtLink to="/about" active-class="jnv-menu__active" :class="'jnv-menu__item--' + forDevice"
                @click="linkClicked">About</NuxtLink>
    </div>    
  </div>
</template>
  
<script setup>
  const props = defineProps({
    forDevice: {
      type: String,
      default: 'desktop'
    }
  })

  const emit = defineEmits(['itemClicked'])

  const linkClicked = () => {
    emit('itemClicked')
  }
</script>