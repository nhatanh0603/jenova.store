<template>
  <div class="jnv-order">
    <div class="jnv-order__message">
      <span class="jnv-order__message--primary">Order Successfully Placed</span>

      <span class="jnv-order__message--secondary">Thank You For Your Purchase!</span>

      <div class="jnv-order__order-id">
        <span>Order ID.</span>
        <span class="jnv-order__order-id-value">{{ order.id }}</span>
      </div>
      
      <button type="button" class="jnv-order__view-order" 
              @click="$router.push('/user/account/order/' + order.id)"
      >
        View Order
      </button>
    </div>

    <div class="jnv-order__product-review">
      <div @click="showItem('prev')" class="jnv-order__slide_direction">
        <Arrow type="left" fill="#fff" v-if="isFirstItem"/>
      </div>

      <TransitionGroup :name="setting.transitionName" tag="div" class="jnv-order__product-group"
                       :width="productGroupWidth" :style="'column-gap: ' + setting.columnGap + 'px'"
      >
        <div class="jnv-order__product-review-detail"
             v-for="item in list" :key="item.name"
             :width="setting.productImageWidth"
        >
          <div class="jnv-order__product-image">
            <img :src="url.heroImage + item.name + '.png'"
                 alt="Product Review"
                 :width="setting.productImageWidth"
            >

            <div class="jnv-order__product-quantity">{{ item.quantity }}</div>
          </div>
          
          <div class="jnv-order__product-name">
            {{ item.display_name }}
          </div>
        </div>
      </TransitionGroup>

      <div @click="showItem('next')" class="jnv-order__slide_direction">
        <Arrow type="right" fill="#fff" v-if="isLastItem"/>
      </div>
    </div>

    <div class="jnv-order__order-placed-image">
      <img :src="url.misc + 'order-placed.svg'" alt="Order Placed Image">
    </div>
  </div>
</template>
  
<script setup>
  import Arrow from '@/components/general/svg/Arrow.vue'
  import { useOrderStore } from '../stores/order'
  import { storeToRefs } from 'pinia'

  const { order } = storeToRefs(useOrderStore())

  const list = ref([])
  const iniWindowWidth = window.innerWidth
  const setting = ref({
    productKey: 0, // Vị trí key của product tương ứng với phần tử cuối trong list
    displayNumber: 4,
    transitionName: '',
    productImageWidth: 100,
    columnGap: 15
  })

  useHead({
    title: 'Order'
  })

  definePageMeta({
    middleware: ['authentication', 'order']
  })

  const isFirstItem = computed(() => {
    if(list.value.length > 0)
      return list.value[0].name != order.value.order_detail[0].name
  })

  const isLastItem = computed(() => {
    if(list.value.length > 0)
      return list.value[setting.value.displayNumber - 1].name != order.value.order_detail[order.value.order_detail.length - 1].name
  })

  const productGroupWidth = computed(() => {
    return setting.value.displayNumber * setting.value.productImageWidth
          + setting.value.columnGap * (setting.value.displayNumber - 1)
  })

  onBeforeMount(() => {
    responsiveTracker(this, true)

    window.addEventListener('resize', responsiveTracker)

    /* Check trường hợp số lượng product nhỏ hơn số lượng hiển thị */
    setListLength(setting.value.displayNumber)

    initiateList(setting.value.displayNumber)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', responsiveTracker)
  })

  const { url } = useAppConfig()

  const showItem = (type) => {
    switch (type) {
      case 'next':
        if(setting.value.productKey < order.value.order_detail.length - 1) {
          setting.value.transitionName = 'next'
          list.value.shift()
          list.value.push(order.value.order_detail[++setting.value.productKey])
        }
        break;
    
      default:
        if(setting.value.productKey > setting.value.displayNumber - 1) {
          setting.value.transitionName = 'prev'
          list.value.pop()
          list.value.unshift(order.value.order_detail[--setting.value.productKey - (setting.value.displayNumber - 1)])
        }
        break;
    }
  }

  const initiateList = (displayNumber) => {
    list.value = []

    setListLength(displayNumber)

    for (let i = 0; i < setting.value.displayNumber ; i++) {
      list.value[i] = order.value.order_detail[i]
    }

    setting.value.productKey = setting.value.displayNumber - 1
  }

  const responsiveTracker = (event, ini = false) => {
    if(window.innerWidth != iniWindowWidth || ini) {
      if(window.innerWidth >= 620)
        initiateList(4)
      else if(window.innerWidth < 620 && window.innerWidth >= 510)
        initiateList(3)
      else if(window.innerWidth < 510)
        initiateList(2)
    }
  }

  const setListLength = (newLength) => {
    setting.value.displayNumber = newLength < order.value.order_detail.length ? newLength : order.value.order_detail.length
  }
