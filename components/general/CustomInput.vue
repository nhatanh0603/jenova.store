<template>
  <div class="jnv-input__radio-group" v-if="type == 'radio'" @click="$emit('update:modelValue', value)">
    <div :class="['jnv-input__radio', {'checked' : value == modelValue}]" :value="value"></div>

    <label class="jnv-input__label">{{ label }}</label>
  </div>

  <div :class="['jnv-input__group--style-default', {'style-two': customStyle == 'two'}]" v-else>
    <div class="jnv-input__group">
      <label class="jnv-input__label" :for="id">{{ label }}</label>
      <input :class="['jnv-input__input', {'error': error.length, 'jnv-password__padding': type == 'password'}]"
            :id="id" :type="type == 'password' ? (toggle ? 'text' : type) : type" :placeholder="placeholder"
            :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
      >

      <span class="jnv-input__toggle-text" v-if="type == 'password'" @click="toggle = !toggle">
        {{ toggle ? 'Hide' : 'Show' }}
      </span>
    </div>
    
    <div class="jnv-input__error" v-if="(error.length > 0)">{{ error }}</div>
  </div>
</template>
  
<script setup>
  defineProps({
    id: String,

    type: String,

    label: String,

    placeholder: String,

    error: {
      type: String,
      default: ''
    },

    value: String,

    customStyle: {
      type: String,
      default: 'default'
    },

    modelValue: String
  })

  defineEmits(['update:modelValue'])

  const toggle = ref(false)
</script>
  
<style lang="scss">
  $input-top-bot-padding: 6px;
  $input-height: 34px;
  $label-height: 30px;
  $label-width: 90px;

  .jnv-input__group--style-default {
    position: relative;
    width: 100%;
    max-width: 400px;

    .jnv-input__group {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .jnv-input__label {
        position: absolute;
        left: calc(($input-height - $label-height) / 2);
        height: $label-height;
        padding: 6px 12px;
        background: linear-gradient(126deg, #08724f, #0b8391);
        cursor: pointer;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px 999px 0 999px;
        width: $label-width;      
      }

      .jnv-input__input {
        width: 100%;
        height: $input-height;
        padding: $input-top-bot-padding 10px $input-top-bot-padding ($label-width + 10px);
        background: white;
        border: none;
        border-radius: 999px;

        &:focus {
          box-shadow: 0 0 7px white;
        }
      }

      .jnv-input__input.error {
        box-shadow: 0 0 7px #ff3131;
      }

      .jnv-password__padding {
        padding-right: 52px !important;
      }

      .jnv-input__toggle-text {
        position: absolute;
        z-index: 1;
        color: #9d9a9a;
        right: 12px;
        top: 40px;
        font-size: 11px;
        font-weight: 800;
        cursor: pointer;
      }
    }

    .jnv-input__error {
      margin-top: 5px;
      margin-left: 10px;
      color: #ff3131;
      font-size: 12.5px;
    }
  }

  .jnv-input__group--style-default.style-two {
    row-gap: 20px;

    .jnv-input__group {
      flex-direction: column;

      .jnv-input__label {
        position: unset;
        width: unset;
        border-radius: 18px 18px 0 0;
      }
      .jnv-input__input {
        padding: 6px 20px;
      }
    }
  }

  /* RADIO */
  .jnv-input__radio-group {
    display: flex;
    align-items: center;
    column-gap: 10px;
    padding: 7px 8px;
    border-radius: 99px;
    background: linear-gradient(126deg, #08724f, #0b8391);

    .jnv-input__radio {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 18px;
      height: 18px;
      background-color: white;
      border-radius: 99px;
      position: relative;
      cursor: pointer;

    }

    .jnv-input__radio.checked {
      &:after {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        background: linear-gradient(126deg, #08724f, #0b8391);
        border-radius: 99px;
      }
    }

    .jnv-input__label {
      font-weight: 700;
      cursor: pointer;
    }
  }
</style>