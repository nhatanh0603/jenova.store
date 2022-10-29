<template>
  <div class="jnv-hero-card__container">
    <div class="jnv-hero-card__wrapper">
      <div class="jnv-hero-card__content" @click="getHeroDetail">
        <div class="jnv-hero-card__header">
          <img :src="imageURL" alt="Hero Image">
        </div>

        <div class="jnv-hero-card__body">
          <div class="jnv-hero-card__hero-info">
            <div class="jnv-hero-card__hero-name">
              <Strength v-if="hero.primary_attr == 0"/>
              <Agility v-else-if="hero.primary_attr == 1"/>
              <Intelligence v-else/>
              
              <span class="jnv-hero-card__hero-name-display">{{ hero.name_loc }}</span>            
            </div>

            <hr class="jnv-hero-card__divider">

            <div class="jnv-hero-card__hero-on-liner">
              Shields his allies or himself from attacks
            </div>

            <HeroBase />
          </div> 

          <div class="jnv-hero-card__price">
            ${{ random(10,100) }}
          </div>
        </div>
      </div>
      

      <div class="jnv-hero-card__actions">
        <div class="jnv-hero-card__action-group">
          <button class="jnv-hero-card__button jnv-hero-card__button--buy-now" @click="buyNow">Buy Now</button>
          <button class="jnv-hero-card__button jnv-hero-card__button--add-to-cart" @click="addToCart">Add To Cart</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
  import Strength from '../svg/attributes/Strength.vue'
  import Agility from '../svg/attributes/Agility.vue'
  import Intelligence from '../svg/attributes/Intelligence.vue'
  import HeroBase from './parts/HeroBase.vue'

  const props = defineProps({
    hero: Object
  })

  let imageURL = ref(useRuntimeConfig().apiHeroImage)
  let heroName = ''
  
  onBeforeMount(() => {
    heroName = props.hero.name.split('npc_dota_hero_')[1]
    imageURL.value += heroName + '.png'
  })

  const getHeroDetail = () => {
    console.log(props.hero.id)
    useRouter().push({ path: `/hero/${heroName}` })
  }

  const buyNow = () => {
    console.log('Buy Now')
  }

  const addToCart = () => {
    console.log('Add To Cart')
  }

  const random = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}
</script>

<style lang="scss" scoped>
  @import '@/assets/css/variables.scss';

  .jnv-hero-card__container {
    margin: auto;
    cursor: pointer;

    .jnv-hero-card__wrapper {
      margin: 2rem;      
      height: fit-content;
      width: 256px;
      border-radius: $jnv-hero-card__border;
      box-shadow: 0px 0px 5px 1px $jnv__shadow-color--almost-black;

      &:hover {
        animation: hero-card-hover 1s linear, hero-card-scale 0.3s linear;
        box-shadow: 0px 0px 10px 1px $jnv__color--white;
        transform: scale(1.1)
      }

      .jnv-hero-card__content {
        .jnv-hero-card__header {
          display: flex;

          img {
            width: $jnv-hero-card__width;
            border-radius: $jnv-hero-card__border $jnv-hero-card__border 0 0;
          }
        }

        .jnv-hero-card__body {
          padding: 1rem;
          width: $jnv-hero-card__width;
          //border-radius: 0 0 $jnv-hero-card__border $jnv-hero-card__border;
          background: $jnv-hero-card__body-background;
          color: $jnv__color--white;

          .jnv-hero-card__hero-info {
            display: flex;
            flex-direction: column;

            .jnv-hero-card__hero-name {
              display: flex;
              align-items: center;
              margin-bottom: 5px;

              svg {
                margin-right: 1rem;
              }

              .jnv-hero-card__hero-name-display {
                font-size: 18px;
                word-wrap: break-word;
                text-transform: uppercase;
                font-weight: 800;
                color: $jnv__color--apricot;
                //color: $jnv__color--white;
              }
            }
            
            .jnv-hero-card__divider {
              width: 100%;
              border-color: $jnv__color--pale-black;
            }

            .jnv-hero-card__hero-on-liner {
              text-transform: capitalize;
              font-size: 12px;
              margin: 5px 0 10px 0;
            }
          }

          .jnv-hero-card__price {
            font-size: 30px;
            font-weight: 900;
            margin-top: 10px;
            color: $jnv__color--kelly-green;
          }
        }
      }
      

      .jnv-hero-card__actions {
        .jnv-hero-card__action-group {
          display: flex;

          .jnv-hero-card__button {
            padding: 0.4rem 0.8rem;
            font-weight: 700;
            font-size: 12px;
            width: 100%;
            padding: 12px 0;

            &:hover {
              box-shadow: 0 0 5px 1px $jnv__shadow-color--light-black;
              z-index: 1;
            }
            &:active {
              box-shadow: 0 0 5px 1px $jnv__shadow-color--white;
            }
          }

          .jnv-hero-card__button--buy-now {
            //background: linear-gradient(to right, $jnv__color--black, $jnv__color--scarlet);
            background-color: $jnv__color--scarlet;
            border-radius: 0 0 0 $jnv-hero-card__border;
          }

          .jnv-hero-card__button--add-to-cart {
            //background: linear-gradient(to right, $jnv__color--black, $jnv__color--kelly-green);
            background-color: $jnv__color--kelly-green;
            border-radius: 0 0 $jnv-hero-card__border 0;
          }
        }
      }
    }
  }

  @keyframes hero-card-hover {
    from {
      box-shadow: 0px 0px 5px 1px $jnv__shadow-color--almost-black;
    }
    to {
      box-shadow: 0px 0px 10px 1px $jnv__color--white;
    }
  }

  @keyframes hero-card-scale {
    from {
      transform: scale(1)
    }
    to {
      transform: scale(1.1)
    }
  }
</style>