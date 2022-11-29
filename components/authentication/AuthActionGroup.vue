<template>
  <div :class="'jnv-header__user-wrapper--' + forDevice" :title="user.info.name" v-if="user.signedIn">
    <div v-if="forDevice == 'mobile'">
      <div :class="'jnv-header__user-avatar--' + forDevice">
        <img :src="url.logoSymbol" alt="Default Avatar">

        <span>{{ user.info.name }}</span>
      </div>

      <div :class="'jnv-user__user-menu--' + forDevice">
        <div :class="'jnv-user__user-menu-item--' + forDevice" @click="itemSelected('profile')">{{ $t('auth.profile') }}</div>
        <div :class="'jnv-user__user-menu-item--' + forDevice" @click="itemSelected('signout')">{{ $t('auth.sign_out') }}</div>
      </div>
    </div>
    
    <Dropdown :needExpand="false"
              preOpsClassName="jnv-user-menu__" 
              :dropDownList="{
                  'profile' : $t('auth.profile'),
                  'signout' : $t('auth.sign_out')
                }"
              @item-selected="itemSelected"
              v-else
    >
      <div :class="'jnv-header__user-avatar--' + forDevice">
        <img :src="url.logoSymbol" alt="Default Avatar">

        <span>{{ user.info.name }}</span>
      </div>
    </Dropdown>
  </div>

  <div :class="'jnv-auth__action-group--' + forDevice" v-else>
    <button @click="showAuthModal.sign_in = true"
            :class="forDevice === 'desktop' ? 'jnv-auth__signin-button' : 'jnv-auth__mobile-menu-button'"
    >
      {{ $t('auth.sign_in') }}
    </button>
    
    <button @click="showAuthModal.sign_up = true"
            :class="forDevice === 'desktop' ? 'jnv-auth__signup-button' : 'jnv-auth__mobile-menu-button'"
    >
      {{ $t('auth.sign_up') }}
    </button>
  </div>
</template>
  
<script setup>
  import Dropdown from '../general/pattern/Dropdown.vue'
  import { storeToRefs } from 'pinia'
  import { useAuthStore } from '@/stores/auth'

  const props = defineProps({
    forDevice: {
      validator(value) {
        return ['desktop', 'mobile'].includes(value)
      }
    }
  })

  const auth =useAuthStore()
  const { showAuthModal, user } = storeToRefs(auth)
  const { url } = useAppConfig()

  const itemSelected = (value) => {
    //signout, profile
    switch (value) {
      case 'signout':
        auth.signOut()

        break;

      default:
        break;
    }
  }
</script>

<style lang="scss">
  @import '@/assets/css/variables.scss';
  
  /* DESKTOP */
  .jnv-header__user-avatar--desktop {
    display: flex;
    align-items: center;
    cursor: pointer;    

    img {
      width: 40px;
      background-color: $jnv__color--white;
      padding: 7px;
      border-radius: 999px;
      margin-right: -10px;
      z-index: 10;
    }

    span {
      background-color: $jnv__color--white;
      color: $jnv__color--scarlet;
      font-weight: 700;
      padding: 3px 12px;
      border-radius: 0 999px 999px 0;
      max-width: 180px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &:hover {
      img, span {
        box-shadow: 0 0 8px 0 $jnv__color--white;
      }
    }
  }

  .jnv-user-menu__option {
    position: absolute;
    left: 44px;
    color: $jnv__color--light-black;
    font-weight: 700;
    border-radius: 5px;
    box-shadow: 0 0 7px 1px $jnv__shadow-color--light-black;

    .jnv-user-menu__item {
      background-color: $jnv__color--white;
      padding: 0.25rem 1rem;
      cursor: pointer;

      &:first-child {
        padding-top: 0.5rem;
        border-radius: 5px 5px 0 0;
      }
      &:last-child {
        border-radius: 0 0 5px 5px;
        padding-bottom: 0.5rem;
      }
      &:hover {
        background-color: $jnv__color--scarlet;
        color: $jnv__color--white;
      }
    }
  }  

  /* MOBILE */
  .jnv-header__user-avatar--mobile {
    background-image: linear-gradient(90deg, $jnv__color--black, transparent);
    padding: 1rem 1.5rem;
    border-radius: 10px;
    align-items: center;
    cursor: pointer;
    display: flex;

    &:hover {
      background-image: $jnv-user__menu-background;
    }

    img {
      width: 40px;
      margin-right: 20px;
    }

    span {
      font-size: 22px;
      font-weight: 700;
    }
  }

  .jnv-user__user-menu--mobile {
    background-image: $jnv-user__menu-background;
    padding: 1rem;
    margin: 0.5rem 4rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;

    .jnv-user__user-menu-item--mobile {
      font-size: 16px;
      font-weight: 600;
      margin: 0.5rem;
      cursor: pointer;

      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }

      &:hover {
        color: $jnv__color--blue;
      }
    }
  }

  /* ACTION GROUP: SIGNIN SIGNUP */
  .jnv-auth__action-group--desktop {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .jnv-auth__action-group--mobile {
    display: flex;
    flex-direction: column;

    .jnv-auth__mobile-menu-button {
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 1rem;
      width: 100%;

      &:hover {
        text-shadow: 0px 0px 6px $jnv__shadow-color--white;
      }
    }
  }

  /* Transition */
  .dropdown-transition-enter-from, .dropdown-transition-leave-to {
    opacity: 0;
    transform: translateY(-10px)
  }

  .dropdown-transition-enter-active, .dropdown-transition-leave-active {
    transition: all 0.3s ease;
  }
</style>