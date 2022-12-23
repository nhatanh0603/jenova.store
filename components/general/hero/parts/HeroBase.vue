<template>
  <div class="jnv-hero-base">
    <div class="jnv-hero-base__wrapper">
      <div class="jnv-hero-base__title">
        <span>{{ $t('hero.attack_type') }}</span>
      </div>
      <div class="jnv-hero-base__detail">
        <div class="jnv-hero-base__detail-wrapper">
          <Melee :width="width" v-if="attack_type == 1"/>
          <Ranged :width="width" v-else/>
          <span>{{ attack_type == 1 ? $t('hero.melee') : $t('hero.ranged')}}</span>
        </div>        
      </div>
    </div>

    <div class="jnv-hero-base__wrapper">
      <div class="jnv-hero-base__title">
        <span>{{ $t('hero.complexity') }}</span>
      </div>
      <div class="jnv-hero-base__detail">
        <div class="jnv-hero-base__detail-wrapper">
          <Complexity :level="complexity" :size="size"/>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
  import Melee from '../../svg/hero_base/Melee.vue'
  import Ranged from '../../svg/hero_base/Ranged.vue'
  import Complexity from '../../svg/hero_base/Complexity.vue'

  defineProps({
    attack_type: Number,
    complexity: Number,
    width: {
      type: String,
      default: '18px'
    },
    size: {
      type: String,
      default: '15px'
    }
  })
</script>
  
<style lang="scss">
  @import '@/assets/css/variables.scss';

  .jnv-hero-base {
    display: table;
    width: 100%;
    
    .jnv-hero-base__wrapper {
      display: table-row;
      text-transform: uppercase;
      font-weight: bold;

      .jnv-hero-base__title {
        display: table-cell;
        font-size: 12px;
        vertical-align: middle;
        color: $jnv__color--purply-pink;
        white-space: nowrap;
        padding: 8px 0;
        
        span {
          margin-right: 40px;
        }
      }

      .jnv-hero-base__detail {
        display: table-cell;
        font-size: 11px;
        width: 100%;

        .jnv-hero-base__detail-wrapper {
          padding: 5px 0;
          display: flex;
          align-items: center;
        }

        svg {
          margin-right: 8px;
        }
      }
    }
  }
</style>