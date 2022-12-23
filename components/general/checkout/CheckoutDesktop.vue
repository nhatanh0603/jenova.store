<template>
  <table class="jnv-checkout__product-table">
    <tr class="jnv-checkout__product-table-header">
      <th>{{ $t('content.page.checkout.product') }}</th>
      <th>{{ $t('content.page.checkout.price') }}</th>
      <th>{{ $t('content.page.checkout.quantity') }}</th>
      <th>{{ $t('content.page.checkout.subtotal') }}</th>
    </tr>

    <tr v-for="product in products" :key="product.id" class="jnv-checkout__product-table-row">
      <td class="jnv-checkout__product-detail">
        <div class="jnv-checkout__data-container">
          <img :src="url.heroImage + product.name + '.png'" alt="" width="100">

          <div class="jnv-checkout__product-detail-info">
            <span class="jnv-checkout__product-name">{{ product.display_name }}</span>
            <Attribute :primary="product.primary_attr" width="20px"/>
          </div>
        </div>
      </td>

      <td class="jnv-checkout__product-price">
        <div class="jnv-checkout__data-container">
          <img :src="url.misc + 'coin.svg'"  alt="Coin Icon" width="20">
          <span>{{ product.price }}</span>
        </div>
      </td>

      <td class="jnv-checkout__product-quantity">
        <div class="jnv-checkout__data-container">
          {{ product.quantity }}
        </div>
      </td>

      <td class="jnv-checkout__product-subtotal">
        <div class="jnv-checkout__data-container">
          <img :src="url.misc + 'coin.svg'"  alt="Coin Icon" width="20">
          <span>{{ $toDec(product.price * product.quantity, 2, true).toLocaleString() }}</span>
        </div>
      </td>
    </tr>
  </table>
</template>
  
<script setup>
  import Attribute from '@/components/general/svg/attributes/Attribute.vue'

  const props = defineProps({
    products: {
      type: Object,
      default: {}
    }
  })

  const { url } = useAppConfig()
</script>
  
<style lang="scss">
  @import '@/assets/css/variables.scss';

  .jnv-checkout__product-table {
    margin-right: 20px;
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 0 5px 0 $jnv__shadow-color--almost-black;

    .jnv-checkout__product-table-header {
      background: rgba(0, 0, 0, 0.5);
      
      th {
        padding: 1rem;

        &:nth-child(even) {
          text-align: left;
        }
      }
    }

    .jnv-checkout__product-table-row {
      td {
        padding: 1rem;
      }
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

      .jnv-checkout__data-container {
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }

      .jnv-checkout__product-detail {
        .jnv-checkout__data-container {
          align-items: flex-start;

          img {
            box-shadow: 0 0 5px #347999;
          }

          .jnv-checkout__product-detail-info {
            margin-left: 10px;
            display: flex;
            flex-direction: column;

            .jnv-checkout__product-name {
              margin-bottom: 10px;
              font-size: 15px;
              font-weight: 700;
              white-space: nowrap;
              @include golden-gradient-text;
            }
          }
        }
      }

      .jnv-checkout__product-price, .jnv-checkout__product-subtotal {
        img {
          margin-right: 8px;
        }
      }

      .jnv-checkout__product-quantity {
        .jnv-checkout__data-container {
          display: flex;
          justify-content: center;
        }
      }
    }
  }
</style>