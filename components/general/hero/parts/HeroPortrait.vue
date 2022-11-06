<template>
  <div class="jnv-hero-detail__hero-portrait-container jnv-hero-detail__background">
    <video class="jnv-hero-detail__hero-portrait" :poster="posterUrl"
          autoplay preload="auto" loop playsinline muted
    >
      <source :src="videoUrl" type="video/webm" ref="videoSource" v-if="videoUrl">
      <img :src="posterUrl" :alt="data.display_name + 'Poster'">
    </video>

    <div class="jnv-hero-detail__hp-mp">
      <div class="jnv-hero-detail__hp jnv-hero-detail__pos">
        <span class="jnv-hero-detail__hp-mp-base">{{ data.max_health }}</span>
        <span class="jnv-hero-detail__hp-mp-bonus">{{ '+' + $toDec(data.health_regen) }}</span>
      </div>

      <div class="jnv-hero-detail__mp jnv-hero-detail__pos">
        <span class="jnv-hero-detail__hp-mp-base">{{ data.max_mana }}</span>
        <span class="jnv-hero-detail__hp-mp-bonus">{{ '+' + $toDec(data.mana_regen) }}</span>
      </div>
    </div>
  </div>
</template>
  
<script setup>
  const props = defineProps({
    data: Object
  })

  const { apiHeroPoster, apiHeroVideo } = useRuntimeConfig()

  const posterUrl = apiHeroPoster + props.data.name + '.png'
  const videoUrl = apiHeroVideo + props.data.name + '.webm'
</script>
  
<style lang="scss">
  @import '@/assets/css/variables.scss';

  .jnv-hero-detail__hero-portrait-container {
    width: 60%;
    height: inherit;
    pointer-events: none;
    margin-right: 1rem;
    padding: 0;
    animation-duration: 1.3s;
    animation-timing-function: ease-out;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-name: hero-portrait;

    .jnv-hero-detail__hero-portrait {
      width: 100%;
      height: 100%;
      padding: 1rem 0;
      max-width: 1440px;
      pointer-events: none;
      mask-image: linear-gradient(to top, transparent -3%, black 50%);
    }

    .jnv-hero-detail__hp-mp {
      text-align: center;
      font-size: 15px;
      margin: 0 (-$jnv-hero-detail__bg-padding) (-$jnv-hero-detail__bg-padding);

      .jnv-hero-detail__pos {
        padding: 6px 20px;
        position: relative;
      }

      .jnv-hero-detail__hp {
        background: linear-gradient(to right, #286323, #7AF03C);
      }

      .jnv-hero-detail__mp {
        background: linear-gradient(to right, #1056DB, #73F5FE);
      }

      .jnv-hero-detail__hp-mp-base {
        font-weight: 700;
        vertical-align: middle;
      }

      .jnv-hero-detail__hp-mp-bonus {
        font-size: 12px;
        position: absolute;
        top: 4px;
        margin-left: 6px;
      }
    }
  }

  @keyframes hero-portrait {
    0% {
      transform: translateX(-100px);
      opacity: 0;
    }
    100% {
        transform: translateX(0px);
        opacity: 1;
    }
  }
</style>