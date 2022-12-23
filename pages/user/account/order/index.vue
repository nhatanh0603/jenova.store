<template>
  <div class="jnv-user__order" v-if="isAnyOrderExist">
    <div class="jnv-user__order-item" v-for="order in orders.data" :key="order.id" @click="openOrderDetail(order.id)">
      <div class="jnv-user__order-item-head">
        <div class="jnv-user__order-id">
          #{{ order.id }}
        </div>

        <div class="jnv-user__order-placed-at">
          {{ $formatDateTime(order.placed_at) }}
        </div>
      </div>

      <div class="jnv-user__order-summary">
        <div class="jnv-user__order-product-delegate">
          <img :src="url.heroImage + order.first_item.name + '.png'"
               :alt="order.first_item.display_name" width="100"
          >

          <div class="jnv-user__order-product-all">
            <span class="jnv-user__order-product-name">{{ order.first_item.display_name }}</span>
            <span class="jnv-user__order-product-other" v-if="order.unique_product > 1">
              {{ `+ ${order.unique_product - 1} others` }}
            </span>
          </div>
        </div>

        <div class="jnv-user__order-total">
          <img :src="url.misc + 'coin.svg'" alt="Coin Icon" width="20">
          <span>{{ order.total_price }}</span>
        </div>
      </div>
    </div>

    <div class="jnv-user__order-load-more" v-if="orders?.links?.next">
      <button @click="loadMore">Load More...</button>
    </div>
  </div>

  <CuteAstronaut :first-message="$t(localePath + 'not_found.first_message')" 
                 :second-message="$t(localePath + 'not_found.second_message')"
                 v-else
  />
</template>
  
<script setup>
  import CuteAstronaut from '@/components/general/CuteAstronaut.vue'
  import { useOrderStore } from '@/stores/order'
  import { storeToRefs } from 'pinia'
  
  definePageMeta({
    layout: "account",
    middleware: 'authentication'
  })

  useHead({
    title: 'My Purchase'
  })

  const localePath = 'content.page.account.order.'
  const { url } = useAppConfig()
  const { orders } = storeToRefs(useOrderStore())
  const { fetch } = useOrderStore()

  const isAnyOrderExist = computed(() => {
    if(Object.keys(orders.value).length > 0)
      return Object.keys(orders.value.data).length > 0
    else
      return false
  })

  onBeforeMount(() => {
    fetch()
  })

  const loadMore = () => {
    fetch(orders.value.links.next)
  }

  const openOrderDetail = (id) => {
    useRouter().push('order/' + id)
  }
</script>
  
<style lang="scss">
  @import '@/assets/css/variables.scss';

  .jnv-user__order {
    display: flex;
    flex-direction: column;
    row-gap: 20px;

    .jnv-user__order-item {
      display: flex;
      flex-direction: column;
      cursor: pointer;
      box-shadow: 0 0 10px #0e0e0e;

      &:hover {
        box-shadow: 0 0 10px #00784e;
      }

      .jnv-user__order-item-head {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        background: linear-gradient(126deg, #08724f, #0b8391);
        padding: 9px 18px;

        .jnv-user__order-id {
          font-size: 13px;
          text-transform: uppercase;
          font-weight: 500;
        }

        .jnv-user__order-placed-at {
          font-size: 12px;
        }
      }

      .jnv-user__order-summary {
        display: flex;
        justify-content: space-between;
        background: linear-gradient(45deg, #000c1a, #0d2440);
        padding: 9px 18px;

        .jnv-user__order-product-delegate {
          display: flex;
          column-gap: 15px;

          img {
            box-shadow: 0 0 10px #072a44;
          }

          .jnv-user__order-product-all {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;
            row-gap: 10px;

            .jnv-user__order-product-name {
              text-transform: uppercase;
              font-size: 13px;
              font-weight: bold;
              @include golden-gradient-text;
            }

            .jnv-user__order-product-other {
              font-size: 12px;
            }
          }
        }

        .jnv-user__order-total {
          display: flex;
          column-gap: 10px;
          align-items: center;
        }
      }
    }

    .jnv-user__order-load-more {
      display: flex;
      justify-content: center;
      padding: 5px;
      background: linear-gradient(90deg, transparent, #083374, transparent);

      &:hover {
        background: linear-gradient(90deg, transparent, #07429b, transparent);
      }

      button {
        font-weight: 700;
      }
    }
  }

  @media screen and (max-width: 830px) {
    .jnv-user__order {
      .jnv-user__order-item-head {
        flex-direction: column;
        align-items: flex-start !important;
        row-gap: 5px;

        .jnv-user__order-id {
          font-size: 12px !important;
        }

        .jnv-user__order-placed-at {
          align-self: flex-end;
          font-size: 11px !important;
        }
      }

      .jnv-user__order-summary {
        flex-direction: column;
        row-gap: 10px;

        .jnv-user__order-total {
          align-self: flex-end;
        }
      }
    }
  }
</style>