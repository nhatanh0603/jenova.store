<template>
  <div class="jnv-user__cards" id="JnvUserCardWrapper" v-if="cards.length > 0">
    <SimpleCard :data="card" :position="index" v-for="card, index in cards" :key="index"
                @show-detail="showDetailCard"
    />

    <FlexWrapJustify element-width="130" :element-count="cards.length" wrapper-id="JnvUserCardWrapper" column-gap="25"/>
  </div>

  <CuteAstronaut :first-message="$t(localePath + 'not_found.first_message')" 
                :second-message="$t(localePath + 'not_found.second_message')"
                v-else
  />

  <Teleport to="body">
    <div class="jnv-detail-card__container" v-if="show" @click="closeCardDetail">
      <div class="jnv-detail-card__wrapper">
        <div class="jnv-detail-card__close" @click="show = false">
          <Xmark/>
        </div>

        <div :class="cardCollectionClass" ref="userCard">
          <div class="jnv-detail-card__direction" @click="direct('prev')" v-if="cards.length > 1">
            <Arrow type="left" fill="#fff"/>
          </div>

          <TransitionGroup name="card" tag="div" class="jnv-detail-card__content" v-if="cards.length > 1">
            <DetailCard :data="detailCard" :position="index"
                        v-for="(detailCard, index) in detailCards" :key="detailCard.id"
            />
          </TransitionGroup>

          <DetailCard :data="detailCards[1]" :position="1" v-else/>

          <div class="jnv-detail-card__direction" @click="direct('next')" v-if="cards.length > 1">
            <Arrow type="right" fill="#fff"/>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
  
<script setup>
  import SimpleCard from '@/components/general/user/SimpleCard.vue'
  import DetailCard from '@/components/general/user/DetailCard.vue'
  import CuteAstronaut from '@/components/general/CuteAstronaut.vue'
  import Xmark from '@/components/general/svg/Xmark.vue'
  import Arrow from '@/components/general/svg/Arrow.vue'
  import FlexWrapJustify from '@/components/general/FlexWrapJustify.vue'
  import { useInitialDataStore } from '@/stores/initialData'

  definePageMeta({
    layout: "account",
    middleware: 'authentication'
  })

  useHead({
    title: 'My Cards'
  })

  const localePath = 'content.page.account.card.'
  const cards = ref({})
  const detailCards = ref([])
  const show = ref(false)
  const cardWillBeDisplayed = ref(0)
  const userCard = ref(null)
  const cardCollectionClass = computed(() => {
    if(cards.value.length > 2)
      return 'jnv-detail-card__collection'
    else
      return 'jnv-detail-card__collection two-element-only'
  })

  onBeforeMount(() => {
    fetchUserOwnedCards()
  })

  const closeCardDetail = (e) => {
    if(e.target.contains(userCard.value))
      show.value = false
  }

  const fetchUserOwnedCards = async () => {
    await useApi('/auth/cards', {
      async onRequest() {
        useInitialDataStore().globalPending = true
      },

      async onRequestError({ error }) {
        useInitialDataStore().globalPending = false
        notification('danger', error)
      },

      async onResponse({ response }) {
        if(response.status == 200) {
          cards.value = response._data.data
          useInitialDataStore().globalPending = false
        }
      },

      async onResponseError({ response }) {
        useInitialDataStore().globalPending = false
        notification('danger', response)
      }
    })
  }

  const showDetailCard = (position) => {
    detailCards.value = []
    cardWillBeDisplayed.value = position

    if(cards.value.length > 2) {
      if(position > 0 && position < cards.value.length - 1)
        detailCards.value.push(cards.value[position - 1], cards.value[position], cards.value[position + 1])
      else if(position == 0)
        detailCards.value.push(cards.value[cards.value.length - 1], cards.value[position], cards.value[position + 1])
      else if(position == cards.value.length - 1)
        detailCards.value.push(cards.value[position - 1], cards.value[position], cards.value[0])
    }else {
      detailCards.value[1] = cards.value[position]

      if(cards.value[position - 1] != undefined)
        detailCards.value[0] = cards.value[position - 1]
      if(cards.value[position + 1] != undefined)
        detailCards.value[0] = cards.value[position + 1]
    }
    
    show.value = true
  }

  const direct = (type) => {
    if(cards.value.length > 2) {
      switch (type) {
        case 'next':        
            /* Nếu từ vị trí áp cuối bấm next => vị trí cuối => chạy ngược về đầu */
            if(cardWillBeDisplayed.value == cards.value.length - 1)
              cardWillBeDisplayed.value = 0 
            else
              cardWillBeDisplayed.value++

            var next = cardWillBeDisplayed.value + 1

            /* Nếu position ở vị trí cuối thì card tiếp theo trở về 0 */
            if(cardWillBeDisplayed.value == cards.value.length - 1)
              next = 0

            detailCards.value.shift()
            detailCards.value.push(cards.value[next])
          break;
      
        default:
          /* Nếu từ vị trí áp cuối bấm next => vị trí cuối => chạy ngược về đầu */
          if(cardWillBeDisplayed.value == 0)
            cardWillBeDisplayed.value = cards.value.length - 1
          else
            cardWillBeDisplayed.value--

          var prev = cardWillBeDisplayed.value - 1

          if(cardWillBeDisplayed.value == 0)
            prev = cards.value.length - 1

          detailCards.value.pop()
          detailCards.value.unshift(cards.value[prev])
          break;
      }
    } else {
      var temp = detailCards.value[0]
      detailCards.value[0] = detailCards.value[1]
      detailCards.value[1] = temp
    }
  }
