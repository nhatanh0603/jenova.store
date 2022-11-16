<template>
  <div class="jnv-heroes-main__container">
    <HeroCard v-for="(hero, index) in heroes.data" :hero="hero" :key="index"/>
    <span class="jnv-loader--line" v-if="isLoading"></span>
  </div>
</template>
  
<script setup>
  import HeroCard from '@/components/general/hero/HeroCard.vue'

  const heroes = ref({})
  const isLoading = ref(false)

  onBeforeMount(() => {
    fetchHeroes(true)

    window.addEventListener('scroll', lazyLoad)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', lazyLoad)
  })

  const lazyLoad = () => {
    var totalScreenHeight = document.body.scrollHeight
    var currentScrollPosition = window.scrollY + window.innerHeight

    if(currentScrollPosition > totalScreenHeight * 0.8 
        && isLoading.value == false 
        && heroes.value.links.next != null) {
      fetchHeroes()
    }
  }

  const fetchHeroes = async (ini = false) => {
    var url = ini ? '/category/1/products' : heroes.value.links.next

    await useApi(url, {
      async onRequest() {
        isLoading.value = true
      },

      async onResponse({ response }) {
        if(response.status == 200) {
          if(ini) {
            heroes.value = response._data
          }else {
            heroes.value.data.push(...response._data.data)
            heroes.value.links = response._data.links
            heroes.value.meta = response._data.meta
          }
          
          isLoading.value = false
        }        
      }
    })
  }
</script>
  
<style lang="scss">
  .jnv-heroes-main__container {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
</style>