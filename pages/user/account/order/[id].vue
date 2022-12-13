<template>
  <div class="jnv-user__order-detail" v-if="Object.keys(order).length">
    <div class="jnv-user__od-back" @click="$router.push('/user/account/order')">
      <button><Arrow type="left" height="15" fill="#fff"/><span>Back</span></button>
    </div>

    <div class="jnv-user__od-content">
      <div class="jnv-user__od-head">
        <div class="jnv-user__od-id">
          <span>Order Id.</span>
          <span class="jnv-user__od-id-main">{{ order.id }}</span>
        </div>

        <div class="jnv-user__od-placed-at">
          <span>Placed At</span>
          <span class="jnv-user__od-placed-at-main">{{ $formatDateTime(order.placed_at) }}</span>
        </div>
      </div>

      <div class="jnv-line-breaker"></div>

      <div class="jnv-user__od-body">
        <div class="jnv-user__od-title">
          <span>Products</span>
          <span class="jnv-user__od-product-count">{{ order.unique_product }}</span>
        </div>

        <div class="jnv-user__od-product" v-for="product, index in order.order_detail" :key="index">
          <div class="jnv-user__od-product-image" @click="$router.push('/hero/' + product.slug)">
            <img :src="url.heroImage + product.name + '.png'" :alt="product.display_name" width="120">
          </div>

          <div class="jnv-user__od-product-detail">
            <Attribute :primary="product.primary_attribute" :hasLabel="false"/>

            <div class="jnv-user__od-product-name">
              {{ product.display_name }}
            </div>

            <div class="jnv-user__od-product-detail-subtotal">
              <div class="jnv-user__od-product-quantity">
                x{{ product.quantity }}
              </div>

              <div class="jnv-user__od-product-amount">
                <img :src="url.misc + 'coin.svg'" alt="Coin Icon" width="20">
                {{ product.amount }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="jnv-line-breaker"></div>

      <div class="jnv-user__od-total">
        <span class="jnv-user__od-total-title">Order Total</span>
        <img :src="url.misc + 'coin.svg'" alt="Coin Icon" width="24">
        <span class="jnv-user__od-total-value">{{ order.total_price }}</span>
      </div>
    </div>
  </div>

  <div class="jnv-user__od-not-found" v-else>
    <span>Order not found</span>
    <img :src="url.misc + 'curiosity-search.svg'" alt="Curiosity Search">
  </div>
</template>
  
<script setup>
  import Attribute from '@/components/general/svg/attributes/Attribute.vue'
  import Arrow from '@/components/general/svg/Arrow.vue'
  import { useOrderStore } from '@/stores/order'
  import { storeToRefs } from 'pinia'

  definePageMeta({
    layout: "account",
    middleware: 'authentication'
  })

  const { url } = useAppConfig()
  const { order } = storeToRefs(useOrderStore())
  const { fetchOrderDetail } = useOrderStore()

  onBeforeMount(() => {
    fetchOrderDetail(useRoute().params.id)
  })

</script>
  
<style lang="scss">
  @import '@/assets/css/variables.scss';

  $product-image-width: 120px;
  $attribute-left: 8px;

  .jnv-user__order-detail {
    display: flex;
    flex-direction: column;
    row-gap: 1.5rem;

    .jnv-user__od-back {
      button {
        display: inline-flex;
        column-gap: 10px;
        font-weight: 700;
        background: linear-gradient(90deg, transparent, #04666a, transparent);
        padding: 5px 30px;
        margin: 0 -20px;

        &:hover {
          background: linear-gradient(90deg, transparent, #01888d, transparent);

          svg path{
            fill: #c41616;
          }
        }
      }
    }

    .jnv-user__od-content {
      display: flex;
      flex-direction: column;
      row-gap: 20px;

      .jnv-user__od-head {
        .jnv-user__od-id {
          margin-bottom: 8px;
          text-transform: uppercase;

          .jnv-user__od-id-main {
            margin-left: 5px;
            font-weight: 700;
            color: #78ff78;
          }
        }

        .jnv-user__od-placed-at {
          .jnv-user__od-placed-at-main {
            margin-left: 5px;
            color: #c9c9c9;
            font-weight: 600;
          }
        }
      }

      .jnv-user__od-body {
        display: flex;
        flex-direction: column;
        row-gap: 30px;

        .jnv-user__od-title {
          text-transform: uppercase;
          font-weight: 600;
          width: fit-content;
          display: flex;
          column-gap: 10px;
          align-self: center;
          background: linear-gradient(90deg, transparent, #007061, transparent);
          padding: 5px 40px;

          .jnv-user__od-product-count {
            background: #d14444;
            border-radius: 5px;
            padding: 0 4px;
            height: 20px;
            font-size: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        .jnv-user__od-product {
          display: flex;
          justify-content: flex-start;
          filter: drop-shadow(0px 0px 5px #2c662c);
          position: relative;

          .jnv-user__od-product-image {
            display: flex;
            cursor: pointer;
          }

          .jnv-user__od-product-detail {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 5px 20px 5px 0;
            background: linear-gradient(135deg, black, #0c5033);
            position: relative;

            .jnv-attribute {
              position: absolute;
              top: -10px;
              left: 8px;
              background: linear-gradient(90deg, #010805, #02100a);
              padding: 4px;
              border-radius: 999px;
            }

            .jnv-user__od-product-name {
              @include golden-gradient-text;
              font-size: 15px;
              font-weight: 700;
              margin-left: 53px;
            }

            .jnv-user__od-product-detail-subtotal {
              display: flex;
              justify-content: space-between;
              column-gap: 10px;
              margin-left: 20px;

              .jnv-user__od-product-quantity {
                font-weight: 700;
                color: #fbbb5b;
              }

              .jnv-user__od-product-amount {
                display: flex;
                align-items: center;
                column-gap: 5px;
              }
            }            
          }
        }
      }

      .jnv-user__od-total {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 18px;
        font-weight: 700;

        .jnv-user__od-total-title {
          margin-right: 20px;
          text-transform: uppercase;
        }

        .jnv-user__od-total-value {
          margin-left: 6px;
        }
      }
    }
  }

  .jnv-user__od-not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    row-gap: 40px;

    span {
      font-size: 22px;
      font-weight: 700;
      text-transform: uppercase;
    }

    img {
      max-width: 333px;
    }
  }

  .jnv-line-breaker {
    height: 2px;
    margin: 0 -20px;
    background: linear-gradient(45deg, transparent, rgb(113 163 255), transparent);
  }
</style>