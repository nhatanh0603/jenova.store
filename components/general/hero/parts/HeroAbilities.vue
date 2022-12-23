<template>
  <div class="jnv-hero-detail__section">
    <div class="jnv-hero-detail__ability jnv-hero-detail__background">
      <div class="jnv-hero-detail__secondary-title jnv-hero-detail__title-area">
        {{ $t('hero.ability_detail') }}
      </div>

      <div class="jnv-hero-detail__ability-container">
        <div class="jnv-hero-detail__ability-selector">
          <div :class="getAbilityImageClass(index)"
                :style="getAbilityImageLink(ability.name_slug)"
                v-for="(ability, index) in abilities" :key="index" @click="abilityIsSelected(index)"
          >
            <div class="jnv-hero-detail__ability-shard-scepter-icon" :style="getAghanimImageLink(index)"></div> 
          </div>
        </div>

        <div class="jnv-hero-detail__ability-info-wrapper">
          <div class="jnv-hero-detail__ability-info">
            <img :src="url.heroAbility + selectedAbility.name_slug + '.png'" :alt="selectedAbility.name" class="jnv-hero-detail__ability-image">

            <div class="jnv-hero-detail__ability-info-content">
              <div class="jnv-hero-detail__ability-info-name">
                {{ selectedAbility.name }}
              </div>

              <div class="jnv-hero-detail__ability-info-aghanim" v-if="selectedAbility.aghanim_info">
                {{ selectedAbility.aghanim_info }}
              </div>

              <div class="jnv-hero-detail__ability-info-description">
                <span v-if="selectedAbility.shard !== '' && selectedAbility.index == 'aghanim_shard'" v-html="selectedAbility.shard"></span>

                <span v-else-if="selectedAbility.scepter !== '' && selectedAbility.index == 'aghanim_scepter'" v-html="selectedAbility.scepter"></span>

                <span v-else v-html="selectedAbility.desc"></span>
              </div>
            </div>
          </div>

          <div class="jnv-hero-detail__ability-info-lore" v-html="selectedAbility.lore" v-if="selectedAbility.lore"></div>
        </div>        
      </div>
    </div>
  </div>
</template>
  
<script setup>
  const props = defineProps({
    abilities: Object
  })

  const { url } = useAppConfig()

  const aghanimInfo = {
    shard_upgrade: 'shard ability upgrade',
    shard_grant: 'shard grants new ability',
    scepter_upgrade: 'scepter ability upgrade',
    scepter_grant: 'scepter grants new ability'
  }
  
  const selectedAbility = ref({})

  onMounted(() => {
    abilityIsSelected('0')
  })

  const abilityIsSelected = (index) => {
    selectedAbility.value = props.abilities[index]
    selectedAbility.value.index = index

    if(index.includes('aghanim')) {
      if(parseInt(selectedAbility.value.has_shard)) {
        selectedAbility.value.aghanim_info = aghanimInfo.shard_upgrade
      }
      if(parseInt(selectedAbility.value.has_scepter)) {
        selectedAbility.value.aghanim_info = aghanimInfo.scepter_upgrade
      }
      if(parseInt(selectedAbility.value.is_granted_by_shard)) {
        selectedAbility.value.aghanim_info = aghanimInfo.shard_grant
      }
      if(parseInt(selectedAbility.value.is_granted_by_scepter)) {
        selectedAbility.value.aghanim_info = aghanimInfo.scepter_grant
      }
    }
  }

  const getAghanimImageLink = (index) => {
    if(index == 'aghanim_shard')
      return 'background-image: url(\'' + url.heroStat + 'aghs_shard.png'
    if(index == 'aghanim_scepter')
      return 'background-image: url(\'' + url.heroStat + 'aghs_scepter.png'
  }

  const getAbilityImageClass = (index) => {
    if(selectedAbility.value.index == index)
      return 'jnv-hero-detail__ability-selectable jnv-hero-detail__ability-selected'
    return 'jnv-hero-detail__ability-selectable'
  }

  const getAbilityImageLink = (name_slug) => {
    return 'background-image: url(\'' + url.heroAbility + name_slug + '.png\')'
  }
</script>
  
<style lang="scss">
  @import '@/assets/css/variables.scss';

  .jnv-hero-detail__ability {
    width: 100%;

    .jnv-hero-detail__ability-container {
      .jnv-hero-detail__ability-selector {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        .jnv-hero-detail__ability-selectable {
          width: 80px;
          height: 80px;
          cursor: pointer;
          filter: saturate(0) brightness(0.6);
          margin: 0 8px 16px 8px;
          background-size: cover;
          background-repeat: no-repeat;
          box-shadow: 0 0 10px 0 $jnv__shadow-color--almost-black;
          position: relative;
          transition: transform 0.25s linear, box-shadow 0.4s linear;

          &:hover {
            transform: scale(1.1);
            box-shadow: 0 0 10px 0 $jnv__shadow-color--white;
          }

          .jnv-hero-detail__ability-shard-scepter-icon {
            position: absolute;
            right: 0;
            bottom: 0;
            background-size: cover;
            background-repeat: no-repeat;
            width: 100%;
            height: 100%;
          }
        }

        .jnv-hero-detail__ability-selected {
          box-shadow: 0 0 10px 0 $jnv__shadow-color--white;
          transform: scale(1.1);
          filter: none;
        }
      }

      .jnv-hero-detail__ability-info-wrapper {
        background: rgba(0, 0, 0, 0.1);
        margin: -$jnv-hero-detail__bg-padding;
        padding: $jnv-hero-detail__bg-padding;
        margin-top: 0;

        .jnv-hero-detail__ability-info {
          display: flex;
          align-items: flex-start;

          .jnv-hero-detail__ability-image {
            width: 100px;
            height: 100px;
            box-shadow: 0 0 10px 0 $jnv__shadow-color--almost-black;
          }

          .jnv-hero-detail__ability-info-content {
            margin-left: 2rem;

            .jnv-hero-detail__ability-info-name {
              font-weight: 700;
              font-size: 16px;
              text-transform: uppercase;
              color: $jnv__color--purply-pink;
            }

            .jnv-hero-detail__ability-info-aghanim {
              background: rgb(28 82 145 / 60%);
              padding: 6px 10px;
              border-radius: 5px;
              width: fit-content;
              text-transform: uppercase;
              font-weight: 600;
              font-size: 12px;
              margin-top: 5px;
              white-space: nowrap;
            }

            .jnv-hero-detail__ability-info-description {
              font-size: 15px;
              margin-top: 1rem;
              word-break: break-word;
            }
          }
        }

        .jnv-hero-detail__ability-info-lore {
          font-style: italic;
          font-size: 12px;
          margin: 1rem (-$jnv-hero-detail__bg-padding) 0 (-$jnv-hero-detail__bg-padding);
          text-align: center;
          padding: 5px $jnv-hero-detail__bg-padding;
          background: $jnv__bg-dark-navy--two-side-fade;
        }
      }
    }
  }
</style>