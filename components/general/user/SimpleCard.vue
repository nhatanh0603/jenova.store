<template>
  <div :class="['jnv-simple-card', primaryAttribute]" @click="$emit('showDetail', position)">
    <div class="jnv-simple-card__header">
      <img :src="url.heroImage + data.name + '.png'" :alt="data.display_name">
    </div>

    <div class="jnv-simple-card__body">
      <div class="jnv-simple-card__hero-name">
        <Attribute :primary="data.primary_attr" :has-label="false" width="20"/>
        <span>{{ data.display_name }}</span>
      </div>

      <div class="jnv-simple-card__divider"></div>

      <div class="jnv-simple-card__hero-oneliner">
        <span>{{ data.one_liner }}</span>
      </div>

      <div class="jnv-simple-card__unit">
        <span>{{ data.unit + ' ' + (data.unit == 1 ? $t(localePath + 'unit') : $t(localePath + 'units')) }}</span>
      </div>
    </div>
  </div>
</template>
  
<script setup>
  import Attribute from '@/components/general/svg/attributes/Attribute.vue'

  const props = defineProps({
    data: {
      type: Object,
      default: {}
    },

    position: {
      type: Number,
      default: 0
    }
  })

  const localePath = 'content.page.account.card.'

  const primaryAttribute = computed(() => {
    return ('jnv-simple-card__' + (props.data.primary_attr == 0 ? 'strength'
          : (props.data.primary_attr == 1 ? 'agility' : 'intelligence')))
  })
  const { url } = useAppConfig()
</script>
  
<style lang="scss">
  @import '@/assets/css/variables.scss';

  .jnv-simple-card {
    display: flex;
    flex-direction: column;
    width: 130px;
    font-size: 12px;
    height: fit-content;
    cursor: pointer;
    transition: transform 0.5s;

    &:hover {
      transform: scale(1.1);
    }

    .jnv-simple-card__header  {
      display: flex;

      img {
        width: 100%;
      }
    }

    .jnv-simple-card__body {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      row-gap: 10px;
      
      padding: 10px;

      .jnv-simple-card__hero-name {
        display: flex;
        align-items: center;
        column-gap: 10px;
        font-weight: 700;
        @include golden-gradient-text;
      }

      .jnv-simple-card__divider {
        height: 1px;
        width: 100%;      
        filter: drop-shadow(0 0 1px);
        background: linear-gradient(90deg, transparent, white, transparent);
      }

      .jnv-simple-card__hero-oneliner {
        font-style: italic;
      }

      .jnv-simple-card__unit {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;

        span {
          padding: 2px 10px;
          background: radial-gradient(rgb(0 0 0 / 50%), transparent);
          border-radius: 99px;
        }
      }
    }
  }

  .jnv-simple-card__strength {
    box-shadow: 0 0 6px #ef1717;

    .jnv-simple-card__body {
      background: radial-gradient(ellipse at top left, #0c0000 40%, #a50000);
    }
  }

  .jnv-simple-card__agility {
    box-shadow: 0 0 6px #29bb17;

    .jnv-simple-card__body {
      background: radial-gradient(ellipse at top left, #001401 40%, #108d01);
    }
  }

  .jnv-simple-card__intelligence {
    box-shadow: 0 0 6px #1377b7;

    .jnv-simple-card__body {
      background: radial-gradient(ellipse at top left, #000b14 40%, #025e91);
    }
  }
</style>