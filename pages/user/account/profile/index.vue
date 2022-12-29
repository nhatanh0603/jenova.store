<template>
  <div class="jnv-user__profile">
    <div class="jnv-user__profile-input-wrapper">
      <div class="jnv-user__profile-email-section">
        <div class="jnv-user__account-profile-email">
          <label>
            <Email />
            <span class="jnv-user__account-email-label-text">{{ $t(localePath + 'email') }}</span>
          </label>
          
          <div class="jnv-user__account-email-display">{{ data.email }}</div>
        </div>
        
        <div class="jnv-user__profile-change-email">
          <button class="jnv-user__account-action-button" @click="$router.push('profile/change-email')">
            {{ $t('content.page.account.profile.change_email') }}
          </button>
        </div>
      </div>

      <CustomInput v-for="input, index in inputs" :key="index" :id="input.id" :type="input.type"
        :label="$t(localePath + input.id)"
        :placeholder="$t(localePath + 'placeholder.' + input.id)"
        v-model="data[input.id]" :custom-style="locale == 'vi' ? 'two' : 'default'"
        :error="data?.errors[input.id]?.[0]"
      />

      <div class="jnv-user__profile-gender">
        <CustomInput value="male" type="radio" :label="$t(localePath + 'male')" v-model="data.gender"/>
        <CustomInput value="female" type="radio" :label="$t(localePath + 'female')" v-model="data.gender"/>
      </div>      
    </div>
    
    <div class="jnv-user__profile-action">
      <button class="jnv-user__account-action-button" @click="updateProfile">
        {{ $t(localePath + 'update_your_profile') }}
      </button>
    </div>
  </div>
</template>
  
<script setup>
  import CustomInput from '@/components/general/CustomInput.vue'
  import Email from '@/components/general/svg/Email.vue'
  import { useInitialDataStore } from '@/stores/initialData'
  import { useAuthStore } from '@/stores/auth';
  import { useI18n } from 'vue-i18n'

  definePageMeta({
    layout: "account",
    middleware: 'authentication'
  })

  useHead({
    title: 'My Profile'
  })

  const { locale } = useI18n()
  const localePath = 'content.page.account.profile.'
  const data = ref({
    email: '',
    username: '',
    fullname: '',
    address: '',
    phone: '',
    birthday: '',
    gender: '',
    errors: ''
  })

  const inputs = [
    /* { id: 'email', type: 'text', placeholder: 'Enter Your Email', label: 'Email' }, */
    { id: 'username', type: 'text' },
    { id: 'fullname', type: 'text' },
    { id: 'address', type: 'text' },
    { id: 'phone', type: 'text' },
    { id: 'birthday', type: 'date' }
  ]

  onBeforeMount(() => {
    fetchUser()
  })

  const fetchUser = async () => {
    await useApi('/auth/user', {
      async onRequest() {
        useInitialDataStore().globalPending = true
      },

      async onRequestError({ error }) {
        useInitialDataStore().globalPending = false
        notification('danger', error)
      },

      async onResponse({ response }) {
        if(response.status == 200) {
          useAuthStore().user.info = response._data.user
          data.value.email = response._data.user.email
          data.value.username = response._data.user.name
          data.value.fullname = response._data.user.fullname
          data.value.address = response._data.user.address
          data.value.phone = response._data.user.phone
          data.value.birthday = response._data.user.birthday
          data.value.gender = response._data.user.gender
          useInitialDataStore().globalPending = false
        }
      },

      async onResponseError({ response }) {
        useInitialDataStore().globalPending = false
        notification('danger', response)
      }
    })
  }

  const updateProfile = async () => {
    await useApi('/auth/update', {
      method: 'PATCH',
      body: {
        username: data.value.username,
        fullname: data.value.fullname,
        address: data.value.address,
        phone: data.value.phone,
        birthday: data.value.birthday,
        gender: data.value.gender
      },

      async onRequest() {
        useInitialDataStore().globalPending = true
      },

      async onRequestError({ error }) {
        useInitialDataStore().globalPending = false
        notification('danger', error)
      },

      async onResponse({ response }) {
        if(response.status == 200) {
          data.value.errors = {}
          useInitialDataStore().globalPending = false
          notification('success', response._data.message)
        }
      },

      async onResponseError({ response }) {
        data.value.errors = response._data.errors
        useInitialDataStore().globalPending = false
        
      }
    })
  }
</script>
  
<style lang="scss">
  .jnv-user__profile {
    display: flex;
    flex-direction: column;
    row-gap: 30px;

    .jnv-user__profile-input-wrapper {
      width: 100%;
      margin: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      row-gap: 20px;

      .jnv-user__profile-email-section {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 400px;
        row-gap: 10px;
        margin-bottom: 10px;

        .jnv-user__profile-change-email {
          display: flex;
          justify-content: center;
        }
      }

      .jnv-user__profile-gender {
        display: flex;
        align-items: center;
        column-gap: 20px;
      }
    }

    .jnv-user__profile-action {
      display: flex;
      justify-content: center;
    }
  }
</style>