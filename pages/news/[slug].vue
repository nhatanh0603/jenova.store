<template>
  <div class="jnv-news-detail" v-if="Object.keys(newsDetail).length">
    <div class="jnv-news-detail__back" @click="$router.push('/news')">
      <Arrow type="left" fill="#fff"/>
      <span>Back To News</span>
    </div>

    <div class="jnv-news-detail__divider"></div>

    <div class="jnv-news-detail__headline">
      {{ newsDetail.headline }}
    </div>

    <div class="jnv-news-detail__created_at">
      {{ $formatDateTime(newsDetail.created_at) }}
    </div>

    <div v-html="newsDetail.body" class="jnv-news-detail__body"></div>
  </div>

  <CuriositySearch first-message="Uh oh. Page not found." v-else
                   second-message="Sorry, the page you were looking for doesn't exist or has been moved."           
  />
</template>
  
<script setup>
  import Arrow from '@/components/general/svg/Arrow.vue';
  import CuriositySearch from '@/components/general/CuriositySearch.vue'
  import { useNewsStore } from '@/stores/news'
  import { storeToRefs } from 'pinia'

  const { newsDetail } = storeToRefs(useNewsStore())
  const { fetchNewsDetail } = useNewsStore()
  const { url } = useAppConfig()

  onBeforeMount(() => {
    fetchNewsDetail(useRoute().params.slug, url.news)
  })
</script>
  
<style lang="scss">
  @import '@/assets/css/variables.scss';

  .jnv-news-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 30px;
    max-width: 900px;
    margin: auto;
    background: rgb(0 0 0 / 40%);
    padding: 2.5rem;
    box-shadow: 0 0 10px #141313;

    .jnv-news-detail__back {
      display: flex;
      align-self: flex-start;
      cursor: pointer;
      text-transform: uppercase;
      font-size: 17px;
      font-weight: 700;
      column-gap: 9px;

      svg {
        margin-top: 1.5px;
      }

      &:hover {
        color: #72ff77;

        svg path {
          fill: #72ff77;
        }
      }
    }

    .jnv-news-detail__divider {
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, transparent, white, transparent);
    }

    .jnv-news-detail__headline {
      text-align: center;
      font-size: 35px;
      font-weight: 900;
      @include golden-gradient-text;
    }

    .jnv-news-detail__created_at {
      font-weight: 600;
      color: #afadad;
    }

    .jnv-news-detail__body {
      font-size: 15px;
      line-height: 150%;
      letter-spacing: 0.5px;
      color: white;

      img {
        width: 100%;
        margin-bottom: 15px;
        //box-shadow: 0 0 10px #020202;
      }

      a {
        text-decoration: none;
        color: white;
        border-bottom: 1px solid white;
        font-weight: 600;

        &:hover {
          border-bottom: 1px solid #ff5e00;
        }
      }

      h1, h2, h3 {
        color: #fb7400;
        line-height: normal;
      }

      table {
        margin: auto;

        tr {
          th {
            padding: 1rem 1.5rem;
            background: rgb(0 0 0 / 50%);
            white-space: nowrap;
          }

          td {
            padding: 1rem 1.5rem;
            background: rgb(0 0 0 / 30%);
          }
        }
      }
    }
  }
</style>