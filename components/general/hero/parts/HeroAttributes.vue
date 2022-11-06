<template>
  <div class="jnv-hero-attributes">
    <div class="jnv-hero-attributes__container">
      <div class="jnv-hero-attributes__wrapper">
        <div class="jnv-hero-attributes__name">
          <div class="jnv-hero-attributes__name-wrapper">
            <Strength />
            <span>Strength</span>
          </div>          
        </div>

        <div class="jnv-hero-attributes__value">
          <span class="jnv-hero-attributes__value-wrapper">
            {{ attributes.str_base }} 
            <span class="jnv-hero-attributes__value-bonus">+{{ attributes.str_gain }}</span>
          </span>
          
        </div>
      </div>

      <div class="jnv-hero-attributes__wrapper">
        <div class="jnv-hero-attributes__name">
          <div class="jnv-hero-attributes__name-wrapper">
            <Agility />
            <span>Agility</span>
          </div>          
        </div>

        <div class="jnv-hero-attributes__value">
          <span class="jnv-hero-attributes__value-wrapper">
            {{ attributes.agi_base }}
            <span class="jnv-hero-attributes__value-bonus">+{{ attributes.agi_gain }}</span>
          </span>
                     
        </div>
      </div>

      <div class="jnv-hero-attributes__wrapper">
        <div class="jnv-hero-attributes__name">
          <div class="jnv-hero-attributes__name-wrapper">
            <Intelligence />
            <span>Intelligence</span>
          </div>          
        </div>

        <div class="jnv-hero-attributes__value">
          <span class="jnv-hero-attributes__value-wrapper">
            {{ attributes.int_base }}
            <span class="jnv-hero-attributes__value-bonus">+{{ attributes.int_gain }}</span>
          </span>           
        </div>
      </div>
      
    </div>
  </div>
</template>
  
<script setup>
  import Agility from '../../svg/attributes/Agility.vue'
  import Strength from '../../svg/attributes/Strength.vue'
  import Intelligence from '../../svg/attributes/Intelligence.vue'

  const props = defineProps({
    attributes: Object
  })
</script>
  
<style lang="scss">
  @import '@/assets/css/variables.scss';

  .jnv-hero-attributes {
    width: 100%;
    margin: 10px 0;

    .jnv-hero-attributes__container {
      display: table;
      width: 100%;

      .jnv-hero-attributes__wrapper {
        display: table-row;

        .jnv-hero-attributes__name {
          display: table-cell;
          padding: 6px 0;
          width: fit-content;

          .jnv-hero-attributes__name-wrapper {
            display: flex;
            align-items: center;

            span {
              margin: 0 40px 0 10px;
            }
          }
        }

        .jnv-hero-attributes__value {
          display: table-cell;
          width: 100%;
          vertical-align: middle;

          .jnv-hero-attributes__value-wrapper {
            font-weight: 700;
            font-size: 16px;
            position: relative;

            .jnv-hero-attributes__value-bonus {
              font-weight: 100;
              font-size: 12px;
              position: absolute;
              top: 0;
              margin-left: 6px;
              color: $jnv__color--green;
            }
          }
        }
      }
    }
  }
</style>