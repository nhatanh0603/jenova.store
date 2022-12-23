<template>
  <div>
    <div class="jnv-app__initial-screen" v-if="initialData.firstTimeAccess">
      <div class="jnv-app__initial-wrapper">
        <img :src="url.logoFull" alt="Jenova Store Logo Full">
        
        <div class="jnv-loader__wrapper">
          <span class="jnv-loader--line"></span>
        </div>
      </div>
    </div>

    <NuxtLayout v-else>
      <NuxtPage/>

      <div class="jnv-global-loader" v-if="initialData.globalPending">
        <Loader width="40"/>
      </div>

      <GlobalNotification />
    </NuxtLayout>
  </div>
</template>

<script setup>
  import { useInitialDataStore } from '@/stores/initialData'
  import { useI18n } from 'vue-i18n'
  import Loader from './components/general/Loader.vue';
  import GlobalNotification from './components/general/GlobalNotification.vue'

  const { url } = useAppConfig()
  const { locale } = useI18n()
  const initialData = useInitialDataStore()
  const { appName } = useRuntimeConfig()
  
  useHead({
    titleTemplate: (titleChunk) => {
      return titleChunk ? appName + ' - ' + titleChunk : ''
    },
    
    meta: [
      { name: 'description', content: 'Việc làm NuxtJS Framework, Laravel Framework, Laravel, Vue.js, VueJs, Javascript, PHP, Nuxt JS Framework, Vue Js, Nuxt.JS Framework' }
    ],
  })

  onBeforeMount(() => {
    if(localStorage.getItem('locale')) {
      locale.value = localStorage.getItem('locale')
    }else {
      localStorage.setItem('locale', locale.value)
    }
  })
</script>