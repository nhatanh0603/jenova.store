<template>
  <div :class="'jnv-header__user-wrapper--' + forDevice" :title="user.info.name" v-if="user.signedIn">
    <div v-if="forDevice == 'mobile'">
      <div :class="'jnv-header__user-avatar--' + forDevice">
        <img :src="rootUrl + '/jenova-store-logo-symbol.svg'" alt="Default Avatar">

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
        <img :src="rootUrl + '/jenova-store-logo-symbol.svg'" alt="Default Avatar">

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
      {{ $t('auth.join_jenova_store') }}
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
  const { rootUrl } = useRuntimeConfig()

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