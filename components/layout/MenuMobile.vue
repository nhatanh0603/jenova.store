<template>
  <div class="jnv-header__navigation-bar--mobile">
    <Cart />

    <div class="jnv-header__mobile-menu-icon" @click="toggle(true)">
      <HamburgerMenu />
    </div>

    <Teleport to='body'>
      <div class="jnv-header__mobile-menu-item section" v-show="show">
        <div class="jnv-header__mobile-menu--top">
          <img :src="url.logoFull"
               alt="Jenova Store Full Logo"
               class="jnv-header__full-logo"
          >
          <Xmark width="25" @click="toggle(false)"/>
        </div>

        <div class="jnv-header__mobile-menu--mid">
          <AuthActionGroup for-device="mobile" @item-clicked="toggle(false)"/>

          <MainMenu for-device="mobile" @item-clicked="toggle(false)"/>
        </div>

        <div class="jnv-header__mobile-menu--bot">
          <LanguageSwitcher />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
  import Xmark from '../general/svg/Xmark.vue'
  import HamburgerMenu from '../general/svg/HamburgerMenu.vue'
  import LanguageSwitcher from '../general/LanguageSwitcher.vue'
  import AuthActionGroup from '../authentication/AuthActionGroup.vue'
  import MainMenu from './MenuDesktop.vue'
  import Cart from '../general/svg/Cart.vue'

  const show = ref(false)
  const { url } = useAppConfig()

  const toggle = (status) => {
    show.value = status
    document.body.style.overflow = status ?  'hidden' : ''
  }
</script>

<style lang="scss">
  @import '../assets/css/variables.scss';

  .jnv-header__navigation-bar--mobile {
    display: none;

    .jnv-header__mobile-menu-icon {
      cursor: pointer;      
      display: flex;
    }
  }

  .jnv-header__mobile-menu-item {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-image: $jnv-app__background--primary;
    z-index: 55;

    .jnv-header__mobile-menu--top {
      display: flex;
      justify-content: space-between;
      align-items: center;

      img, svg {
        cursor: pointer;
      }

      svg:hover {
        .jnv-svg__x-mark {
          fill: $jnv__color--white;
        }        
      }
    }

    .jnv-header__mobile-menu--mid {
      margin: 30px 0;
    }

    .jnv-header__mobile-menu--bot {
      padding-top: 30px;
      border-top: 1px solid $jnv__color--light-grey;

      .jnv-locale-switcher {
        margin-left: 0;

        .jnv-locale-switcher__choose-button {
          padding: 0;
          flex-direction: row;
          font-size: 20px;

          img {
            width: 50px;
            margin: 0 20px 0 0;
          }
        }

        .jnv-locale-switcher__option {
          width: 100%;
          font-size: 20px;

          .jnv-locale-switcher__item {
            span {
              margin: 0;
            }
            
            img {
              width: 50px;
              margin-right: 20px;
            }

            &:first-child {
              padding: 15px 15px 7.5px;
            }
            &:last-child {
              padding: 7.5px 15px 15px;
            }
          }
        }
      }
    }
  }
</style>