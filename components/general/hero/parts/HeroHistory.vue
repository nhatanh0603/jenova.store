<template>
  <div class="jnv-hero-detail__section">
    <div class="jnv-hero-detail__history jnv-hero-detail__background">
      <div class="jnv-hero-detail__secondary-title jnv-hero-detail__title-area">
        {{ $t('hero.history') }}
      </div>

      <div class="jnv-hero-detail__history-container">
        <Transition name="jnv-history-fade" mode="out-in">
          <div v-html="lore" v-if="!showHistory"></div>
          <div v-html="history" v-else></div>
        </Transition>

        <div class="jnv-hero-detail__history-toggle">
          <span @click="showHistory = !showHistory">
            {{ showHistory ? $t('hero.close_history') : $t('hero.read_full_history') }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
  const props = defineProps({
    lore: String,
    history: String
  })

  const showHistory = ref(false)
</script>
  
<style lang="scss">
  @import '@/assets/css/variables.scss';

  .jnv-hero-detail__history-container {
    display: flex;
    flex-direction: column;
    
    .jnv-hero-detail__history-toggle {
      margin-top: 1rem;
      padding: 5px 0;
      text-align: center;
      background: $jnv__bg-dark-navy--two-side-fade;

      span {
        cursor: pointer;
        color: $jnv__color--purply-pink;

        &:hover {
          text-shadow: 0 0 4px $jnv__color--purply-pink;
        }
      }
    }
  }

  .jnv-history-fade-enter-active, .jnv-history-fade-leave-active {
    transition: opacity 0.2s ease-in-out;
  }

  .jnv-history-fade-enter-from, .jnv-history-fade-leave-to {
    opacity: 0;
  }
</style>