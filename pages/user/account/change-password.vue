<template>
  <div class="jnv-user__change-password">
    <div class="jnv-user__change-password-wrapper">
      <CustomInput v-for="input, index in inputs" :key="index"
        :id="input.id" :type="input.type" :label="input.label" :placeholder="input.placeholder"
        custom-style="two" v-model="data[input.id]" :error="data.errors?.[input.id]?.[0]"
      />
    </div>

    <div class="jnv-user__change-password-action" @click="changePassword">
      <button class="jnv-user__change-password-action-update">Change Your Password</button>
    </div>
  </div>
</template>
  
<script setup>
  import CustomInput from '@/components/general/CustomInput.vue'
  import { useInitialDataStore } from '@/stores/initialData'

  definePageMeta({
    layout: "account",
    middleware: 'authentication'
  })

  const data = ref({
    old_password: '',
    new_password: '',
    new_password_confirmation: '',
    errors: {}
  })

  const inputs = [
    { id: 'old_password', type: 'password', placeholder: 'Enter Your Current Password', label: 'Current Password' },
    { id: 'new_password', type: 'password', placeholder: 'Enter Your New Password', label: 'New Password' },
    { id: 'new_password_confirmation', type: 'password', placeholder: 'Enter Your New Password', label: 'Confirm New Password' },
  ]

  const changePassword = async () => {
    await useApi('/auth/update-password', {
      method: 'PATCH',
      body: {
        old_password: data.value.old_password,
        new_password: data.value.new_password,
        new_password_confirmation: data.value.new_password_confirmation
      },

      async onRequest() {
        useInitialDataStore().globalPending = true
      },

      async onRequestError({ error }) {
        useInitialDataStore().globalPending = false
        console.error(error)
      },

      async onResponse({ response }) {
        if(response.status == 200) {
          useInitialDataStore().globalPending = false
          resetData()
          notification('success', response._data.message)
        }
      },

      async onResponseError({ response }) {
        useInitialDataStore().globalPending = false
        data.value.errors = response._data.errors
      }
    })
  }

  const resetData = () => {
    data.value.old_password = '',
    data.value.new_password = '',
    data.value.new_password_confirmation = '',
    data.value.errors = {}
  }
</script>
  
<style lang="scss">
  .jnv-user__change-password {
    display: flex;
    flex-direction: column;
    row-gap: 30px;

    .jnv-user__change-password-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 20px;
    }

    .jnv-user__change-password-action {
      display: flex;
      justify-content: center;

      .jnv-user__change-password-action-update {
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