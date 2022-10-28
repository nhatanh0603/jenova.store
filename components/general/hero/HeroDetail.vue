<template>
  <div class="jnv-hero-detail">
    <div class="jnv-hero-detail__container">
      <!-- PRIMARY AREA -->
      <div class="jnv-hero-detail__section">
        <!-- PORTRAIT -->
        <div class="jnv-hero-detail__hero-portrait-container jnv-hero-detail__background">
          <video class="jnv-hero-detail__hero-portrait" :poster="apiHeroVideoPoster + $route.params.slug + '.png'" autoplay preload="auto" loop playsinline muted>
            <source :src="apiHeroVideo + $route.params.slug + '.webm'" type="video/webm">
            <img :src="apiHeroVideoPoster + $route.params.slug + '.png'">
          </video>

          <div class="jnv-hero-detail__hp-mp">
            <div class="jnv-hero-detail__hp jnv-hero-detail__pos">
              <span class="jnv-hero-detail__hp-mp-base">620</span>
              <span class="jnv-hero-detail__hp-mp-bonus">+2.4</span>
            </div>

            <div class="jnv-hero-detail__mp jnv-hero-detail__pos">
              <span class="jnv-hero-detail__hp-mp-base">219</span>
              <span class="jnv-hero-detail__hp-mp-bonus">+0.6</span>
            </div>
          </div>
        </div>

        <!-- CORE ATTRIBUTE AND ACTION -->
        <div class="jnv-hero-detail__detail-container jnv-hero-detail__background">
          <div class="jnv-hero-detail__hero-name jnv-hero-detail__title-area">
            {{ $route.params.slug.split('_')[0] + ' ' + ($route.params.slug.split('_')[1] || '') }}
          </div>

          <div class="jnv-hero-detail__primary-attribute">
            <Agility />
            <span class="jnv-hero-detail__attribute-name">Agility</span>
          </div>

          <div class="jnv-hero-detail__hero-on-liner">
            Transforms Into A Powerful Ranged Demon
          </div>

          <HeroBase />

          <HeroAttributes />

          <hr class="jnv-hero-detail__divider">

          <div class="jnv-hero-detail__price">
            $65
          </div>

          <!-- ACTION GROUP -->
          <div class="jnv-hero-detail__actions">
            <div class="jnv-hero-detail__quantity">
              <div class="jnv-hero-detail__quantity-change">-</div>
              <input class="jnv-hero-detail__quantity-display" type="number" min="1" max="100" value="1">
              <div class="jnv-hero-detail__quantity-change">+</div>
            </div>

            <div class="jnv-hero-detail__action-group">
              <button class="jnv-hero-detail__button jnv-hero-detail__button--buy-now">Buy Now</button>
              <button class="jnv-hero-detail__button jnv-hero-detail__button--add-to-cart">Add To Cart</button>
            </div>              
          </div>
        </div>
      </div>

      <!-- SECONDARY AREA -->
      <div class="jnv-hero-detail__section">
        <div class="jnv-hero-detail__roles jnv-hero-detail__background">
          <div class="jnv-hero-detail__secondary-title jnv-hero-detail__title-area">Roles</div>

          <div class="jnv-hero-detail__role-container">
            <div class="jnv-hero-detail__role-content" v-for="(value, index) in roles" :key="index">
              <span class="jnv-hero-detail__role-name">{{ value }}</span>

              <div class="jnv-hero-detail__role-bar-background">
                <div class="jnv-hero-detail__role-bar"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="jnv-hero-detail__stats jnv-hero-detail__background">
          <div class="jnv-hero-detail__secondary-title jnv-hero-detail__title-area">Stats</div>

          <div class="jnv-hero-detail__stat-container">
            <!-- ATTACK -->
            <div class="jnv-hero-detail__stat-content">
              <span class="jnv-hero-detail__stat-title">
                Attack
              </span>

              <div class="jnv-hero-detail__stat-value-section">
                <img :src="apiHeroStat + 'icon_damage.png'" alt="Icon Damage" title="Damage" class="jnv-hero-detail__stat-img">
                <span class="jnv-hero-detail__stat-value">41-46</span>
              </div>

              <div class="jnv-hero-detail__stat-value-section">
                <img :src="apiHeroStat + 'icon_attack_time.png'" alt="Icon Attack Time" title="Attack Time" class="jnv-hero-detail__stat-img">
                <span class="jnv-hero-detail__stat-value">1.6</span>
              </div>

              <div class="jnv-hero-detail__stat-value-section">
                <img :src="apiHeroStat + 'icon_attack_range.png'" alt="Icon Attack Range" title="Attack Range" class="jnv-hero-detail__stat-img">
                <span class="jnv-hero-detail__stat-value">400</span>
              </div>

              <div class="jnv-hero-detail__stat-value-section">
                <img :src="apiHeroStat + 'icon_projectile_speed.png'" alt="Icon Projectile Speed" title="Projectile Speed" class="jnv-hero-detail__stat-img">
                <span class="jnv-hero-detail__stat-value">1400</span>
              </div>
            </div>

            <!-- DEFENSE -->
            <div class="jnv-hero-detail__stat-content">
              <span class="jnv-hero-detail__stat-title">
                Defense
              </span>

              <div class="jnv-hero-detail__stat-value-section">
                <img :src="apiHeroStat + 'icon_armor.png'" alt="Icon Armor" title="Armor" class="jnv-hero-detail__stat-img">
                <span class="jnv-hero-detail__stat-value">1.7</span>
              </div>

              <div class="jnv-hero-detail__stat-value-section">
                <img :src="apiHeroStat + 'icon_magic_resist.png'" alt="Icon Magic Resist" title="Magic Resist" class="jnv-hero-detail__stat-img">
                <span class="jnv-hero-detail__stat-value">25%</span>
              </div>
            </div>

            <!-- MOBILITY -->
            <div class="jnv-hero-detail__stat-content">
              <span class="jnv-hero-detail__stat-title">
                Mobility
              </span>

              <div class="jnv-hero-detail__stat-value-section">
                <img :src="apiHeroStat + 'icon_movement_speed.png'" alt="Icon Movement Speed" title="Movement Speed" class="jnv-hero-detail__stat-img">
                <span class="jnv-hero-detail__stat-value">295</span>
              </div>

              <div class="jnv-hero-detail__stat-value-section">
                <img :src="apiHeroStat + 'icon_turn_rate.png'" alt="Icon Turn Rate" title="Turn Rate" class="jnv-hero-detail__stat-img">
                <span class="jnv-hero-detail__stat-value">0.6</span>
              </div>

              <div class="jnv-hero-detail__stat-value-section">
                <img :src="apiHeroStat + 'icon_vision.png'" alt="Icon Vision" title="Vision" class="jnv-hero-detail__stat-img">
                <span class="jnv-hero-detail__stat-value">1800 / 800</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ABILITY AREA -->
      <div class="jnv-hero-detail__section">
        <div class="jnv-hero-detail__ability jnv-hero-detail__background">
          <div class="jnv-hero-detail__secondary-title jnv-hero-detail__title-area">Ability Details</div>

          <div class="jnv-hero-detail__ability-container">
            <div class="jnv-hero-detail__ability-selector">
              <div :class="['jnv-hero-detail__ability-selectable', selectedAbility.index != ability.index ? 'jnv-hero-detail__ability-not-selected' : '']" :style="'background-image: url(\'' + apiHeroAbility + ability.name + '.png\')'" v-for="ability in abilitiesForRender" @click="abilityIsSelected(ability)">
                <div class="jnv-hero-detail__ability-shard-scepter-icon" :style="'background-image: url(\'' + apiHeroStat + ability.shard_scepter_icon + '\')'" v-if="ability.shard_scepter_icon"></div>
              </div>
            </div>

            <div class="jnv-hero-detail__ability-info">
              <img :src="apiHeroAbility + selectedAbility.name + '.png'" alt="" class="jnv-hero-detail__ability-image">

              <div class="jnv-hero-detail__ability-info-content">
                <div class="jnv-hero-detail__ability-info-name">
                  {{ selectedAbility.name_loc }}
                </div>

                <div class="jnv-hero-detail__ability-info-aghanim">

                </div>

                <div class="jnv-hero-detail__ability-info-description">
                  <span v-if="selectedAbility.shard_loc !== '' && selectedAbility.shard_scepter_icon == 'aghs_shard.png'">{{ selectedAbility.shard_loc }}</span>

                  <span v-else-if="selectedAbility.scepter_loc !== '' && selectedAbility.shard_scepter_icon == 'aghs_scepter.png'">{{ selectedAbility.scepter_loc }}</span>

                  <span v-else>{{ selectedAbility.desc_loc }}</span>
                </div>

                <div class="jnv-hero-detail__ability-info-lore">
                  {{ selectedAbility.lore_loc }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
  import HeroBase from './parts/HeroBase.vue'
  import HeroAttributes from './parts/HeroAttributes.vue'
  import Agility from '../svg/attributes/Agility.vue'

  const { apiHeroStat, apiHeroAbility, apiHeroVideo, apiHeroVideoPoster, rootUrl } = useRuntimeConfig()
  
  const roles = ['Carry', 'Support', 'Nuker', 'Disabler', 'Jungler', 'Durable', 'Escape', 'Pusher', 'Initiator']

  const abilities = [
    { 
      name: "antimage_mana_break",
      name_loc: "Mana Break",
      desc_loc: "Burns an opponent's mana on each attack and deals damage equal to a percentage of the mana burnt. Enemies with no mana left are temporarily slowed.",
      lore_loc: "A modified technique of the Turstarkuri monks' peaceful ways is to turn magical energies on their owner.",
      shard_loc: "",
      scepter_loc: "",
      ability_has_scepter: false,
      ability_has_shard: false,
      ability_is_granted_by_scepter: false,
      ability_is_granted_by_shard: false,
    },

    { 
      name: "antimage_blink",
      name_loc: "Blink",
      desc_loc: "Short distance teleportation that allows Anti-Mage to move in and out of combat.",
      lore_loc: "In his encounter with the Dead Gods, Anti-Mage learned the value of being elusive.",
      shard_loc: "",
      scepter_loc: "",
      ability_has_scepter: false,
      ability_has_shard: false,
      ability_is_granted_by_scepter: false,
      ability_is_granted_by_shard: false,
    },

    { 
      name: "antimage_counterspell",
      name_loc: "Counterspell",
      desc_loc: "Passively grants magic resistance. Counterspell may be activated to create an anti-magic shell around Anti-Mage that blocks and sends any targeted spells back towards enemies instead.",
      lore_loc: "With the proper focus, Anti-Mage turns innate resistance into calculated retaliation.",
      shard_loc: "Counterspell passively grants an aura that reduces enemy spell damage. The reduction is stronger in close range.",
      scepter_loc: "",
      ability_has_scepter: false,
      ability_has_shard: true,
      ability_is_granted_by_scepter: false,
      ability_is_granted_by_shard: false,
    },

    { 
      name: "antimage_mana_overload",
      name_loc: "Blink Fragment",
      desc_loc: "Blinks an illusion to the target enemy or location, which attacks for a brief time. Counterspell is replicated on the Blink Fragment illusion. Has 3 Charges.",
      lore_loc: "",
      shard_loc: "",
      scepter_loc: "",
      ability_has_scepter: true,
      ability_has_shard: false,
      ability_is_granted_by_scepter: true,
      ability_is_granted_by_shard: false,
    },

    { 
      name: 'antimage_mana_void',
      name_loc: "Mana Void",
      desc_loc: "For each point of mana missing by the target unit, damage is dealt to it and surrounding enemies.  The main target is also mini-stunned.",
      lore_loc: "After bringing enemies to their knees, Anti-Mage punishes them for their use of the arcane arts.",
      shard_loc: "",
      scepter_loc: "",
      ability_has_scepter: true,
      ability_has_shard: false,
      ability_is_granted_by_scepter: false,
      ability_is_granted_by_shard: false,
    }
  ]

  const selectedAbility = ref(structuredClone(abilities[0]))
  selectedAbility.value.index = 0

  const abilitiesForRender = computed(() => {
    var result = abilities.filter(ability => !ability.ability_is_granted_by_scepter && !ability.ability_is_granted_by_shard)

    var shard = structuredClone(abilities.find(ability => ability.ability_has_shard))
    var scepter = structuredClone(abilities.find(ability => ability.ability_has_scepter))
    shard.shard_scepter_icon = 'aghs_shard.png'
    scepter.shard_scepter_icon = 'aghs_scepter.png'

    result.push(shard, scepter)

    for (let i = 0; i < result.length; i++) {
      result[i].index = i
    }

    return result
  }) 


  const abilityIsSelected = (ability) => {
    selectedAbility.value = ability
  }

</script>
  
<style lang="scss">
  @import '@/assets/css/variables.scss';

  $bg-padding: 2rem;

  .jnv-hero-detail {
    .jnv-hero-detail__container {
      /* 1. PORTRAIT */
      .jnv-hero-detail__hero-portrait-container {
        width: 60%;
        height: inherit;
        pointer-events: none;
        margin-right: 1rem;
        padding: 0;
        animation-duration: 1.3s;
        animation-timing-function: ease-out;
        animation-delay: 0s;
        animation-iteration-count: 1;
        animation-name: hero-portrait;

        .jnv-hero-detail__hero-portrait {
          width: 100%;
          height: 100%;
          padding: 1rem 0;
          max-width: 1440px;
          pointer-events: none;
          mask-image: linear-gradient(to top, transparent -3%, black 50%);
        }

        .jnv-hero-detail__hp-mp {
          text-align: center;
          font-size: 15px;

          .jnv-hero-detail__pos {
            padding: 6px 20px;
            position: relative;
          }

          .jnv-hero-detail__hp {
            background: linear-gradient(to right, #286323, #7AF03C);
          }

          .jnv-hero-detail__mp {
            background: linear-gradient(to right, #1056DB, #73F5FE);
          }

          .jnv-hero-detail__hp-mp-base {
            font-weight: 700;
            vertical-align: middle;
          }

          .jnv-hero-detail__hp-mp-bonus {
            font-size: 12px;
            position: absolute;
            top: 4px;
            margin-left: 6px;
          }
        }
      }

      /* 2. DETAIL */
      .jnv-hero-detail__detail-container {
        width: 40%;
        height: fit-content;
        margin-left: 1rem;

        .jnv-hero-detail__hero-name {
          font-size: 30px;
          font-weight: 900;            
          text-transform: uppercase;
          color: $jnv__color--apricot;            
        }

        .jnv-hero-detail__primary-attribute {
          display: flex;
          align-items: center;
          margin-bottom: 5px;

          .jnv-hero-detail__attribute-name {
            margin-left: 10px;
            font-size: 16px;
            text-transform: uppercase;
            font-weight: bold;
          }
        }

        .jnv-hero-detail__hero-on-liner {
          margin: 8px 0 15px 0;
          font-weight: 600;
          color: $jnv__color--light-sage;
        }

        .jnv-hero-detail__divider {
          width: 100%;
          margin: 15px 0;
          border-color: $jnv__color--pale-black;
        }

        .jnv-hero-detail__price {
          margin: 10px 0;
          font-size: 28px;
          font-weight: 800;
          color: $jnv__color--kelly-green;
          text-align: center;
        }

        .jnv-hero-detail__actions {
          display: flex;            
          flex-direction: column;

          .jnv-hero-detail__quantity {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 15px;

            .jnv-hero-detail__quantity-display {
              margin: 0 1rem;
              width: 50px;
              border: none;
              background-color: $jnv__color--dark-blue;
              color: $jnv__color--white;
              padding: 6px 10px;
              font-size: medium;
              font-weight: 500;
              text-align: center;
            }

            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }

            /* Firefox */
            input[type=number] {
              -moz-appearance: textfield;
            }

            .jnv-hero-detail__quantity-change {
              cursor: pointer;
              font-weight: 900;
              font-size: 25px;
            }
          }

          .jnv-hero-detail__action-group {
            display: flex;
            width: 100%;
            margin-top: 15px;
            box-shadow: 0 0 5px 1px $jnv__shadow-color--light-black;

            .jnv-hero-detail__button {
              padding: 10px 18px;
              width: 50%;
              font-weight: 700;
              z-index: 1;

              &:hover {
                box-shadow: 0 0 5px 1px $jnv__shadow-color--white;
                z-index: 2;
              }
              &:active {
                box-shadow: 0 0 10px 1px $jnv__shadow-color--light-black;
                z-index: 2;
              }
            }

            .jnv-hero-detail__button--buy-now {
              background: radial-gradient(#c41616, #6a0000);
            }

            .jnv-hero-detail__button--add-to-cart {
              background: radial-gradient(#00a905, #014e00);
            }
          }
        }
      }

      /* SECONDARY AREA */
      /* 3. ROLES */
      .jnv-hero-detail__roles {
        width: 50%;
        margin-right: 1rem;

        .jnv-hero-detail__role-container {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-bottom: -14px;

          .jnv-hero-detail__role-content {
            display: flex;
            flex-direction: column;
            width: 30%;
            margin-bottom: 14px;

            .jnv-hero-detail__role-name {
              margin-bottom: 5px;
              font-weight: 600;
            }

            .jnv-hero-detail__role-bar-background {
              background-color: grey;
              position: relative;
              width: 100%;
              height: 7px;

              .jnv-hero-detail__role-bar {
                background-color: white;
                position: absolute;
                top: 0;
                left: 0;
                width: 33.3%;
                height: 100%;
                box-shadow: 0 0 5px 0 $jnv__color--light-sage;
              }
            }
          }              
        }
      }

      /* 4. STATS */
      .jnv-hero-detail__stats {
        width: 50%;
        margin-left: 1rem;

        .jnv-hero-detail__stat-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          .jnv-hero-detail__stat-content {
            display: flex;
            flex-direction: column;
            width: 30%;

            .jnv-hero-detail__stat-title {
              font-size: 15px;
              font-weight: 600;
              margin-bottom: 10px;
              text-transform: uppercase;
            }

            .jnv-hero-detail__stat-value-section {
              display: flex;
              align-items: center;
              margin-top: 8px;

              .jnv-hero-detail__stat-img {
                width: 24px;
                height: 24px;
                margin-right: 10px;
              }

              .jnv-hero-detail__stat-value {
                font-weight: 500;
              }
            }
          }
        }
      }

      /* 5. ABILITY */
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
              margin: 0 8px 16px 8px;
              background-size: cover;
              background-repeat: no-repeat;
              box-shadow: 0 0 10px 0 $jnv__shadow-color--almost-black;
              position: relative;

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

            .jnv-hero-detail__ability-not-selected {
              filter: saturate(0) brightness(0.6);
            }
          }

          .jnv-hero-detail__ability-info {
            display: flex;
            align-items: flex-start;
            margin-top: 2rem;

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
                margin-bottom: 0.5rem;
                color: $jnv__color--purply-pink;
              }

              .jnv-hero-detail__ability-info-aghanim {

              }

              .jnv-hero-detail__ability-info-description {
                font-size: 15px;
                margin-bottom: 1rem;
              }

              .jnv-hero-detail__ability-info-lore {
                font-style: italic;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }

  /* GENERAL */
  .jnv-hero-detail__section {
    display: flex;
    margin-bottom: 2rem;
  }

  .jnv-hero-detail__background {
    display: flex;
    height: fit-content;
    padding: $bg-padding;
    flex-direction: column;
    background: $jnv-hero-detail__background;
    box-shadow: 0 0 5px 0 $jnv__shadow-color--almost-black;
  }

  .jnv-hero-detail__title-area {
    margin: -$bg-padding;
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

  @keyframes hero-portrait {
    0% {
      transform: translateX(-100px);
      opacity: 0;
    }
    100% {
        transform: translateX(0px);
        opacity: 1;
    }
  }

  @media screen and (max-width: 999px) {
    .jnv-hero-detail {
      .jnv-hero-detail__container {
        .jnv-hero-detail__section {
          flex-direction: column;

          .jnv-hero-detail__hero-portrait-container {
            width: 100%;
            margin-bottom: 1rem;
          }

          .jnv-hero-detail__detail-container {
            width: 100%;
            margin-top: 1rem;
            margin-left: 0;
          }

          .jnv-hero-detail__roles {
            width: 100%;
            margin-bottom: 1rem;
          }

          .jnv-hero-detail__stats {
            width: 100%;
            margin-left: 0;
            margin-top: 1rem;
          }
        }
      }
    }
  }
</style>