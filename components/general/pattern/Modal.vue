<template>
  <Teleport to="body">
    <Transition name="jnv-modal">
      <div class="jnv-modal__mask" @click="$emit('maskWasClicked')" v-if="show">
        <div class="jnv-modal__wrapper" :style="{ 'max-width': maxWidth + 'px' }" @click.stop>
          <div class="jnv-modal__close-wrapper" @click="$emit('close')">
            <Xmark fill="#78909C"/>
          </div>
          <div class="jnv-modal__container">
            <div class="jnv-modal__content">
              <slot></slot>
            </div>
          </div>      
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import Xmark from '../svg/Xmark.vue'
const props = defineProps({
  show: Boolean,
  maxWidth: Number,
})

const emit = defineEmits(['maskWasClicked', 'close'])
</script>

<style lang="scss">
@import './assets/css/variables.scss';

.jnv-modal__mask {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;

  .jnv-modal__wrapper {
    margin: auto;
    position: relative;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 0 10px 5px $jnv__shadow-color--almost-black;

    .jnv-modal__close-wrapper {
      width: 2.2rem;
      height: 2.2rem;
      position: absolute;
      align-self: flex-end;
      top: 0.5rem;
      right: 0.5rem;
      cursor: pointer;
      justify-content: center;
      display: flex;
      align-items: center;
      border-radius: 10px;  
      background-color: $jnv__icon-color--light-grey;

      &:hover {
        .jnv-svg__x-mark {
          fill: $jnv__color--red;
        }
      }
    }

    .jnv-modal__container {
      padding: 3rem 2rem;
      color: black;
      background-color: #fff;
      border-radius: 10px;

      .jnv-modal__content {
        overflow: auto;
        max-height: 90vh;
      }
    }
  }
}

//trạng thái bắt đầu của jnv-modal__mask
.jnv-modal-enter-from, .jnv-modal-leave-to {
  opacity: 0;

  //của jnv-modal__wrapper
  .jnv-modal__wrapper {
    transform: scale(1.2);
  }
}

.jnv-modal-enter-active, .jnv-modal-leave-active {
  //apply hiệu ứng cho jnv-modal__mask, do tag transition nằm ngoài jnv-modal__mask
  transition: opacity 0.3s ease;

  //apply hiệu ứng cho jnv-modal__wrapper
  .jnv-modal__wrapper {
    transition: transform 0.3s ease;
  }
}
</style>