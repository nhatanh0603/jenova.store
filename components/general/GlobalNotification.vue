<template>
  <Transition name="global-notification">
    <div class="jnv-global-notification"
        @click="globalNotification.show = false"
        v-if="globalNotification.show"
    >
      <div :class="['jnv-global-notification__wrapper', 'jnv-global-notification__wrapper--' + globalNotification.type]">
        <div class="jnv-global-notification__content">
          <GlobalNotificationIcon :type="globalNotification.type"/>

          <div class="jnv-global-notification__divider"></div>

          <div class="jnv-global-notification__text">{{ globalNotification.content }}</div>
        </div>
      </div>
    </div>
  </Transition>
</template>
  
<script setup>
  import GlobalNotificationIcon from './svg/GlobalNotificationIcon.vue'
  import { useInitialDataStore } from '@/stores/initialData'
  import { storeToRefs } from 'pinia'

  const { globalNotification } = storeToRefs(useInitialDataStore())
</script>
  
<style lang="scss">
  @import '@/assets/css/variables.scss';

  .jnv-global-notification {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(0 0 0 / 40%);

    .jnv-global-notification__wrapper {
      max-width: 600px;

      .jnv-global-notification__content {
        font-size: 15px;
        font-weight: 600;
        color: #2a2a2a;
        display: flex;
        justify-content: center;
        align-items: stretch;
        padding: 1rem;

        .jnv-global-notification__divider {
          width: 2px;
          margin: 0 1rem;
          background-color: $jnv__color--white;
          border-radius: 999px;
        }

        .jnv-global-notification__text {
          display: flex;
          align-items: center;
          color: $jnv__color--white;
          word-break: break-word;
        }
      }
    }

    .jnv-global-notification__wrapper--success {
      box-shadow: 0 0 10px $jnv__shadow-success;
      background: $jnv__bg-success;
    }

    .jnv-global-notification__wrapper--warning {
      box-shadow: 0 0 10px $jnv__shadow-warning;
      background: $jnv__bg-warning;
    }

    .jnv-global-notification__wrapper--danger {
      box-shadow: 0 0 10px $jnv__shadow-danger;
      background: $jnv__bg-danger;
    }
  }

  .global-notification-enter-active, .global-notification-leave-active {
    transition: opacity 0.25s linear;
  }

  .global-notification-enter-from, .global-notification-leave-to {
    opacity: 0;
  }
</style>