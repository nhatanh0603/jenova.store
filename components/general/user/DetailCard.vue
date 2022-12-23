<template>
  <div :class="['jnv-detail-card', primaryClass, disableCard]" @click="showOriginalHero">
    <div class="jnv-detail-card__header">
      <img :src="url.heroImage + data.name + '.png'" :alt="data.display_name">
    </div>

    <div class="jnv-detail-card__body">
      <div class="jnv-detail-card__name">
        <Attribute :primary="data.primary_attr" :has-label="false"/>
        <span class="jnv-detail-card__name-display">{{ data.display_name }}</span>
      </div>
      
      <div class="jnv-detail-card__divider"></div>

      <div class="jnv-detail-card__oneliner">
        {{ data.one_liner }}
      </div>

      <table class="jnv-detail-card__hero-base">
        <tr>
          <th>{{ $t('hero.attack_type') }}</th>

          <td>
            <div class="jnv-detail-card__herobase-value">
              <Melee v-if="data.attack_capability == 1" width="25"/>
              <Ranged v-else width="25"/>
              <span class="jnv-detail-card__hero-attack-type">
                {{ data.attack_capability == 1 ? $t('hero.melee') : $t('hero.ranged')}}
              </span>
            </div>
          </td>
        </tr>

        <tr>
          <th>{{ $t('hero.complexity') }}</th>

          <td>
            <div class="jnv-detail-card__herobase-value">
              <Complexity :level="data.complexity" size="21px"/>
            </div>
          </td>
        </tr>

        <tr>
          <th>{{ $t('hero.damage') }}</th>

          <td>
            <div class="jnv-detail-card__herobase-value">{{ data.damage_min + ' - ' + data.damage_max }}</div>
          </td>
        </tr>

        <tr>
          <th>{{ $t('hero.armor') }}</th>

          <td>
            <div class="jnv-detail-card__herobase-value">{{ data.armor }}</div>
          </td>
        </tr>
      </table>

      <div class="jnv-detail-card__role">
        <div v-for="(role, index) in roles" :key="index" :title="$t('hero.role.' + role)">
          <img :src="url.heroRole + role + '.png'" :alt="role" width="30">
        </div>
      </div>

      <div class="jnv-detail-card__unit">
        <span>{{ data.unit + ' ' + (data.unit == 1 ? $t(localePath + 'unit') : $t(localePath + 'units')) }}</span>
      </div>
    </div>
  </div>
</template>
  
<script setup>
  import Attribute from '@/components/general/svg/attributes/Attribute.vue'
  import Melee from '../svg/hero_base/Melee.vue'
  import Ranged from '../svg/hero_base/Ranged.vue'
  import Complexity from '../svg/hero_base/Complexity.vue';

  const props = defineProps({
    data: {
      type: Object,
      default: {}
    },
    position: {
      type: Number,
      default: 0
    }
  })

  const localePath = 'content.page.account.card.'

  const roles = computed(() => {
    var temp = []

    for(const [key, value] of Object.entries(props.data.roles)) {
      if(value > 0)
        temp.push(key)
    }

    return temp
  })

  const primaryClass = computed(() => {
    return props.data.primary_attr == 0 ? 'strength' : (props.data.primary_attr == 1 ? 'agility' : 'intelligence')
  })

  const disableCard = computed(() => {
    return props.position == 1 ? 'enable' : 'disable'
  })
  const { url } = useAppConfig()

  const showOriginalHero = () => {
    if(props.position == 1)
      useRouter().push('/hero/' + props.data.slug)
  }
</script>
  
<style lang="scss">
  @import '@/assets/css/variables.scss';

  .jnv-detail-card {
    width: 256px;
    cursor: pointer;
    transition: transform 1s;

    .jnv-detail-card__header {
      display: flex;
    }

    .jnv-detail-card__body {
      display: flex;
      flex-direction: column;
      row-gap: 10px;
      padding: 10px 17px;
      font-size: 15px;

      .jnv-detail-card__name {
        display: flex;
        align-items: center;
        column-gap: 10px;

        .jnv-detail-card__name-display {
          @include golden-gradient-text;
          font-size: 18px;
          text-transform: uppercase;
          font-weight: 800;
        }
      }

      .jnv-detail-card__divider {
        width: 100%;
        height: 2px;
        margin-bottom: 8px;
        background: linear-gradient(90deg, transparent, white, transparent);
      }

      .jnv-detail-card__oneliner {
        color: #5fff97;
      }

      .jnv-detail-card__hero-base {
        tr {
          th {
            text-align: left;
            color: #fbbf75;
            font-weight: 500;
            //color: #a9a9a9;
          }

          td {
            .jnv-detail-card__herobase-value {
              display: flex;
              align-items: center;
              font-weight: 600;
              height: 30px;
              
              .jnv-detail-card__hero-attack-type {
                margin-left: 7px;
                text-transform: uppercase;
                font-size: 13px;
              }

              .jnv-hero-complexity {
                width: 95px;
              }
            }
          }
        }
      }

      .jnv-detail-card__role {
        display: flex;
        flex-flow: row wrap;
        column-gap: 4px;
        justify-content: center;
      }

      .jnv-detail-card__unit {
        display: flex;
        justify-content: flex-end;

        span {
          padding: 2px 6px;
          border-radius: 99px;
          font-size: 11px;
          border: 1px solid;
        }
      }
    }    
  }

  .jnv-detail-card.strength {
    box-shadow: 0 0 6px #ef1717;

    .jnv-detail-card__body {
      background: radial-gradient(ellipse at top left, #0c0000 40%, #a50000);
    }
  }

  .jnv-detail-card.agility {
    box-shadow: 0 0 6px #29bb17;

    .jnv-detail-card__body {
      background: radial-gradient(ellipse at top left, #001401 40%, #108d01);
    }
  }

  .jnv-detail-card.intelligence {
    box-shadow: 0 0 6px #1377b7;

    .jnv-detail-card__body {
      background: radial-gradient(ellipse at top left, #000b14 40%, #025e91);
    }
  }

  .jnv-detail-card.disable {
    transform: scale(0.85);
    filter: saturate(0.3);
    z-index: 1;
  }

  .jnv-detail-card.enable {
    z-index: 2;
  }
</style>