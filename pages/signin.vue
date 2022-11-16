<template>
  <Home />
</template>
  
<script setup>
  import Home from '@/components/Home.vue'
  import { useAuthStore } from '~~/stores/auth';

  const { showAuthModal } = useAuthStore()

  onMounted(() => {
    showAuthModal.sign_in = true
  })
</script>