<template>
  <div class="jnv-heroes__container">
    <div class="jnv-heroes__action-group">
      <!----------------------------- FILTER ----------------------------->
      
        <div :class="{'jnv-heroes__filter-group': true, 'jnv-heroes__filter-group--mobile': isMobile}">
          <!----------------------------- MOBILE ----------------------------->
          <div class="jnv-heroes__group-wrapper" v-if="isMobile">
            <div class="jnv-heroes__filter-group-arrow" @click="filterSwitch('backward')" v-if="isMobile">
              <Arrow type="left"/>
            </div>

            <Transition mode="out-in" :name="filter.active.transition">
              <component :is="filterComponent[filter.active.status]"
                        :is-active="filter.toggle[filterComponent[filter.active.status].__name]"
                        @on-click="changeOptionalParams"
              ></component>
            </Transition>

            <div class="jnv-heroes__filter-group-arrow" @click="filterSwitch('forward')" v-if="isMobile">
              <Arrow type="right"/>
            </div>
          </div>

          <!----------------------------- DESKTOP ----------------------------->
          <div class="jnv-heroes__group-wrapper" v-else>
            <PrimaryAttribute :is-active="filter.toggle['PrimaryAttribute']" @on-click="changeOptionalParams"/>

            <AttackType :is-active="filter.toggle['AttackType']" @on-click="changeOptionalParams"/>

            <Complexity :is-active="filter.toggle['Complexity']" @on-click="changeOptionalParams"/>
          </div>
        </div>

      <!----------------------------- PRICE ----------------------------->
      <div :class="{'jnv-heroes__sort-group': true, 'jnv-heroes__sort-group--mobile': isMobile}" @click="changeOptionalParams('price')">
        <div class="jnv-heroes__sort-price">Price</div>

        <div class="jnv-heroes__sort-arrow">
          <Arrow :type="sortSwitcher"/>
        </div>
      </div>
    </div>

    <!----------------------------- HEROES CARD ----------------------------->
    <div class="jnv-heroes__cards-wrapper" v-if="!isLoading.initiate">
      <HeroCard v-for="hero in heroes.data" :hero="hero" :key="hero.id"/>
    </div>
    
    <span class="jnv-loader--line" v-if="isLoading.continue"></span>

    <div class="jnv-heroes__nothing-found" v-if="isLoading.nothing">
      <img :src="url.misc + 'curiosity-search.svg'" alt="Nothing Found">
    </div>
  </div>
</template>
  
