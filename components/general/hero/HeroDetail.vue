<template>
  <div class="jnv-hero-detail">
    <div class="jnv-hero-detail__container">
      <div class="jnv-hero-detail__wrapper">
        <div class="jnv-hero-detail__hero-portrait-container">
          <video class="jnv-hero-detail__hero-portrait" poster="https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/terrorblade.png" autoplay preload="auto" loop playsinline muted>
            <source src="https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/terrorblade.webm" type="video/webm">
            <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/terrorblade.png">
          </video>
        </div>

        <div class="jnv-hero-detail__detail-container">
          <div class="jnv-hero-detail__hero-name">TERRORBLADE</div>

          <div class="jnv-hero-detail__primary-attribute">
            <Agility />
            <span class="jnv-hero-detail__attribute-name">Agility</span>
          </div>

          <div class="jnv-hero-detail__hero-on-liner">
            TRANSFORMS INTO A POWERFUL RANGED DEMON
          </div>

          <div class="jnv-hero-detail__price">
            $65
          </div>

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
      </div>
    </div>
  </div>
</template>
  
<script setup>
  import Agility from '../svg/attributes/Agility.vue'

</script>
  
<style lang="scss">
  @import '@/assets/css/variables.scss';

  .jnv-hero-detail {
    .jnv-hero-detail__container {
      .jnv-hero-detail__wrapper {
        display: flex;

        .jnv-hero-detail__hero-portrait-container {
          width: 60%;
          pointer-events: none;
          margin-right: 1rem;
          animation-duration: 1.3s;
          animation-timing-function: ease-out;
          animation-delay: 0s;
          animation-iteration-count: 1;
          animation-name: hero-portrait;

          .jnv-hero-detail__hero-portrait {
            width: 100%;
            height: 100%;
            max-width: 1440px;
            pointer-events: none;
            mask-image: linear-gradient(to top, transparent -3%, black 50%);
          }
        }

        .jnv-hero-detail__detail-container {
          width: 40%;
          display: flex;
          flex-direction: column;
          margin-left: 1rem;

          .jnv-hero-detail__hero-name {
            font-size: 35px;
            font-weight: 900;
            text-transform: uppercase;
            color: $jnv__color--apricot;
          }

          .jnv-hero-detail__primary-attribute {
            display: flex;
            align-items: center;

            .jnv-hero-detail__attribute-name {
              margin-left: 10px;
              font-size: 20px;
              text-transform: uppercase;
              font-weight: bold;
            }
          }

          .jnv-hero-detail__hero-on-liner {
            margin: 8px 0;
            font-size: 16px;
            font-weight: 600;
            color: $jnv__color--purply-pink;
          }

          .jnv-hero-detail__price {
            margin-top: 50px;
            margin-bottom: 10px;
            font-size: 40px;
            font-weight: 900;
            color: $jnv__color--kelly-green;
          }

          .jnv-hero-detail__actions {
            display: flex;            
            flex-direction: column;

            .jnv-hero-detail__quantity {
              display: flex;
              align-items: center;
              margin-bottom: 15px;

              .jnv-hero-detail__quantity-display {
                margin: 0 1rem;
                width: 50px;
                border: none;
                background-color: $jnv__color--dark-blue;
                color: $jnv__color--white;
                padding: 6px 10px;
                font-size: medium;
                border-radius: 10px;
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
              .jnv-hero-detail__button {
                padding: 10px 18px;
                width: 11rem;
                font-weight: 700;
                box-shadow: 0 0 5px 1px $jnv__shadow-color--light-black;
                border-radius: 999px;

                &:hover {
                  box-shadow: 0 0 5px 1px $jnv__shadow-color--white;
                }
                &:active {
                  box-shadow: 0 0 10px 1px $jnv__shadow-color--light-black;
                }
              }

              .jnv-hero-detail__button--buy-now {
                background-color: $jnv__color--scarlet;
                margin-right: 5px;
              }

              .jnv-hero-detail__button--add-to-cart {
                background-color: $jnv__color--kelly-green;
                margin-left: 5px;
              }
            }
          }
        }
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