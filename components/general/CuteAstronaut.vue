<template>
  <div :class="['jnv-cute-astronaut', {'jnv-cute-astronaut__background': background}]">
    <div class="jnv-cute-astronaut__message">
      <span class="jnv-cute-astronaut__message-first">
        {{ firstMessage }}
      </span>

      <span class="jnv-cute-astronaut__message-second">
        {{ secondMessage }}
      </span>
    </div>

    <div class="jnv-cute-astronaut__picture">
      <img :src="url.misc + 'cute-astronaut.svg'" alt="Cute Astronaut">
      <button @click="$router.push('/heroes')">Start Shopping</button>
    </div>
  </div>
</template>
  
<script setup>
  defineProps({
    firstMessage: {
      type: String,
      default: ''
    },
    secondMessage: {
      type: String,
      default: ''
    },
    background: {
      type: Boolean,
      default: false
    }
  })

  const { url } = useAppConfig();
</script>
  
<style lang="scss">
  .jnv-cute-astronaut__background {
    box-shadow: 0 0 10px #141313;
    padding: 2rem;
    background: radial-gradient(circle at 2%, #204c2a, #365280);
  }

  .jnv-cute-astronaut {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 40px;

    .jnv-cute-astronaut__message {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      row-gap: 8px;

      .jnv-cute-astronaut__message-first {
        font-size: 22px;
        text-transform: uppercase;
        font-weight: 700;
      }

      .jnv-cute-astronaut__message-second {
        font-size: 18px;
      }
    }

    .jnv-cute-astronaut__picture {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      img {
        width: 100%;
        max-width: 333px;
      }

      button {
        background: linear-gradient(90deg, transparent, #037e22, transparent);
        position: absolute;
        top: 28px;
        left: -10px;
        transform: rotate(340deg);
        padding: 5px 25px;
        margin: 0 -25px;
        font-weight: 600;

        &:hover {
          background: linear-gradient(90deg, transparent, #09a730, transparent);
          text-shadow: 0 0 10px;
        }
      }
    }
  }
</style>