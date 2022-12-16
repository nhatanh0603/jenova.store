<template>
  <div class="jnv-news">
    <NuxtLink :to="'/news/' + report.slug" class="jnv-news__capsule"
              v-for="report in news.data" :key="report.slug"
    >
      <img :src="url.news + report.main_img" :alt="report.headline">

      <div class="jnv-news__content">
        <div class="jnv-news__title">
          {{ report.headline }}
        </div>

        <div class="jnv-news__description">
          {{ report.description }}...
        </div>

        <div class="jnv-news__date">
          {{ $formatDateTime(report.created_at) }}
        </div>
      </div>
    </NuxtLink>

    <span class="jnv-loader--line" v-if="isLoading"></span>
  </div>
</template>
  
<script setup>
  import { useNewsStore } from '@/stores/news'
  import { storeToRefs } from 'pinia'

  useHead({
    title: 'News'
  })

  const { news } = storeToRefs(useNewsStore())
  const { url } = useAppConfig()
  const isLoading = ref(false)

  onBeforeMount(() => {
    news.value = {}
    useNewsStore().fetch(isLoading)
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
        && news.value.links.next != null) {
      useNewsStore().fetch(isLoading)
    }
  }
</script>
  
<style lang="scss">
  .jnv-news {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 50px;

    .jnv-news__capsule {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 600px;
      box-shadow: 0 0 6px #082d5a;
      cursor: pointer;
      transition: transform 0.5s ease;
      text-decoration: none;
      color: white;

      &:hover {
        transform: scale(1.05);
        box-shadow: 0 0 10px #0455c1;
      }

      .jnv-news__content {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        background: radial-gradient(circle at 10%, #010e1c, #012148);
        padding: 10px 15px;

        .jnv-news__title {
          font-size: 25px;
          font-weight: 700;
          color: #ffd868;
          margin: 8px 0;
          text-align: center;
        }

        .jnv-news__description {
          text-indent: 15px;
          font-size: 15px;
          text-align: justify;
        }

        .jnv-news__date {
          text-align: end;
          color: #b0ffa2;
          font-style: italic;
          margin-top: 10px;
        }
      }
    }
  }
</style>