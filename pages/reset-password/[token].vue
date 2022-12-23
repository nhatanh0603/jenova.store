<template>
  <div class="jnv-reset-password">
    <div class="jnv-reset-password__container" v-if="!data.success.status">
      <div class="jnv-reset-password__title">
        {{ $t(localePath + 'title') }}
      </div>

      <div class="jnv-reset-password__body">
        <CustomInput v-for="input, index in inputs" :key="index" :id="input.id" :type="input.type"
                    custom-style="two" :label="$t(localePath + input.id)"
                    :placeholder="$t(localePath + 'placeholder.' + input.id)"
                    v-model="data[input.id]" :error="data.errors?.[input.id]?.[0]"
        />
      </div>

      <div class="jnv-reset-password__action">
        <button @click="resetPassword">{{ $t(localePath + 'reset_password_button') }}</button>
      </div>
    </div>

    <div class="jnv-reset-password__success" v-else>
      <GlobalNotificationIcon type="success"/>

      <div class="jnv-reset-password__success-message">{{ $t(localePath + 'success') }}</div>

      <div class="jnv-reset-password__success-signin">
        <button @click="useAuthStore().showAuthModal.sign_in = true">
          {{ $t(localePath + 'signin_button') }}
        </button>
      </div>
    </div>
  </div>
</template>
  
<script setup>
  import CustomInput from '@/components/general/CustomInput.vue'
  import GlobalNotificationIcon from '@/components/general/svg/GlobalNotificationIcon.vue'
  import { useAuthStore } from '@/stores/auth'

  useHead({
    title: 'Reset Password'
  })

  const localePath = 'content.page.reset_password.'

  const data = ref({
    token: useRoute().params.token,
    email: '',
    password: '',
    password_confirmation: '',
    errors: {},
    success: {
      status: false,
      message: ''
    }
  })

  const inputs = [
    { id: 'email', type: 'text' },
    { id: 'password', type: 'password' },
    { id: 'password_confirmation', type: 'password' }
  ]

  const resetPassword = () => {
    useAuthStore().resetPassword(data.value)
  }
</script>
  
<style lang="scss">
  .jnv-reset-password {
    background-color: rgb(0 0 0 / 30%);
    box-shadow: 0 0 7px #0a0a0a;
    padding: 25px;
    width: 100%;
    max-width: 650px;
    margin: auto;

    .jnv-reset-password__container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      

      .jnv-reset-password__title {
        text-transform: uppercase;
        text-align: center;
        font-size: 25px;
        font-weight: 800;
        margin-bottom: 20px;
      }

      .jnv-reset-password__body {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        row-gap: 20px;
      }

      .jnv-reset-password__action {
        margin-top: 20px;

        button {
          background: linear-gradient(126deg,#08724f,#0b8391);
          border-radius: 999px;
          font-weight: 700;
          padding: 8px 20px;

          &:hover {
            background: linear-gradient(55deg,#760d0d,#af0404);
          }
        }
      }
    }

    .jnv-reset-password__success {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 20px;

      .jnv-svg__notification-icon {
        background-color: #0e990e;
        width: 100%;
        max-width: 70px;
        height: 70px;
        border-radius: 99px;
      }

      .jnv-reset-password__success-message {
        font-size: 24px;
        color: #6dff6d;
        font-weight: 700;
        text-align: center;
      }

      .jnv-reset-password__success-signin {
        button {
          background: linear-gradient(26deg, #029b28, #049344, #0dc701);
          padding: 10px 15px 9px;
          border-radius: 99px;
          font-size: 12px;
          font-weight: 700;

          &:hover {
            box-shadow: 0 0 7px #007233;
            text-shadow: 0 0 3px #c1c1c1;
          }
        }
      }
    }
  }
</style>