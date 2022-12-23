<template>
  <div class="jnv-hero-detail__stats jnv-hero-detail__background">
    <div class="jnv-hero-detail__secondary-title jnv-hero-detail__title-area">
      {{ $t('hero.stats') }}
    </div>

    <div class="jnv-hero-detail__stat-container">
      <!-- ATTACK -->
      <div class="jnv-hero-detail__stat-content">
        <span class="jnv-hero-detail__stat-title">
          {{ $t('hero.attack') }}
        </span>

        <div class="jnv-hero-detail__stat-value-section">
          <img :src="url.heroStat + 'icon_damage.png'" 
                alt="Icon Damage" 
                title="Damage" 
                class="jnv-hero-detail__stat-img"
          >

          <span class="jnv-hero-detail__stat-value">
            {{ data.damage_min + ' - ' + data.damage_max }}
          </span>
        </div>

        <div class="jnv-hero-detail__stat-value-section">
          <img :src="url.heroStat + 'icon_attack_time.png'"
                alt="Icon Attack Time"
                title="Attack Time"
                class="jnv-hero-detail__stat-img"
          >

          <span class="jnv-hero-detail__stat-value">
            {{ data.attack_rate }}
          </span>
        </div>

        <div class="jnv-hero-detail__stat-value-section">
          <img :src="url.heroStat + 'icon_attack_range.png'"
                alt="Icon Attack Range"
                title="Attack Range"
                class="jnv-hero-detail__stat-img"
          >

          <span class="jnv-hero-detail__stat-value">
            {{ data.attack_range }}
          </span>
        </div>

        <div class="jnv-hero-detail__stat-value-section">
          <img :src="url.heroStat + 'icon_projectile_speed.png'"
                alt="Icon Projectile Speed"
                title="Projectile Speed"
                class="jnv-hero-detail__stat-img"
          >

          <span class="jnv-hero-detail__stat-value">
            {{ data.projectile_speed }}
          </span>
        </div>
      </div>

      <!-- DEFENSE -->
      <div class="jnv-hero-detail__stat-content">
        <span class="jnv-hero-detail__stat-title">
          {{ $t('hero.defense') }}
        </span>

        <div class="jnv-hero-detail__stat-value-section">
          <img :src="url.heroStat + 'icon_armor.png'"
                alt="Icon Armor" title="Armor"
                class="jnv-hero-detail__stat-img"
          >

          <span class="jnv-hero-detail__stat-value">
            {{ $toDec(data.armor) }}
          </span>
        </div>

        <div class="jnv-hero-detail__stat-value-section">
          <img :src="url.heroStat + 'icon_magic_resist.png'"
                alt="Icon Magic Resist"
                title="Magic Resist"
                class="jnv-hero-detail__stat-img"
          >
          <span class="jnv-hero-detail__stat-value">
            {{ data.magic_resistance + '%'}}
          </span>
        </div>
      </div>

      <!-- MOBILITY -->
      <div class="jnv-hero-detail__stat-content">
        <span class="jnv-hero-detail__stat-title">
          {{ $t('hero.mobility') }}
        </span>

        <div class="jnv-hero-detail__stat-value-section">
          <img :src="url.heroStat + 'icon_movement_speed.png'"
                alt="Icon Movement Speed"
                title="Movement Speed"
                class="jnv-hero-detail__stat-img"
          >

          <span class="jnv-hero-detail__stat-value">
            {{ data.movement_speed }}
          </span>
        </div>

        <div class="jnv-hero-detail__stat-value-section">
          <img :src="url.heroStat + 'icon_turn_rate.png'"
                alt="Icon Turn Rate" title="Turn Rate"
                class="jnv-hero-detail__stat-img">

          <span class="jnv-hero-detail__stat-value">
            {{ data.turn_rate }}
          </span>
        </div>

        <div class="jnv-hero-detail__stat-value-section">
          <img :src="url.heroStat + 'icon_vision.png'"
                alt="Icon Vision"
                title="Vision"
                class="jnv-hero-detail__stat-img">
          <span class="jnv-hero-detail__stat-value">
            {{ data.sight_range_day + ' / ' + data.sight_range_night }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
  const props = defineProps({
    data: Object
  })

  const { url } = useAppConfig()
</script>
  
<style lang="scss">
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
</style>