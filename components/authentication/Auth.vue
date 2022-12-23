<template>
  <Modal :show="showAuthModal[authType]"
        :max-width=600
        @mask-was-clicked="showAuthModal[authType] = false" 
        @close="showAuthModal[authType] = false"
  >
    <div class="jnv-auth__email-reset-password-success" v-if="forgotPasswordSuccess.status">
      <GlobalNotificationIcon type="success"/>
      <div>{{ $t('auth.password_reset_link_sent') }}</div>
    </div>

    <div class="jnv-auth__container" v-else>
      <!-- Title -->
      <h1 class="jnv-auth__title">
        {{ $t("auth." + authType) }}
      </h1>

      <!-- Unauthorized Error Display -->
      <div class="jnv-auth__error-display--unauthorized" v-if="input.errors.unauthorized">
        {{ input.errors.unauthorized }}
      </div>

      <!-- Body -->
      <div class="jnv-auth__form">
        <!-- Username -->
        <div class="jnv-auth__form-control" v-if="authType === 'sign_up'">
          <label class="jnv-auth__label" for="Username">{{ $t('auth.username') }}</label>

          <div class="jnv-auth__input">
            <input id="Username" type="text" :placeholder="$t('auth.enter_username')"
                  v-model="input.name" required>

            <div :class="'jnv-auth__clear-icon' + (input.name != '' ? ' jnv-auth__fill-red' : '')"
                  @click="clearInput('name')">
              <Cancel />
            </div>
          </div>

          <div class="jnv-auth__error-display--standard" v-if="input.errors.username">
            <span>{{ input.errors.username[0] }}</span>
          </div>
        </div>

        <!-- Email -->
        <div class="jnv-auth__form-control">
          <label class="jnv-auth__label" for="Email">{{ $t('auth.email') }}</label>

          <div class="jnv-auth__input">          
            <input id="Email" type="text" :placeholder="$t('auth.enter_email')"
                  v-model="input.email" required>

            <div :class="'jnv-auth__clear-icon' + (input.email != '' ? ' jnv-auth__fill-red' : '')"
                  @click="clearInput('email')">
              <Cancel />
            </div>
          </div>

          <div class="jnv-auth__error-display--standard" v-if="input.errors.email">
            <span>{{ input.errors.email[0] }}</span>
          </div>
        </div>
 
        <!-- Password -->
        <div class="jnv-auth__form-control" v-if="authType === 'sign_in' || authType === 'sign_up'">
          <label class="jnv-auth__label" for="Password">{{ $t('auth.password') }}</label>

          <div class="jnv-auth__input">
            <input id="Password" :type="[ showPassword ? 'password' : 'text']"
                  :placeholder="$t('auth.enter_password')" v-model="input.password" required>

            <span class="jnv-auth__visibility" @click="showPassword = !showPassword" v-if="showPassword">
              {{ $t('auth.show') }}
            </span>

            <span class="jnv-auth__visibility" @click="showPassword = !showPassword" v-else>
              {{ $t("auth.hide") }}
            </span>

            <div :class="'jnv-auth__clear-icon' + (input.password != '' ? ' jnv-auth__fill-red' : '')"
                  @click="clearInput('password')">
              <Cancel />
            </div>
          </div>

          <div class="jnv-auth__error-display--standard" v-if="input.errors.password">
            <span>{{ input.errors.password[0] }}</span>
          </div>
        </div>

        <!-- Action -->
        <div class="jnv-auth__form-action">
          <button class="jnv-auth__button jnv-auth__form-button--primary"
                  @click="action"
          >
            <Loader v-if="pending" />
            <span v-else>{{ $t("auth." + btnPrim) }}</span>
          </button>

          <button class="jnv-auth__button jnv-auth__form-button--secondary"
                  @click="showOtherModal(btnSecond.next_modal)"
                  v-if="btnSecond"
          >
            {{ $t("auth." + btnSecond.text) }}
          </button>

          <button class="jnv-auth__button jnv-auth__form-button--tertiary"
                  @click="showOtherModal(btnTerti.next_modal)"
                  v-if="btnTerti"
          >
            {{ $t("auth." + btnTerti.text) }}
          </button>
        </div>
      </div>
    </div>
  </Modal>
</template>
  
<script setup>
  import Modal from '../general/pattern/Modal.vue'
  import Cancel from '../general/svg/Cancel.vue'
  import Loader from '../general/Loader.vue'
  import GlobalNotificationIcon from '../general/svg/GlobalNotificationIcon.vue'
  import { useAuthStore } from '@/stores/auth'
  import { storeToRefs } from 'pinia'

  const props = defineProps({
    authType: {
      type: String,
      required: true // sign_in, sign_up, forgot_password
    },
    btnPrim: {
      type: String,
      required: true // sign_in, create_account, reset
    },
    btnSecond: Object,
    btnTerti: Object
  })

  const auth = useAuthStore()
  const { showAuthModal } = storeToRefs(auth)
  const showPassword = ref(true)
  const forgotPasswordSuccess = ref({
    status: false,
    message: ''
  })

  const input = reactive({
    name: '',
    email: '',
    password: '',
    errors: {}
  })

  const pending = ref(false)

  watch(() => showAuthModal.value[props.authType], (newValue) => {
    if(newValue == false) {
      clearInput('all')
      pending.value = false
      forgotPasswordSuccess.value.status = false
      forgotPasswordSuccess.value.message = ''
    }
  })

  const action = () => {
    switch (props.authType) {
      case 'sign_in':
        auth.request('signin', input, props.authType, pending)
        
        break;
      
      case 'sign_up':
        auth.request('signup', input, props.authType, pending)

        break;

      default:
        auth.forgotPassword(input, pending, forgotPasswordSuccess)
        break;
    }
  }

  const showOtherModal = (modalName) => {
    showAuthModal.value[modalName] = true
    showAuthModal.value[props.authType] = false
  }

  const clearInput = (field) => {
    if(field == 'all') {
      input.name = '',
      input.email = '',
      input.password = '',
      input.errors = {}
    } else {
      input[field] = ''
    }    
  }
</script>