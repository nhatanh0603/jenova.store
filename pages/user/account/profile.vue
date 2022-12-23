<template>
  <div class="jnv-user__profile">
    <div class="jnv-user__profile-input-wrapper">
      <div class="jnv-user__profile-email">
        <label>
          <Email />
          <span>{{ $t(localePath + 'email') }}</span>
        </label>
        
        <div class="jnv-user__email-display">{{ data.email }}</div>
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
      <button class="jnv-user__profile-action-update" @click="updateProfile">
        {{ $t(localePath + 'update_your_profile') }}
      </button>
    </div>
  </div>
</template>
  
<script setup>
  import CustomInput from '@/components/general/CustomInput.vue'
  import Email from '@/components/general/svg/Email.vue'
  import { useInitialDataStore } from '@/stores/initialData'
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

      .jnv-user__profile-email {
        display: flex;
        align-items: center;
        width: 100%;
        max-width: 400px;
        border-radius: 999px;
        height: 34px;
        padding: 6px 0 6px 0;

        label {
          display: flex;
          align-items: center;      
          column-gap: 6px;
          padding: 0 15px;
          font-weight: 700;
          text-transform: uppercase;
          background: linear-gradient(126deg, #08724f, #0b8391);
          height: inherit;
          border-radius: 999px 0 0 999px;
        }

        .jnv-user__email-display {
          display: flex;
          align-items: center;
          background-color: white;
          color: #079b42;
          width: 100%;
          padding: 0 12px;
          font-size: 15px;
          font-weight: 700;
          height: inherit;
          border-radius: 0 999px 999px 0;
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

      .jnv-user__profile-action-update {
        background: linear-gradient(126deg, #08724f, #0b8391);
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
  }
</style>