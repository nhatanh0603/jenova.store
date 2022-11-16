<template>
  <table class="jnv-cart__items">
    <tr class="jnv-cart__items_header">
      <th class="text-center" colspan="2">Product</th>
      <th>Price</th>
      <th>Quantity</th>
      <th colspan="2">Subtotal</th>
    </tr>

    <!-- CHECKBOX -->
    <tr class="jnv-cart__item" v-for="(product, index) in cart.products" :key="product.id">
      <td class="jnv-cart__item-checkbox">
        <div class="jnv-cart__item-wrapper">
          <CheckBox :key="product.id"
                    :value="{ product_id: product.id, quantity: product.quantity }"
                    :checked="checkoutList[product.id] ? true : false"
                    @box-click="handleCheckOutList"
          />
        </div>
      </td>

      <!-- PRODUCT -->
      <td class="jnv-cart__item-product">
        <NuxtLink :to="'/hero/' + product.slug" class="jnv-cart__item-wrapper">
          <img :src="url.heroImage + product.name + '.png'" :alt="product.display_name" width="100">

          <div class="jnv-cart__item-product-detail">
            <span class="jnv-cart__item-product-name">{{ product.display_name }}</span>

            <div class="jnv-cart__hero-attribute">
              <Strength width="20" v-if="product.primary_attr == 0"/>
              <Agility width="20" v-if="product.primary_attr == 1"/>
              <Intelligence width="20" v-if="product.primary_attr == 2"/>

              <span class="jnv-cart__hero-attribute-name">
                {{ product.primary_attr == 0 ? 'Strength' : (product.primary_attr == 1 ? 'Agility' : 'Intelligence') }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </td>

      <!-- PRICE -->
      <td class="jnv-cart__item-price">
        <div class="jnv-cart__item-wrapper">
          <img :src="url.misc + 'coin.svg'" alt="" width="20">
          <span>{{ product.price }}</span>
        </div>
      </td>

      <!-- QUANTITY -->
      <td class="jnv-cart__item-quantity">
        <div class="jnv-cart__item-wrapper">
          <QuantitySync :index="index" :key="product.id"/>
        </div>
      </td>

      <!-- SUBTOTAL -->
      <td class="jnv-cart__item-subtotal">
        <div class="jnv-cart__item-wrapper">
          <img :src="url.misc + 'coin.svg'" alt="" width="20">
          <span>{{ $toDec(product.price * product.quantity, 2) }}</span>
        </div>
      </td>

      <td>
        <RecycleBin @click="useCartStore().removeItem(product.id)" :key="product.id"/>
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

  .jnv-cart__items {
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 0 5px 0 $jnv__shadow-color--almost-black;

    .jnv-cart__items_header {
      background: rgba(0, 0, 0, 0.5);

      th {
        padding: 1rem;
        text-align: left;
      }
    }

    .jnv-cart__item {
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

      td {
        padding: 1rem;
      }

      .jnv-cart__item-wrapper {
        display: flex;
        align-items: center;
      }

      .jnv-cart__item-checkbox {
        .jnv-cart__item-wrapper {
          justify-content: center;
        }
      }

      .jnv-cart__item-product {
        a {
          text-decoration: none;
          color: $jnv__color--white;
        }

        img {
          box-shadow: 0 0 5px $jnv__shadow-color--light-black;
        }

        .jnv-cart__item-product-detail {
          display: flex;
          align-self: flex-start;
          flex-direction: column;
          margin-left: 15px;

          .jnv-cart__item-product-name {
            font-weight: 800;
            font-size: 15px;
            margin-bottom: 7px;
            text-transform: uppercase;
            @include golden-gradient-text;
          }

          .jnv-cart__hero-attribute {
            display: flex;
            align-items: center;

            .jnv-cart__hero-attribute-name {
              margin-left: 10px;
            }
          }
        }
      }

      .jnv-cart__item-price, .jnv-cart__item-subtotal {
        img {
          margin-right: 8px;
        }
      }
    }
  }
</style>