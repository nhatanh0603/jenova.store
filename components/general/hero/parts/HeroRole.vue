<template>
  <div class="jnv-hero-detail__roles jnv-hero-detail__background">
    <div class="jnv-hero-detail__secondary-title jnv-hero-detail__title-area">Roles</div>

    <div class="jnv-hero-detail__role-container">
      <div class="jnv-hero-detail__role-content" v-for="(role, index) in data" :key="index">
        <div class="jnv-hero-detail__role-title">
          <img :src="url.heroRole + index.toLowerCase() + '.png'" :alt="index" class="jnv-hero-detail__role-image">

          <span class="jnv-hero-detail__role-name">{{ index }}</span>
        </div>

        <div class="jnv-hero-detail__role-bar-background">
          <div class="jnv-hero-detail__role-bar" :style="'width:' + (role / 3) * 100 + '%'"></div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
  const props = defineProps({
    data: Object
  })

  const { url } = useAppConfig()
</script>
  
<style lang="scss">
  @import '@/assets/css/variables.scss';

  .jnv-hero-detail__roles {
    width: 50%;
    margin-right: 1rem;

    .jnv-hero-detail__role-container {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: -14px;

      .jnv-hero-detail__role-content {
        display: flex;
        flex-direction: column;
        width: 30%;
        margin-bottom: 14px;

        .jnv-hero-detail__role-title {
          display: flex;
          align-items: center;
          margin-bottom: 8px;

          .jnv-hero-detail__role-image {
            width: 30px;
            margin-right: 8px;
          }

          .jnv-hero-detail__role-name {
            font-weight: 600;
          }
        }

        .jnv-hero-detail__role-bar-background {
          background-color: grey;
          position: relative;
          width: 100%;
          height: 7px;

          .jnv-hero-detail__role-bar {
            background-color: white;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            box-shadow: 0 0 5px 0 $jnv__color--light-sage;
          }
        }
      }              
    }
  }

  @media screen and (max-width: 460px) {
    .jnv-hero-detail__role-content {
      width: 45% !important;
    }
  }
</style>