<template>
  <div :class="['jnv-curiosity-search', {'jnv-curiosity-search__background': haveBackground}]">
    <div class="jnv-curiosity-search__message" v-if="haveMessage">
      <div class="jnv-first-message" v-if="firstMessage.length">{{ firstMessage }}</div>
      <div class="jnv-second-message" v-if="secondMessage.length">{{ secondMessage }}</div>
    </div>

    <img :src="url.misc + 'curiosity-search.svg'" alt="Curiosity Search" :style="'max-width: ' + maxWidth">
  </div>
</template>
  
<script setup>
  defineProps({
    haveMessage: {
      type: Boolean,
      default: true,
    },
    firstMessage: {
      type: String,
      default: ''
    },
    secondMessage: {
      type: String,
      default: ''
    },
    maxWidth: {
      type: String,
      default: '400px'
    },
    haveBackground: {
      type: Boolean,
      default: true
    }
  })

  const { url } = useAppConfig()
</script>
  
<style lang="scss">
  .jnv-curiosity-search {
    display: flex;
    align-items: center;
    flex-direction: column;
    row-gap: 30px;
    padding: 20px 25px 30px;

    .jnv-curiosity-search__message {
      text-align: center;

      .jnv-first-message {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 6px;
        text-transform: uppercase;
      }

      .jnv-second-message {
        font-size: 20px;
        font-weight: 500;
      }
    }
  }

  .jnv-curiosity-search__background {
    box-shadow: 0 0 10px #141414;
    background: radial-gradient(circle at 2%, #204c2a, #365280);
  }
</style>