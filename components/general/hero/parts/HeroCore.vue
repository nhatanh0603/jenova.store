<template>
  <div class="jnv-hero-detail__detail-container jnv-hero-detail__background">
    <div class="jnv-hero-detail__hero-name jnv-hero-detail__title-area">
      <span class="jnv-hero-detail__hero-name-display">{{ data.display_name }}</span>
    </div>

    <div class="jnv-hero-detail__primary-attribute">
      <Strength v-if="data.primary_attr == 0"/>
      <Agility v-else-if="data.primary_attr == 1"/>
      <Intelligence v-else/>

      <span class="jnv-hero-detail__attribute-name">
        {{ data.primary_attr == 0 ? 'Strength' : data.primary_attr == 1 ? 'Agility' : 'Intelligence'}}
      </span>
    </div>

    <div class="jnv-hero-detail__hero-on-liner" v-html="data.one_liner"></div>

    <HeroBase :attack_type="parseInt(data.attack_type)" :complexity="parseInt(data.complexity)"/>

    <HeroAttributes :attributes="data.attributes"/>

    <hr class="jnv-hero-detail__divider">

    <div class="jnv-hero-detail__price">
      <img :src="url.misc + 'coin.svg'" alt="Currency Icon" width="40">
      <span>{{ data.price }}</span>
    </div>

    <!-- ACTION GROUP -->
    <div class="jnv-hero-detail__actions">
      <div class="jnv-hero-detail__quantity">
        <QuantityEditable :stock="data.stock" @quantity-change="(val) => quantity = val"/>
        <span class="jnv-hero-detail__stock-available--singular" v-if="data.stock == 1">Only 1 left</span>
        <span class="jnv-hero-detail__stock-available--plural" v-else>{{ data.stock + ' pieces available'}}</span>
      </div>

      <div class="jnv-hero-detail__action-group">
        <button class="jnv-hero-detail__button jnv-hero-detail__button--buy-now" @click="buyNow">
          Buy Now</button>
        <button class="jnv-hero-detail__button jnv-hero-detail__button--add-to-cart" @click="addToCart">
          Add To Cart
        </button>
      </div>              
    </div>
  </div>
</template>
  
<script setup>
  import QuantityEditable from '../../QuantityEditable.vue'
  import HeroBase from '../parts/HeroBase.vue'
  import HeroAttributes from '../parts/HeroAttributes.vue'
  import Strength from '../../svg/attributes/Strength.vue'
  import Agility from '../../svg/attributes/Agility.vue'
  import Intelligence from '../../svg/attributes/Intelligence.vue'
  import { useCartStore } from '@/stores/cart'
  
  const props = defineProps({
    data: Object
  })
  
  const { url } = useAppConfig()
  const quantity = ref(1)

  const buyNow = () => {
    useCartStore().buyNow(props.data.id, quantity.value)
  }

  const addToCart = () => {
    useCartStore().addToCart(props.data.id, quantity.value)
  }
</script>
  
<style lang="scss">
  @import '@/assets/css/variables.scss';

  .jnv-hero-detail__detail-container {
    width: 40%;
    height: fit-content;
    margin-left: 1rem;

    .jnv-hero-detail__hero-name {
      font-size: 30px;
      font-weight: 900;
      text-transform: uppercase;

      .jnv-hero-detail__hero-name-display {
        @include golden-gradient-text;
      }
    }

    .jnv-hero-detail__primary-attribute {
      display: flex;
      align-items: center;
      margin-bottom: 5px;

      .jnv-hero-detail__attribute-name {
        margin-left: 10px;
        font-size: 16px;
        text-transform: uppercase;
        font-weight: bold;
      }
    }

    .jnv-hero-detail__hero-on-liner {
      margin: 8px 0 15px 0;
      font-weight: 600;
      color: $jnv__color--light-sage;
    }

    .jnv-hero-detail__divider {
      width: 100%;
      margin: 15px 0;
      border-color: $jnv__color--pale-black;
    }

    .jnv-hero-detail__price {
      margin: 10px 0 15px;
      font-size: 28px;
      font-weight: 800;
      justify-content: center;
      align-items: center;
      display: flex;
      
      img {
        margin-right: 10px;
      }

      span {
        @include golden-gradient-text;
      }
    }

    .jnv-hero-detail__actions {
      display: flex;            
      flex-direction: column;

      .jnv-hero-detail__quantity {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 15px;

        .jnv-hero-detail__stock-available--singular {
          color: $jnv__color--red;
          margin-top: 10px;
        }

        .jnv-hero-detail__stock-available--plural {
          color : $jnv__color--kelly-green;
          margin-top: 10px;
        }
      }

      .jnv-hero-detail__action-group {
        display: flex;
        width: 100%;
        margin-top: 15px;
        box-shadow: 0 0 5px 1px $jnv__shadow-color--light-black;

        .jnv-hero-detail__button {
          padding: 10px 18px;
          width: 50%;
          font-weight: 700;
          z-index: 1;

          &:hover {
            box-shadow: 0 0 5px 1px $jnv__shadow-color--white;
            z-index: 2;
          }
          &:active {
            box-shadow: 0 0 10px 1px $jnv__shadow-color--light-black;
            z-index: 2;
          }
        }

        .jnv-hero-detail__button--buy-now {
          background: radial-gradient(#c41616, #6a0000);
        }

        .jnv-hero-detail__button--add-to-cart {
          background: radial-gradient(#00a905, #014e00);
        }
      }
    }
  }
</style>