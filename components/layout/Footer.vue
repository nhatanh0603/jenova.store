<template>
  <div class="jnv-main-part jnv-footer__background">
    <footer class="jnv-footer section">
      <div class="jnv-footer__information">
        <div class="jnv-footer__basic-infor">
          <div class="jnv-footer__infor-container">
            <div class="jnv-footer__svg-container">
              <Phone />
            </div>
            <span>0935631988</span>
          </div>

          <div class="jnv-footer__infor-container">
            <div class="jnv-footer__svg-container">
              <EmailNew />
            </div>
              
            <span>nhatanh0603@gmail.com</span>
          </div>

          <div class="jnv-footer__infor-container">
            <div class="jnv-footer__svg-container">
              <Location />
            </div>
            
            <span>Ho Chi Minh City</span>
          </div>
          
          <div class="jnv-footer__social-network">
            <NuxtLink to="https://www.linkedin.com/in/jenova" class="jnv-footer__svg-container" target="_blank" 
                      title="https://www.linkedin.com/in/jenova">
              <LinkedIn />
            </NuxtLink>

            <NuxtLink to="https://join.skype.com/invite/WEV1ueDPhjS2" class="jnv-footer__svg-container" target="_blank"
                      title="https://join.skype.com/invite/WEV1ueDPhjS2">
              <Skype />
            </NuxtLink>
          </div>
        </div>

        <NuxtLink :to="url.misc + 'zalo.jpg'" class="jnv-footer__zalo-qr" target="_blank">
          <img :src="url.misc + 'zalo.jpg'" alt="Zalo QR">
        </NuxtLink>
      </div>

      <div class="jnv-footer__divider"></div>

      <div class="jnv-footer__reserved">© Jenova Store {{ new Date().getFullYear() }}. All rights reserved.</div>
    </footer>
  </div>
</template>

<script setup>
  import Skype from '../general/svg/Skype.vue'
  import LinkedIn from '../general/svg/LinkedIn.vue'
  import Phone from '../general/svg/Phone.vue'
  import EmailNew from '../general/svg/EmailNew.vue'
  import Location from '../general/svg/Location.vue'

  const { url } = useAppConfig()

  const information = [
    { name: 'Phone Number', component: Phone, value: '0935631988', 'is-link': false},
    { name: 'Email', component: EmailNew, value: 'nhatanh0603@gmail.com', 'is-link': false},
    { name: 'Location', component: Location, value: 'Ho Chi Minh City', 'is-link': false},
    { name: 'LinkedIn', component: LinkedIn, value: 'https://www.linkedin.com/in/jenova', 'is-link': true},
    { name: 'Skype', component: Skype, value: 'https://join.skype.com/invite/WEV1ueDPhjS2', 'is-link': true},
  ]
</script>

<style lang="scss">
  .jnv-footer__background {
    background: radial-gradient(circle at 8%, #01120b, #1d3152) !important;

    .jnv-footer {
      display: flex;
      flex-direction: column;
      row-gap: 30px;

      .jnv-footer__information {
        display: flex;
        justify-content: space-between;

        .jnv-footer__basic-infor {
          display: flex;
          flex-direction: column;
          row-gap: 10px;
          font-weight: 600;

          .jnv-footer__infor-container {
            display: flex;
            align-items: center;
            column-gap: 10px;
            cursor: pointer;
          }

          .jnv-footer__social-network {
            display: flex;
            align-items: center;
            column-gap: 10px;
          }
        }

        .jnv-footer__zalo-qr {
          display: flex;
          cursor: pointer;

          img {
            width: 150px;
            height: 150px;
            border-radius: 10px;
          }
        }
      }

      .jnv-footer__divider {
        width: 100%;
        height: 1px;
        background: linear-gradient(90deg, transparent, white, transparent);
      }
      
      .jnv-footer__reserved {
        text-align: center;
      }
    }
  }

  .jnv-footer__svg-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background-color: rgb(44 44 44);
    border-radius: 5px;

    svg {
      width: 22px;
    }
  }

  @media screen and (max-width: 430px) {
    .jnv-footer {
      .jnv-footer__information {
        flex-direction: column;
        row-gap: 25px;
        align-items: center;
      }
    }
  }
</style>