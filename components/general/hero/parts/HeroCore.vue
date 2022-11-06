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
      ${{ data.price }}
    </div>

    <!-- ACTION GROUP -->
    <div class="jnv-hero-detail__actions">
      <div class="jnv-hero-detail__quantity">
        <div class="jnv-hero-detail__quantity-change">-</div>
        <input class="jnv-hero-detail__quantity-display" type="number" min="1" max="100" value="1">
        <div class="jnv-hero-detail__quantity-change">+</div>
      </div>

      <div class="jnv-hero-detail__action-group">
        <button class="jnv-hero-detail__button jnv-hero-detail__button--buy-now">Buy Now</button>
        <button class="jnv-hero-detail__button jnv-hero-detail__button--add-to-cart">Add To Cart</button>
      </div>              
    </div>
  </div>
</template>
  
<script setup>
  import HeroBase from '../parts/HeroBase.vue'
  import HeroAttributes from '../parts/HeroAttributes.vue'
  import Strength from '../../svg/attributes/Strength.vue'
  import Agility from '../../svg/attributes/Agility.vue'
  import Intelligence from '../../svg/attributes/Intelligence.vue'
  
  const props = defineProps({
    data: Object
  })
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
      margin: 10px 0;
      font-size: 28px;
      font-weight: 800;
      text-align: center;
      @include golden-gradient-text;
    }

    .jnv-hero-detail__actions {
      display: flex;            
      flex-direction: column;

      .jnv-hero-detail__quantity {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 15px;

        .jnv-hero-detail__quantity-display {
          margin: 0 1rem;
          width: 50px;
          border: none;
          background-color: $jnv__color--dark-blue;
          color: $jnv__color--white;
          padding: 6px 10px;
          font-size: medium;
          font-weight: 500;
          text-align: center;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input[type=number] {
          -moz-appearance: textfield;
        }

        .jnv-hero-detail__quantity-change {
          cursor: pointer;
          font-weight: 900;
          font-size: 25px;
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