<template>
  <div class="jnv-hero-detail" v-if="!Object.keys(error).length">
    <span class="jnv-loader--line" v-if="!ready" ></span>

    <div class="jnv-hero-detail__container" v-else>
      <!-- PRIMARY AREA -->
      <div class="jnv-hero-detail__section">
        <HeroPotrait :data="heroPortraitData"/>

        <HeroCore :data="heroCoreData"/>
      </div>

      <!-- ABILITY AREA -->
      <HeroAbilities :abilities="hero.abilities"/>

      <HeroHistory :lore="hero.lore" :history="hero.history"/>

      <!-- SECONDARY AREA -->
      <div class="jnv-hero-detail__section">
        <HeroRole :data="heroRoleData"/>

        <HeroStat :data="heroStatData"/>
      </div>
    </div>
  </div>

  <CuriositySearch :first-message="$t('hero.not_found.first_message')" v-else
                   :second-message="$t('hero.not_found.second_message')"           
  />
</template>
  
<script setup>
  import HeroPotrait from '@/components/general/hero/parts/HeroPortrait.vue'
  import HeroCore from '@/components/general/hero/parts/HeroCore.vue'
  import HeroRole from '@/components/general/hero/parts/HeroRole.vue'
  import HeroStat from '@/components/general/hero/parts/HeroStat.vue'
  import HeroAbilities from '@/components/general/hero/parts/HeroAbilities.vue'
  import HeroHistory from '@/components/general/hero/parts/HeroHistory.vue'
  import CuriositySearch from '@/components/general/CuriositySearch.vue'

  const hero = ref({})
  const heroPortraitData = ref({})
  const heroCoreData = ref({})
  const heroRoleData = ref({})
  const heroStatData = ref({})
  const ready = ref(false)
  const error = ref({})
  const { url } = useAppConfig()

  onMounted(() => {
    loadHero()
  })

  const loadHero = async () => {
    await useApi('product/' + useRoute().params.slug, {
      async onResponse({ response }) {
        if(response.status == 200) {
          hero.value = response._data.data
          
          useHead({
            title: hero.value.display_name
          })
          
          heroPortraitData.value = {
            display_name: hero.value.display_name,
            health_regen: hero.value.health_regen,
            max_health: hero.value.max_health,
            mana_regen: hero.value.mana_regen,
            max_mana: hero.value.max_mana,
            name: hero.value.name,
          }

          heroCoreData.value = {
            display_name: hero.value.display_name,
            primary_attr: hero.value.primary_attr,
            attack_type: hero.value.attack_capability,
            complexity: hero.value.complexity,
            one_liner: hero.value.one_liner,
            price: hero.value.price,
            stock: hero.value.stock,
            id: hero.value.id,
            attributes: {
              str_base: hero.value.str_base,
              str_gain: hero.value.str_gain,
              agi_base: hero.value.agi_base,
              agi_gain: hero.value.agi_gain,
              int_base: hero.value.int_base,
              int_gain: hero.value.int_gain
            }
          }

          heroRoleData.value = {
            Carry: hero.value.carry,
            Support: hero.value.support,
            Nuker: hero.value.nuker,
            Disabler: hero.value.disabler,
            Jungler: hero.value.jungler,
            Durable: hero.value.durable,
            Escape: hero.value.escape,
            Pusher: hero.value.pusher,
            Initiator: hero.value.initiator
          }

          heroStatData.value = {
            sight_range_night: hero.value.sight_range_night,
            projectile_speed: hero.value.projectile_speed,
            magic_resistance: hero.value.magic_resistance,
            sight_range_day: hero.value.sight_range_day,
            movement_speed: hero.value.movement_speed,
            attack_range: hero.value.attack_range,
            attack_rate: hero.value.attack_rate,
            damage_max: hero.value.damage_max,
            damage_min: hero.value.damage_min,
            turn_rate: hero.value.turn_rate,
            armor: hero.value.armor
          }

          // Để chắc chắc props hero đã được load xong, nếu không truyền vào component sẽ bị undefined
          ready.value = true
        }
      },

      async onResponseError({ response }) {
        if(response.status == 404) {
          error.value = response._data.error
          notification('warning', 'Your search did not match any products. Please try again.')
        } else
          notification('danger', response._data.message)
      }
    })
  }
</script>

<style lang="scss">
  @import '@/assets/css/variables.scss';

  /* GENERAL */
  .jnv-hero-detail__section {
    display: flex;
    margin-bottom: 2rem;
  }

  .jnv-hero-detail__background {
    display: flex;
    height: fit-content;
    padding: $jnv-hero-detail__bg-padding;
    flex-direction: column;
    background: $jnv-hero-detail__background;
    box-shadow: 0 0 5px 0 $jnv__shadow-color--almost-black;
  }

  .jnv-hero-detail__title-area {
    margin: -$jnv-hero-detail__bg-padding;
    margin-bottom: 1rem;
    padding: 1rem 2rem 1rem 2rem;
    background: rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .jnv-hero-detail__secondary-title {
    font-size: 17px;
    font-weight: 700;
    text-transform: uppercase;
    color: $jnv__color--apricot;
  }
</style>