<template>
  <div class="jnv-header__navigation-bar--mobile">
    <div class="jnv-header__mobile-menu-icon" @click="show = true">
      <HamburgerMenu />
    </div>

    <Teleport to='body'>
      <div class="jnv-header__mobile-menu-item section" v-show="show">
        <div class="jnv-header__mobile-menu--top">
          <img :src="rootUrl + '/jenova-store-full-logo.svg'"
               alt="Jenova Store Full Logo"
               class="jnv-header__full-logo"
          >
          <Xmark width="25" @click="show = false"/>
        </div>

        <div class="jnv-header__mobile-menu--mid">
          <AuthActionGroup for-device="mobile"/>

          <MainMenu for-device="mobile" @item-clicked="show = false"/>
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
  import MainMenu from '../Menu.vue'

  const show = ref(false)
  const { rootUrl } = useRuntimeConfig()
</script>