<script setup>
  import HeroCard from './HeroCard.vue'
  import PrimaryAttribute from './parts/filter/PrimaryAttribute.vue'
  import AttackType from './parts/filter/AttackType.vue'
  import Complexity from './parts/filter/Complexity.vue'
  import Arrow from '../svg/Arrow.vue'

  const { url } = useAppConfig()
  const heroes = ref({})
  const isLoading = ref({
    initiate: false,
    continue: false,
    nothing: false
  })
  const isMobile = ref(false)
  const sortSwitcher = ref('unfold')
  const filter = ref({
    active: {
      status: 0,
      transition: ''
    },

    toggle: {
      PrimaryAttribute: {
        strength: false,
        agility: false,
        intelligence: false
      },
      AttackType: {
        melee: false,
        ranged: false
      },
      Complexity: {
        level: 0
      }
    }
  })
  const filterComponent = [
    PrimaryAttribute,
    AttackType,
    Complexity
  ]
  const optionalParams = ref({
    record: 9,
    column: 'id', // id, price
    direction: 'asc', // desc, asc
    primary_attr: '', // 0, 1, 2
    attack_capability: '', // 1, 2
    complexity: '' // 1, 2, 3
  })

  onBeforeMount(() => {
    if(window.innerWidth < 700)
      isMobile.value = true

    fetchHeroes(true)

    window.addEventListener('scroll', lazyLoad)
    window.addEventListener('resize', trackingWidth)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', lazyLoad)
    window.removeEventListener('resize', trackingWidth)
  })

  const lazyLoad = () => {
    var totalScreenHeight = document.body.scrollHeight
    var currentScrollPosition = window.scrollY + window.innerHeight

    if(currentScrollPosition > totalScreenHeight * 0.8 
        && isLoading.value.continue == false 
        && heroes.value.links.next != null) {
      fetchHeroes()
    }
  }

  const fetchHeroes = async (ini = false) => {
    var paramsChain = `?record=${optionalParams.value.record}&column=${optionalParams.value.column}&direction=${optionalParams.value.direction}`

    if(optionalParams.value.primary_attr)
      paramsChain += `&primary_attr=${optionalParams.value.primary_attr}`

    if(optionalParams.value.attack_capability)
      paramsChain += `&attack_capability=${optionalParams.value.attack_capability}`

    if(optionalParams.value.complexity)
      paramsChain += `&complexity=${optionalParams.value.complexity}`

    var link = `/category/1/products${paramsChain}`
    var url = ini ? link : `${link}&cursor=${heroes.value.meta.next_cursor}`

    await useApi(url, {
      async onRequest() {
        if(ini)
          isLoading.value.initiate = true

        isLoading.value.continue = true
      },

      async onRequestError({ error }) {
        if(ini)
          isLoading.value.initiate = false

        isLoading.value.continue = false
        notification('danger', error)
      },

      async onResponse({ response }) {
        if(response.status == 200) {
          if(ini) {
            isLoading.value.initiate = false
            heroes.value = response._data
          }else {
            heroes.value.data.push(...response._data.data)
            heroes.value.links = response._data.links
            heroes.value.meta = response._data.meta
          }
          
          isLoading.value.continue = false
          isLoading.value.nothing = !heroes.value.data.length ? true : false
        }        
      },

      async onResponseError({ response }) {
        if(ini)
          isLoading.value.initiate = false

        isLoading.value.continue = false
        notification('danger', response._data)
      }
    })
  }

  const changeOptionalParams = (type, value = '') => {
    switch (type) {
      case 'price':
        optionalParams.value.column = 'price'

        if(sortSwitcher.value === 'unfold') {
          sortSwitcher.value = 'up'
          optionalParams.value.direction = 'asc'
        } else if(sortSwitcher.value === 'up') {
          sortSwitcher.value = 'down'
          optionalParams.value.direction = 'desc'
        } else {
          sortSwitcher.value = 'unfold'
          optionalParams.value.column = 'id'
          optionalParams.value.direction = 'asc'
        }
        break;
      
      case 'primary_attr':
        var attrName = value === '0' ? 'strength' : (value === '1' ? 'agility' : 'intelligence')

        filter.value.toggle.PrimaryAttribute[attrName] = !filter.value.toggle.PrimaryAttribute[attrName]

        for (const key in filter.value.toggle.PrimaryAttribute) {
          if (key !== attrName) {
            filter.value.toggle.PrimaryAttribute[key] = false
          }
        }

        optionalParams.value[type] = filter.value.toggle.PrimaryAttribute[attrName] ? value : ''

        break;

      case 'complexity':
        optionalParams.value[type] = value == 0 ? '' : value

        filter.value.toggle.Complexity.level = value
        break;

      default:
        var attackName = value === '1' ? 'melee' : 'ranged'

        filter.value.toggle.AttackType[attackName] = !filter.value.toggle.AttackType[attackName]

        for (const key in filter.value.toggle.AttackType) {
          if (key !== attackName) {
            filter.value.toggle.AttackType[key] = false
          }
        }

        optionalParams.value[type] = filter.value.toggle.AttackType[attackName] ? value : ''

        break;
    }

    fetchHeroes(true)
  }

  const filterSwitch = (type) => {    
    switch (type) {
      case 'backward':
        filter.value.active.transition = 'heroes-filter-backward';

        if(filter.value.active.status > 0)
          filter.value.active.status--
        else
          filter.value.active.status = 2
        break;
    
      default:
        filter.value.active.transition = 'heroes-filter-forward';

        if(filter.value.active.status < 2)
          filter.value.active.status++
        else
          filter.value.active.status = 0
        break;
    }
  }

  const trackingWidth = () => {
    if(window.innerWidth < 700)
      isMobile.value = true
    else
      isMobile.value = false
  }
