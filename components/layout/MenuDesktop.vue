<template>
  <div :class="'jnv-menu__container--' + forDevice">
    <div :class="'jnv-menu__wrapper--' + forDevice">
      <NuxtLink to="/" :active-class="'jnv-menu__active--' + forDevice"
                :class="'jnv-menu__item--' + forDevice"
                @click="linkClicked">
                <span>{{ $t('content.page.navigation.home') }}</span>
      </NuxtLink>

      <NuxtLink to="/heroes" :active-class="'jnv-menu__active--' + forDevice"
                :class="'jnv-menu__item--' + forDevice"
                @click="linkClicked">
                <span>{{ $t('content.page.navigation.heroes') }}</span>
      </NuxtLink>

      <NuxtLink to="/news" :active-class="'jnv-menu__active--' + forDevice"
                :class="'jnv-menu__item--' + forDevice"
                @click="linkClicked">
                <span>{{ $t('content.page.navigation.news') }}</span>
      </NuxtLink>

      <NuxtLink to="/about" :active-class="'jnv-menu__active--' + forDevice"
                :class="'jnv-menu__item--' + forDevice"
                @click="linkClicked">
                <span>{{ $t('content.page.navigation.about') }}</span>
      </NuxtLink>
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