</script>
  
<style lang="scss">
  .jnv-order {
    display: flex;
    row-gap: 2.2rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: radial-gradient(circle at 2%, #204c2a, #365280);
    box-shadow: 0 0 10px #2e2e2e;
    margin-top: 3rem;

    .jnv-order__message {
      margin-top: 3rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      row-gap: 10px;

      .jnv-order__order-id {
        margin-top: 10px;
        display: flex;
        align-items: center;
        font-size: 13px;

        .jnv-order__order-id-value {
          text-transform: uppercase;
          color: #6dff77;
          margin-left: 5px;
          font-weight: 600;
        }
      }

      .jnv-order__view-order {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px 20px;
        margin-top: 15px;
        background: radial-gradient(#017d99, #0c403b);
        box-shadow: 0 0 10px #0c403b;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;

        &:hover {
          box-shadow: 0 0 10px #002a26;
          color: #ebb16c;
        }

        &:active {
          box-shadow: 0 0 10px #0c403b;
        }
      }

      .jnv-order__message--primary {
        font-size: 20px;
        text-transform: uppercase;
        font-weight: 700;
        color: #6dff77;
        text-shadow: 0 0 6px #5da963;
        text-align: center;
      }

      .jnv-order__message--secondary {
        font-size: 17px;
        font-weight: 500;
      }
    }

    .jnv-order__product-review {
      display: flex;
      align-items: center;
      column-gap: 20px;
      width: 100%;
      justify-content: center;
      background: linear-gradient(90deg, transparent, rgb(93 133 143 / 50%), transparent);
      padding: 15px 0;

      .jnv-order__slide_direction {
        display: flex;
        align-items: center;
        height: 77px;
        width: 15px;
        cursor: pointer;

        &:hover svg path {
          fill: #ff1818;
        }
      }

      .jnv-order__product-group {
        display: flex;
        justify-content: center;
        height: 77px;
        z-index: 1;

        .jnv-order__product-review-detail {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 10px #121212;
          user-select: none;

          .jnv-order__product-image {
            position: relative;
            display: flex;

            .jnv-order__product-quantity {
              position: absolute;
              background: white;
              color: black;
              font-size: 10px;
              height: 16px;
              width: 16px;
              border-radius: 999px;
              display: flex;
              justify-content: center;
              align-items: center;
              top: -8px;
              right: -8px;
              box-shadow: 0 0 10px #121212;
            }
          }

          .jnv-order__product-name {
            font-size: 11px;
            padding: 4px 0;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgb(55 126 70 / 60%);
          }
        }
      }
    }

    .jnv-order__order-placed-image {
      width: 100%;
      max-width: 500px;
      margin-bottom: 4rem;
      user-select: none;
    }
  }

  /* TRANSITION GROUP */
  .prev-move, .prev-enter-active, .prev-leave-active, .next-move, .next-enter-active, .next-leave-active {
    transition: all 0.5s ease;
  }

  .prev-enter-from, .prev-leave-to {
    opacity: 0;
    transform: translateX(-30px);
  }

  .next-enter-from, .next-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  /* Khi rời đi thu nhỏ lại */
  .prev-leave-to, .next-leave-to {
    transform: scale(0.7);
    z-index: -1;
  }

  .prev-leave-active, .next-leave-active {
    position: absolute;
  }
</style>