</script>
  
<style lang="scss">
  @import '@/assets/css/variables.scss';

  .jnv-heroes__container {
    .jnv-heroes__action-group {
      margin-bottom: 3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      svg {
        cursor: pointer;
      }

      .jnv-heroes__filter-group .jnv-heroes__group-wrapper {
        display: flex;
        align-items: center;
        column-gap: 30px;
        margin: 0 (-$jnv__section-p-lnr--desktop);
        padding: 1rem $jnv__section-p-lnr--desktop * 2;
        height: 68px;
        background: linear-gradient(90deg, transparent, #103830, transparent);
        //background: linear-gradient(90deg, transparent, #000000, transparent);

        .jnv-heroes__filter-group-member {
          display: flex;
          justify-content: center;
          align-items: center;

          .jnv-heroes__filter-member-active {
            transform: scale(1.2);
          }
        }

        .jnv-heroes__filter-group--primary-attribute {
          column-gap: 10px;

          .jnv-attribute__normal {
            display: flex;
          }
        }

        .jnv-heroes__filter-group--attack-type {
          column-gap: 10px;
        }

        .jnv-heroes__filter-group--complexity {
          .jnv-hero-complexity {
            column-gap: 20px;
            margin: 0 5.4px;

            .jnv-hero-complexity__diamond-piece {
              width: 26px;
              height: 26px;
              cursor : pointer;
            }

            .jnv-hero-complexity__diamond-piece--filled {
              box-shadow: 0 0 5px white;
            }
          }
        }

        .jnv-heroes__filter-group-arrow {
          display: flex;
          align-items : center;
          height: 100%;
        }
      }

      .jnv-heroes__filter-group--mobile .jnv-heroes__group-wrapper {
          margin: 0 (-$jnv__section-p-lnr--mobile);
          padding: 1rem $jnv__section-p-lnr--mobile;    
          column-gap: 22px;

          .jnv-heroes__filter-group--primary-attribute, .jnv-heroes__filter-group--attack-type, .jnv-heroes__filter-group--complexity {
            width: 134px;
          }
      }

      .jnv-heroes__sort-group {
        display: flex;
        column-gap: 12px;
        cursor : pointer;
        background-color: rgb(0 0 0 / 60%);
        box-shadow: 0 0 5px #0c0c0c;
        padding: 10px 20px;
        margin-right: 50px;
        border-radius: 0 12px 0 12px;

        .jnv-heroes__sort-price {
          font-size: 18px;
          font-weight: 700;
        }

        .jnv-heroes__sort-arrow {
          display: flex;
          align-items: center;
        }
      }

      .jnv-heroes__sort-group--mobile {
        margin-right: 0;
      }
    }

    .jnv-heroes__cards-wrapper {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-evenly;
      gap: 3.5rem 2rem;
    }

    .jnv-heroes__nothing-found {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        max-width: 600px;
      }
    }
  }

  .heroes-filter-backward-enter-active,
  .heroes-filter-backward-leave-active,
  .heroes-filter-forward-enter-active,
  .heroes-filter-forward-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .heroes-filter-backward-enter-from {
    opacity: 0;
    transform: translateX(-20px)
  }
  
  .heroes-filter-backward-leave-to {
    opacity: 0;
    transform: translateX(20px)
  }

  .heroes-filter-forward-enter-from {
    opacity: 0;
    transform: translateX(20px)
  }

  .heroes-filter-forward-leave-to {
    opacity: 0;
    transform: translateX(-20px)
  }
</style>