</script>
  
<style lang="scss">
  .jnv-user__cards {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    gap: 25px;
  }

  /* ---------------------- DETAIL CARD CONTAINER  ----------------------*/
  .jnv-detail-card__container {
    position: fixed;
    top: 0;
    z-index: 69;
    background: rgb(0 0 0 / 0.9);
    width: 100%;
    height: 100vh;

    .jnv-detail-card__wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      height: 100%;

      .jnv-detail-card__close {
        position: absolute;
        z-index: 1;
        display: flex;
        top: 15px;
        right: 15px;
        padding: 8px;
        border-radius: 8px;
        background: rgb(255 255 255 / 20%);
        cursor: pointer;

        &:hover {
          background: rgb(255 0 0 / 50%);
        }
      }

      .jnv-detail-card__collection {
        height: fit-content;
        width: fit-content;
        position: relative;
        display: flex;
        align-items: center;

        .jnv-detail-card__direction {
          position: absolute;
          z-index: 10;
          display: flex;
          background: rgb(255 255 255 / 20%);
          padding: 15px;
          border-radius: 999px;
          cursor: pointer;

          &:hover {
            background: rgb(0 255 31 / 35%);
          }

          &:first-child {
            left: -40px;
            //left: calc((100vw - 940px) / 2);
          }

          &:last-child {
            right: -40px;
            //right: calc((100vw - 940px) / 2);
          }
        }

        .jnv-detail-card__content {
          display: flex;
          justify-content: center;
          align-items: center;
          column-gap: 25px;
          width: 100%;
          height: 100%;
          position: relative;
        }
      }
    }
  }

  .jnv-detail-card__collection.two-element-only {
    .jnv-detail-card__direction {
      &:first-child {
        left: -40px !important;
      }

      &:last-child {
        right: -60px !important;
      }
    }
  }

  @media screen and (max-width: 700px) {
    .jnv-detail-card__collection.two-element-only {
      .jnv-detail-card__content {
        .jnv-detail-card.disable {
          position: absolute;
          right: 270px;
        }
      }

      .jnv-detail-card__direction {
        &:first-child {
          left: calc((275px - 100vw) / 2) !important;
        }

        &:last-child {
          right: calc((275px - 100vw) / 2) !important;
        }
      }
    }
  }

  /* @media screen and (max-width: 722px) and (min-width: 701px) {
    .jnv-detail-card__container .jnv-detail-card__collection.two-element-only {
      .jnv-detail-card__direction {
        &:first-child {
          left: calc((560px - 100vw) / 2) !important;
        }

        &:last-child {
          right: calc((560px - 100vw) / 2) !important;
        }
      }
    }
  } */

  @media screen and (max-width: 1000px) {
    .jnv-detail-card__container {
      .jnv-detail-card__direction {
        &:first-child {
          left: calc((850px - 100vw) / 2) !important;
        }

        &:last-child {
          right: calc((850px - 100vw) / 2) !important;
        }
      }
    }
  }

  .card-move, .card-enter-active, .card-leave-active {
    transition: all 1s ease;
  }

  .card-enter-from, .card-leave-to {
    opacity: 0;
    transform: scale(0.5) !important;
    z-index: -2 !important;
  }

  .card-leave-from {
    z-index: -2 !important;
  }

  .card-leave-active {
    position: absolute;
  }
</style>