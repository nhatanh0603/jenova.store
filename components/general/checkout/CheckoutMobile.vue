<template>
  <div class="jnv-checkout__products-mobile">
    <div class="jnv-checkout__product-detail-mobile" v-for="product in products" :key="product.id">
      <div class="jnv-checkout__product-image-mobile">
        <img :src="url.heroImage + product.name + '.png'" alt="" width="120">
      </div>

      <div class="jnv-checkout__product-info-mobile">
        <span class="jnv-checkout__product-name-mobile">{{ product.display_name }}</span>

        <Attribute :primary="product.primary_attr" width="20px"/>

        <table class="jnv-checkout__product-value-table">
          <tr>
            <th>Price</th>
            <td>
              <div class="jnv-checkout__product-value-td">
                <img :src="url.misc + 'coin.svg'"  alt="Coin Icon" width="20">
                <span>{{ product.price }}</span>
              </div>
            </td>
          </tr>

          <tr>
            <th>Quantity</th>
            <td>
              <div class="jnv-checkout__product-value-td">
                <span class="jnv-checkout__product-value-quantity">{{ product.quantity }}</span>
              </div>
            </td>
          </tr>

          <tr>
            <th>Subtotal</th>
            <td class="jnv-checkout__product-value-td">
              <img :src="url.misc + 'coin.svg'"  alt="Coin Icon" width="20">

              <span>{{ $toDec(product.price * product.quantity, 2, true).toLocaleString() }}</span>
            </td>
          </tr>
          
        </table>
      </div>
    </div>
  </div>
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

  .jnv-checkout__products-mobile {
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 5px 0 $jnv__shadow-color--almost-black;

    .jnv-checkout__product-detail-mobile {
      display: flex;
      padding: 1rem;

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

      .jnv-checkout__product-image-mobile {
        img {
          box-shadow: 0 0 5px #347999;
        }
      }

      .jnv-checkout__product-info-mobile {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        margin-left: 15px;

        .jnv-checkout__product-name-mobile {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 7px;
          @include golden-gradient-text;
        }

        .jnv-checkout__product-value-table {
          margin-top: 10px;
          background: rgba(0, 0, 0, 0.2);
          padding: 5px 10px;
          border-radius: 10px;

          .jnv-checkout__product-value-td {
            display: flex;
            align-items: center;
            margin: 3px 0 3px 15px;

            span {
              margin-left: 8px;
              font-weight: 600;
            }

            .jnv-checkout__product-value-quantity {
              margin-left: 0;
              font-weight: 700;
            }
          }

          tr {
            th {
              font-weight: normal;
              text-align: start;
              color: $jnv__color--bluish-gray;
            }
          }
        }
      }
    }
  }
</style>