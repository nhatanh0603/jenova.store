<template>
  <table class="jnv-cart__table">
    <tr class="jnv-cart__table-header">
      <th class="text-center" colspan="2">
        {{ $t('content.page.cart.product') }}
      </th>
    </tr>

    <tr class="jnv-cart__table-row" v-for="(product, index) in cart.products" :key="product.id">
      <td class="jnv-cart__checkbox">
        <div class="jnv-cart__table-data-wrapper">
          <CheckBox :key="product.id"
                    :value="{ product_id: product.id, quantity: product.quantity }"
                    :checked="checkoutList[product.id] ? true : false"
                    @box-click="handleCheckOutList"
          />
        </div>
      </td>

      <td class="jnv-cart__product">
        <div class="jnv-cart__table-data-wrapper">
          <div class="jnv-cart__product-image-wrapper">
            <nuxt-link :to="'/hero/' + product.slug">
              <img :src="url.heroImage + product.name + '.png'" alt="" width="120" class="jnv-cart__product-image">
            </nuxt-link>

            <RecycleBin @click="useCartStore().removeItem(product.id)" :key="product.id"/>
          </div>
          

          <div class="jnv-cart__product-info">
            <div class="jnv-cart__product-name">
              {{ product.display_name }}
            </div>

            <div class="jnv-cart__hero-primary-attribute">
              <Strength width="20" v-if="product.primary_attr == 0"/>
              <Agility width="20" v-if="product.primary_attr == 1"/>
              <Intelligence width="20" v-if="product.primary_attr == 2"/>

              <span class="jnv-cart__hero-primary-attribute-name">
                {{ product.primary_attr == 0 ? 'Strength' : (product.primary_attr == 1 ? 'Agility' : 'Intelligence') }}
              </span>
            </div>

            <div class="jnv-cart__product-price">
              <img :src="url.misc + 'coin.svg'" alt="Coin Icon" width="20">
              <span class="jnv-cart__product-price-value">{{ product.price }}</span>
            </div>

            <div class="jnv-cart__quantity">
              <QuantitySync :index="index" :key="product.id"/>
            </div>
          </div>
        </div>
      </td>      
    </tr>
  </table>
</template>
  
<script setup>
  import Strength from '../svg/attributes/Strength.vue'
  import Agility from '../svg/attributes/Agility.vue'
  import Intelligence from '../svg/attributes/Intelligence.vue'
  import RecycleBin from '../svg/RecycleBin.vue'
  import QuantitySync from './QuantitySync.vue'
  import CheckBox from '../CheckBox.vue'
  import { useCartStore } from '~~/stores/cart'
  import { storeToRefs } from 'pinia'

  const { url } = useAppConfig()
  const { cart, checkoutList } = storeToRefs(useCartStore())
  const { syncCheckoutList } = useCartStore()

  const handleCheckOutList = (isChecked, value) => {
    if(isChecked)
      syncCheckoutList(value.product_id, value.quantity)
    else
      syncCheckoutList(value.product_id, 0)
  }
</script>
  
<style lang="scss">
  @import '@/assets/css/variables.scss';

  .jnv-cart__table {
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 0 5px 0 $jnv__shadow-color--almost-black;

    .jnv-cart__table-header {
      background: rgba(0, 0, 0, 0.5);

      th {
        padding: 1rem;
      }
    }

    .jnv-cart__table-row {
      &:nth-child(even) {
        background: rgba(0, 0, 0, 0.3);
      }
      &:nth-child(odd) {
        background: rgb(16 16 30 / 30%);
      }

      &:hover {
        box-shadow: 0 0 6px $jnv__color--pale-black;
        background: rgba(0, 0, 0, 0.4);
      }

      .jnv-cart__checkbox {
        .jnv-cart__table-data-wrapper {
          display: flex;
          justify-content: center;
          align-items:center;
          padding: 1.5rem 1rem;
        }
      }

      .jnv-cart__product {
        width: 100%;

        .jnv-cart__table-data-wrapper {
          display: flex;
          padding: 1.5rem 1rem;

          .jnv-cart__product-image-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            .jnv-cart__product-image {
              box-shadow: 0 0 5px $jnv__shadow-color--dark-gray;
            }
          }
          

          .jnv-cart__product-info {
            margin-left: 15px;

            .jnv-cart__product-name {
              font-weight: 800;
              font-size: 15px;
              margin-bottom: 7px;
              text-transform: uppercase;
              @include golden-gradient-text;
            }

            .jnv-cart__hero-primary-attribute {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              margin-bottom: 8px;

              .jnv-cart__hero-primary-attribute-name {
                margin-left: 8px;
              }
            }

            .jnv-cart__product-price {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              margin-bottom: 8px;

              .jnv-cart__product-price-value {
                margin-left: 8px;
              }
            }
          }
        }
        
      }
    }
  }
</style>