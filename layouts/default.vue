<template>
  <div>
    <Header />

    <Menu />

    <main class="jnv-main section">
      <slot />
    </main>

    <Footer />
  </div>
</template>
<script setup>
import Header from '~~/components/Header.vue'
import Menu from '~~/components/Menu.vue'
import Footer from '~~/components/Footer.vue'
</script>