<template>
  <div class="jnv-locale-switcher">
    <button ref="localeSwitcher" class="jnv-locale-switcher__choose-button" @click="show = !show">
      <img :src="localeFlag + '/' + locale + '-flag.svg'" alt="locale flag" width="30" ref="flagImg">
      <span>{{ $t('locale.' + locale) }}</span>
    </button>

    <Transition name="jnv-locale-switcher">
      <div class="jnv-locale-switcher__option" v-show="show">
        <div class="jnv-locale-switcher__item" 
          v-for="(value, key) in availableLocales"
          :key="key" 
          @click="chooseLocale(value)"
        >
        <img :src="localeFlag + '/' + value + '-flag.svg'" alt="locale flag" width="30">
        <span>{{ $t('locale.' + value) }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
/* import { onBeforeMount } from 'vue' */
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const show = ref(false)
const localeSwitcher = ref(null)
const flagImg = ref(null)
const { availableLocales, locale } = useI18n()
const { localeFlag } = useRuntimeConfig()

const chooseLocale = (value) => {
  if(value !== locale.value) {
    locale.value = value
    localStorage.setItem('locale', value)
  }
  
  show.value = false
}
const checkClick = (e) => {
  if(!localeSwitcher.value.contains(e.target)) {
    show.value = false
  }
}

/* onBeforeMount(() => {
  if(localStorage.getItem('locale')) {
    locale.value = localStorage.getItem('locale')
  }
}) */
onMounted(() => {
  flagImg.value.src = localeFlag + '/' + locale.value + '-flag.svg'
  window.addEventListener('click', checkClick)
})
onBeforeUnmount(() => {
  window.removeEventListener('click', checkClick)
})
</script>

<style lang="scss">
@import 'assets/css/variables.scss';

.jnv-locale-switcher {
  position: relative;
  margin-left: 1rem;
  display: flex;
  align-items: center;

  .jnv-locale-switcher__choose-button {
    text-transform: capitalize;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    width: 100%;

    img {
      margin: auto;
    }

    span {
      margin-top: 3px;
    }

    &:hover {
      img {
        box-shadow: 0 0 5px 0 $jnv__color--white;
      }

      span {
        text-shadow: 0 0 5px $jnv__color--white;
      }
    }
  }
  
  .jnv-locale-switcher__option {
    position: absolute;
    top: 40px;
    right: 0;
    background-color: $jnv__color--white;
    border-radius: 10px;
    z-index: 9999;
    box-shadow: 0 0 6px 0px $jnv__shadow-color--almost-black;

    .jnv-locale-switcher__item {
      color: $jnv__color--blue;
      font-weight: 600;
      cursor: pointer;      
      white-space: nowrap;
      display: flex;

      &:first-child {
        padding: 10px 10px 5px;
        border-radius: 10px 10px 0 0;
      }
      &:last-child {
        padding: 5px 10px 10px;
        border-radius: 0 0 10px 10px;
      }

      &:hover {
        img {
          box-shadow: 0 0 10px 0 $jnv__color--blue;
        }
      }

      img {
        border-radius: 5px;
        margin-right: 7px;
      }
    }
  }
}

//Transition
.jnv-locale-switcher-enter-from, .jnv-locale-switcher-leave-to {
  opacity: 0;
  transform: translateY(-10px)
}

.jnv-locale-switcher-enter-active, .jnv-locale-switcher-leave-active {
  transition: all 0.3s ease;
}
</style>