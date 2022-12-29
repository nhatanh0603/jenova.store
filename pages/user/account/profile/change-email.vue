<template>
  <div class="jnv-change-email">
    <div class="jnv-change-email__title">
      {{ $t(localePath + (verify ? 'change_email' : 'verify_current_email'))}}
    </div>

    <div class="jnv-change-email__body">
      <div class="jnv-user__account-profile-email" v-if="!verify">
        <label>
          <Email/>
          <span class="jnv-user__account-email-label-text">{{ $t(localePath + 'email') }}</span>
        </label>
        
        <div class="jnv-user__account-email-display">
          {{ useAuthStore().user.info.email }}
        </div>
      </div>

      <CustomInput id="email" :label="$t(localePath + 'email')" type="text"
                   :placeholder="$t(localePath + 'placeholder.email')"
                   v-model="input.new_email" :error="input.errors?.new_email?.[0]" v-else
      />

      <CustomInput id="otp" :label="$t(localePath + 'otp')" type="text"
                   :placeholder="$t(localePath + 'placeholder.otp')"
                   v-model="input.otp" :error="input.errors?.otp?.[0]"
      />
    </div>

    <div class="jnv-change-email__action">
      <button class="jnv-user__account-action-button" @click="handleRequest('verify')">
        {{ $t(localePath + 'button.' + (verify ? 'change_email' : 'verify_code')) }}
      </button>

      <button :class="counter > 0 ? 'jnv-change-email__disabled-button' : 'jnv-change-email__send-otp-button'"
              @click="handleRequest('send')"
      >
        <span v-if="counter > 0">
          {{ $t(localePath + 'button.waiting') }} <span style="text-transform: capitalize">{{ counter }}s</span>
        </span>
        <span v-else>{{ $t(localePath + 'button.send_code') }}</span>
      </button>
    </div>

    <div class="jnv-change-email__user-guide">
      <small v-html="$t(localePath + 'user_guide')"></small>
    </div>
  </div>
</template>
  
<script setup>
  import CustomInput from '@/components/general/CustomInput.vue'
  import Email from '@/components/general/svg/Email.vue'
  import { useInitialDataStore } from '@/stores/initialData'
  import { useAuthStore } from '@/stores/auth'

  definePageMeta({
    layout: "account",
    middleware: 'authentication'
  })

  useHead({
    title: 'Profile - Change My Email'
  })

  const localePath = 'content.page.account.change_email.'
  const verify = ref(false) // current email was verified
  const input = ref({
    new_email: '',
    otp: null,
    errors: {}
  })
  const counter = ref(0)
  const counterInterval = ref(null)

  onMounted(() => {
    document.getElementById('otp').addEventListener('keypress', numbersOnly)
  })

  onBeforeUnmount(() => {
    document.getElementById('otp').removeEventListener('keypress', numbersOnly)
  })

  /* type = send, verify */
  const handleRequest = async (type) => {
    var path = ''
    var body = {}

    if(type === 'send') { // nếu là gửi otp
      // nếu đang đếm ngược thì khỏi bấm
      if(counter.value > 0)
        return false

      if(verify.value) { // gửi otp tới email mới
        path = 'send-otp-new-email'
        body = {
          'new_email' : input.value.new_email
        }
      } else { // gửi otp tới email cũ
        path = 'send-otp'
      }
    } else { // nếu là verify email hoặc đổi email
      if(verify.value) { // update email mới
        path = 'update-email'
        body = {
          'otp': input.value.otp,
          'new_email': input.value.new_email
        }
      } else { //verify current email
        path = 'verify-otp'
        body = {
          'otp': input.value.otp
        }
      }
    }

    await useApi('/auth/change-email/' + path, {
      method: 'POST',
      body: body,

      async onRequest() {
        useInitialDataStore().globalPending = true
      },

      async onRequestError({ error }) {
        useInitialDataStore().globalPending = false
        notification('danger', error)
      },

      async onResponse({ response }) {
        if(response.status == 200) {
          input.value.errors = {}

          if(type === 'send') {
            notification('success', 'Code has been sent successfully!')
            counter.value = 60
            counterInterval.value = setInterval(function() {
              if (counter.value == 0)
                clearInterval(counterInterval.value)
              else
                counter.value--
            }, 1000)
          } else {
            if(verify.value) {
              notification('success', response._data.message)
              useRouter().push('/user/account/profile')              
            }  
            else {
              input.value.new_email = ''
              input.value.otp = null
              counter.value = 0
              clearInterval(counterInterval.value)
              verify.value = true
            }
          }
            
          useInitialDataStore().globalPending = false
        }
      },

      async onResponseError({ response }) {
        useInitialDataStore().globalPending = false

        if(response.status == 425)
          notification('warning', response._data.message)
        else if(response.status == 422)
          input.value.errors = response._data.errors
        else
          notification('danger', response._data.message)
      }
    })
  }

  const numbersOnly = (evt) => {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
      evt.preventDefault();;
    } else {
      return true;
    }
  }
</script>
  
<style lang="scss">
  .jnv-change-email {
    display: flex;
    flex-direction: column;
    row-gap: 20px;

    .jnv-change-email__title {
      text-align: center;
      font-size: 22px;
      font-weight: 700;
      text-transform: uppercase;
    }

    .jnv-change-email__body {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 15px;
      width: 100%;

      .jnv-user__account-profile-email {
        width: 100%;
        max-width: 400px;
      }

      .jnv-input__group--style-default {
        .jnv-input__group {
          .jnv-input__label {
            width: 65px;
          }

          .jnv-input__input {
            padding-left: 75px;
          }
        }
      }
    }

    .jnv-change-email__action {
      display: flex;
      align-self: center;
      column-gap: 20px;
      max-width: 400px;
      width: 100%;

      button {
        width: 100%;
      }

      .jnv-change-email__send-otp-button {
        background: linear-gradient(63deg, #bf7513, #ad5e00);
        padding: 8px 20px;
        border-radius: 999px;
        font-weight: 700;

        &:hover {
          background: linear-gradient(55deg, #760d0d, #af0404);
        }

        &:active {
          box-shadow: 0 0 6px #f72222;
        }
      }
    }

    .jnv-change-email__user-guide {
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }
  }

  .jnv-change-email__disabled-button {
    background: linear-gradient(29deg, #767676, #959595);
    padding: 8px 20px;
    border-radius: 999px;
    font-weight: 700;
    cursor: default;
  }

  @media screen and (max-width: 520px){
    .jnv-change-email .jnv-change-email__action {
      flex-direction: column;
      row-gap: 12px;
      column-gap: unset;
    }
  }
</style>