<template>
  <div class="jnv-home">
    <div class="jnv-home__banner-group">
      <TransitionGroup class="jnv-home__banner" name="banner" tag="div">
        <img class="jnv-home__banner-content"
             v-for="banner, index in banners"
             :key="index" v-show="banner.show" 
             :src="url.banner + banner.name"
             :alt="banner.name"
             @click="showBanner(url.banner + banner.name)"
        >
      </TransitionGroup>

      <div class="jnv-home__banner-position">
        <div :class="{'jnv-home__banner-position-icon': true, 
                      'jnv-home__banner-position-icon--active': n - 1 == index}"
             v-for="n in banners.length" :key="n"
             @click="switchBanner(n - 1)"
        ></div>
      </div>
    </div>
    

    <div class="jnv-home__product-loader" v-if="isHeroesLoading">
      <span class="jnv-loader--line"></span>
    </div>

    <div class="jnv-home__product-introduction" v-else>
      <div class="jnv-home__product-heroes">
        <div class="jnv-home__heroes-title heroes-strength">
          <Attribute :primary="0" width="60"/>
        </div>

        <div class="jnv-home__hero-cards">
          <HeroCard v-for="str_hero in randomHeroes.strength" :hero="str_hero" :key="str_hero.id"/>
        </div>

        <div class="jnv-home__redirect-to-full-heroes">
          <button @click="$router.push('/heroes')">{{ $t('hero.all_heroes') }}</button>
        </div>
      </div>

      <div class="jnv-home__product-heroes">
        <div class="jnv-home__heroes-title heroes-agility">
          <Attribute :primary="1" width="60"/>
        </div>

        <div class="jnv-home__hero-cards">
          <HeroCard v-for="agi_hero in randomHeroes.agility" :hero="agi_hero" :key="agi_hero.id"/>
        </div>

        <div class="jnv-home__redirect-to-full-heroes">
          <button @click="$router.push('/heroes')">{{ $t('hero.all_heroes') }}</button>
        </div>
      </div>

      <div class="jnv-home__product-heroes">
        <div class="jnv-home__heroes-title heroes-intelligence">
          <Attribute :primary="2" width="60"/>
        </div>

        <div class="jnv-home__hero-cards">
          <HeroCard v-for="intel_hero in randomHeroes.intelligence" :hero="intel_hero" :key="intel_hero.id"/>
        </div>

        <div class="jnv-home__redirect-to-full-heroes">
          <button @click="$router.push('/heroes')">{{ $t('hero.all_heroes') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import Attribute from '@/components/general/svg/attributes/Attribute.vue'
  import HeroCard from '@/components/general/hero/HeroCard.vue'

  useHead({
    title: 'Home'
  })

  const { url } = useAppConfig()

  const banners = ref([
    {
      name: 'manifold-paradox.jpg',
      show: true
    },
    {
      name: 'the-eminence-of-ristul.jpg',
      show: false
    },
    {
      name: 'compass-of-the-rising-gale.jpg',
      show: false
    },
    {
      name: 'dread-retribution.jpg',
      show: false
    },
    {
      name: 'bladeform-legacy.jpg',
      show: false
    },
    {
      name: 'claszian-apostasy.jpg',
      show: false
    }
  ])
  const randomHeroes = ref({})
  const isHeroesLoading = ref(false)
  const index = ref(0)
  const autoSlide = ref(() => {})

  /* const isFirst = computed(() => {
    return index.value == 0
  }) */

  const isLast = computed(() => {
    return index.value == banners.value.length - 1
  })

  onBeforeMount(() => {
    fetchRandomHeroes()
  })

  onMounted(() => {
    autoSlide.value = setInterval((() => {
      if(!isLast.value)
        switchBanner(index.value + 1)
      else
        switchBanner(0)
    }).bind(banners, index, isLast), 3000)
  })

  onBeforeUnmount(() => {
    clearInterval(autoSlide.value)
  })

  const switchBanner = (position) => {
    banners.value[index.value].show = false
    index.value = position
    banners.value[position].show = true
  }

  const showBanner = (url) => {
    window.open(url, '_blank')
  }

  const fetchRandomHeroes = async () => {
    await useApi('/category/random/6', {
      async onRequest() {
        isHeroesLoading.value = true
      },

      async onRequestError({ error }) {
        isHeroesLoading.value = false
        notification('danger', error)
      },

      async onResponse({ response }) {
        if(response.status == 200) {
          randomHeroes.value = response._data.data
          isHeroesLoading.value = false
        }
      },

      async onResponseError({ response }) {
        isHeroesLoading.value = false
        notification('danger', response)
      }
    })
  }
</script>

<style lang="scss">
  .jnv-home {
    display: flex;
    flex-direction: column;
    row-gap: 30px;

    .jnv-home__banner-group {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      row-gap: 10px;

      .jnv-home__banner {
        position: relative; // dòng này để .banner-leave-active set absolute không bị phình to hơn khung.
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 750px;
        background: radial-gradient(circle at 2%, #204c2a, #365280);
        padding: clamp(5px, 1.5%, 15px);
        box-shadow: 0 0 10px #121111;
        
        .jnv-home__banner-content {
          width: 100%;
          cursor: pointer;
        }
      }

      .jnv-home__banner-position {
        display: flex;
        column-gap: 15px;

        .jnv-home__banner-position-icon {
          width: 12px;
          height: 12px;
          background-color: white;
          border-radius: 999px;
          background-color: #818181;;
          cursor: pointer;
        }

        .jnv-home__banner-position-icon--active {
          background-color: white;
          box-shadow: 0 0 7px white;
        }
      }
    }

    .jnv-home__product-loader {
      display: flex;
      margin: 3rem 0 -3rem 0;
    }

    .jnv-home__product-introduction {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      row-gap: 20px;

      .jnv-home__product-heroes {
        display: flex;
        flex-flow: row wrap;
        flex-direction: column;
        row-gap: 2rem;

        .jnv-home__heroes-title {
          font-size: 30px;
          font-weight: 700;
          text-transform: uppercase;
          padding: 15px;
          margin: 4rem 0 2rem 0;
        }

        .jnv-home__heroes-title.heroes-strength {
          background: linear-gradient(90deg, transparent, #1e0000, transparent);
        }

        .jnv-home__heroes-title.heroes-agility {
          background: linear-gradient(90deg, transparent, #001c01, transparent);
        }

        .jnv-home__heroes-title.heroes-intelligence {
          background: linear-gradient(90deg, transparent, #00152e, transparent);
        }

        .jnv-home__hero-cards {
          display: flex;
          flex-flow: row wrap;
          align-items: center;
          justify-content: space-evenly;
          gap: 3rem;
        }

        .jnv-home__redirect-to-full-heroes {
          display: flex;
          justify-content: center;
          margin-top: 10px;

          button {
            padding: 8px 30px;
            font-size: 16px;
            font-weight: 600;
            box-shadow: 0 0 10px #007a1a;
            background: linear-gradient(90deg, #002e0a, #007a1a, #002e0a);

            &:hover {
              text-shadow: 0 0 5px white;
              box-shadow: 0 0 10px #03a525;
              background: linear-gradient(90deg, #00440f, #03a525, #00440f);
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 500px) {
    .jnv-home .jnv-home__banner-position-icon {
      width: 8px !important;
      height: 8px !important;
    }
  }

  /* TRANSITION */
  .banner-enter-active,
  .banner-leave-active {
    transition: all 1s ease;
  }

  .banner-enter-from,
  .banner-leave-to {
    opacity: 0;
    transform: scale(0.8)
  }

  .banner-leave-active {
    position: absolute;
  }
</style>