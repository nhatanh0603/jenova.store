<template>
  <div class="jnv-main-part jnv-header-sticky">
    <header class="jnv-header section">
      <div class="jnv-header__logo">
        <NuxtLink to="/">
          <img :src="logoFull"
              alt="Jenova Store Full Logo"
              class="jnv-header__full-logo"
          >
        </NuxtLink>
      </div>

      <div class="jnv-header__navigation-bar--desktop">
        <AuthActionGroup for-device="desktop"/>

        <LanguageSwitcher />
      </div>

      <!-- Mobile Menu -->
      <Menu />

      <!-- MODALS -->
      <div v-if="!user.signedIn">
        <Auth auth-type="sign_in" btn-prim="sign_in" :btn-second="btnSecondSignIn" :btn-terti="btnTertiSignIn"/>
        <Auth auth-type="sign_up" btn-prim="create_account" :btn-second="btnSecondSignUp"/>
        <Auth auth-type="forgot_password" btn-prim="reset" :btn-second="btnSecondForgotPassword"/>
      </div>    
    </header>

    <MenuDesktop />
  </div>
</template>

<script setup>
import MenuDesktop from './Menu.vue'
import Menu from './mobile/Menu.vue'
import Auth from './authentication/Auth.vue'
import LanguageSwitcher from './general/LanguageSwitcher.vue'
import AuthActionGroup from './authentication/AuthActionGroup.vue'
import { useAuthStore } from '@/stores/auth'

const { logoFull } = useRuntimeConfig()
const { user } = useAuthStore()

const btnSecondSignIn = {
  'text': 'forgot_password',
  'next_modal': 'forgot_password'
}
const btnSecondSignUp = {
  'text': 'already_have_account',
  'next_modal': 'sign_in'
}
const btnSecondForgotPassword = {
  'text': 'or_sign_in',
  'next_modal': 'sign_in'
}
const btnTertiSignIn = {
  'text': 'sign_up',
  'next_modal': 'sign_up'
}
</script>

<style lang="scss">
  @import '../assets/css/variables.scss';

  .jnv-header {
    display: flex;
    align-items: center;

    .jnv-header__logo {
      display: flex;
      cursor: pointer;

      a {
        display: flex
      }
    }

    .jnv-header__navigation-bar--desktop {
      margin-left: auto;
      display: flex;
      align-items: center;
    }
  }

  .jnv-header__full-logo {
    width: 250px;
    max-width: 100%;
  }

  .jnv-header-sticky {
    position: sticky;
    top: 0;
    z-index: 9000;
  }

  @import '../assets/css/mobile/main.scss';
</style>