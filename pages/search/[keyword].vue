<template>
  <div class="jnv-search__page">
    <div class="jnv-search__page-title"><span>{{ $t('content.page.search.search_result_for') + ' ' }}</span>
      <span class="jnv-search__page-keyword">{{ $route.params.keyword }}</span></div>

    <div v-if="!loading">
      <div id="JnvSearchCardWrapper" class="jnv-search__page-container" v-if="Object.keys(result).length">
        <HeroCard v-for="(hero, index) in result" :hero="hero" :key="index"/>

        <FlexWrapJustify element-width="256" :element-count="result.length" wrapper-id="JnvSearchCardWrapper" column-gap="30"/>
      </div>

      <CuriositySearch :first-message="$t('content.page.search.not_found.message_one')" v-else
                   :second-message="$t('content.page.search.not_found.message_two')"           
      />
    </div>
    

    <span class="jnv-loader--line" v-else></span>
  </div>
</template>
  
<script setup>
  import HeroCard from '@/components/general/hero/HeroCard.vue'
  import FlexWrapJustify from '@/components/general/FlexWrapJustify.vue'
  import CuriositySearch from '@/components/general/CuriositySearch.vue'

  useHead({
    title: 'Search'
  })

  const result = ref({})
  const loading = ref(false)

  onMounted(() => {
    fetch()
  })

  const fetch = async () => {
    await useApi('/search/' + useRoute().params.keyword, {
      async onRequest() {
        loading.value = true
      },

      async onRequestError({ error }) {
        loading.value = false
        notification('danger', error)
      },

      async onResponse({ response }) {
        if(response.status == 200) {
          loading.value = false
          result.value = response._data.data
        }
      },

      async onResponseError({ response }) {
        loading.value = false
        notification('danger', response._data)
      }
    })
  }
</script>
  
<style lang="scss">
  .jnv-search__page {
    .jnv-search__page-title {
      margin-bottom: 3rem;
      font-size: 20px;
      background: linear-gradient(90deg,transparent, #035409, transparent);
      padding: 6px 15px;
      text-align: center;

      .jnv-search__page-keyword {
        color: #ebb16c;
        font-weight: 800;
      }
    }

    .jnv-search__page-container {
      display: flex;
      flex-wrap: wrap;
      gap: 60px 30px;
      justify-content: space-evenly;
    }

    .jnv-search__page-nothing {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        max-width: 500px;
      }
    }
  }
</style>