<template>
  <div>
    <Teleport to="body" v-if="!initialData.initialDataStatus.all">
      <div class="jnv-app__initial-screen">
        <div class="jnv-app__initial-wrapper">
          <img :src="url.logoFull" alt="Jenova Store Logo Full">
          
          <div class="jnv-loader__wrapper">
            <span class="jnv-loader--line"></span>
          </div>
        </div>
      </div>
    </Teleport>

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
    }
  })

  onBeforeMount(() => {
    if(localStorage.getItem('locale')) {
      locale.value = localStorage.getItem('locale')
      initialData.initialDataStatus.locale = true
    }else {
      localStorage.setItem('locale', locale.value)
      initialData.initialDataStatus.locale = true
    }
  })
</script>