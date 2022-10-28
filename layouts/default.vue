<template>
  <div class="jnv-layout__default">
    <Header />

    <div class="jnv-main">
      <main class="section">
        <div class="jnv-content">
          <slot />
        </div>
      </main>
    </div>

    <Footer />
  </div>
</template>

<script setup>
  import Header from '~~/components/Header.vue'
  import Footer from '~~/components/Footer.vue'
</script>