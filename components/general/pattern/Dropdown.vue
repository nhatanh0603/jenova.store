<template>
  <div class="jnv-dropdown" ref="dropdown">
    <div class="jnv-dropdown__selector" @click="toggle = !toggle">
      <slot></slot>
      <Expand :type="!toggle ? 'more' : 'less'" class="jnv-dropdown__expand-icon" v-if="needExpand"/>
    </div>
    
    <Transition name="dropdown-transition">
      <div :class="preOpsClassName + 'option'" v-if="toggle">    
        <div :class="preOpsClassName + 'item-wrapper'">
          <div :class="preOpsClassName + 'item-container'">
              <div :class="preOpsClassName + 'item'" 
                    v-for="(value, key) in dropDownList" 
                    @click="selected(key)" 
                    :key="key">
                    {{ value }}
              </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import Expand from '../svg/Expand.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  needExpand: {
    type: Boolean,
    default: true
  },
  preOpsClassName: {
    type: String,
    default: 'jnv-dropdown__'
  },
  dropDownList: [Array, Object]
})

const emit = defineEmits(['itemSelected'])
const toggle = ref(false)
const dropdown = ref(null)

// Kiểm tra xem có click vào dropdown không?
function checkClickOnDropdown(event) {
  if(!dropdown.value.contains(event.target)) {
    toggle.value = false
  }
}

// Khi chọn item, gửi event ra cùng với custom value
function selected(value) {
  emit('itemSelected', value)
  toggle.value = false
}

onMounted(() => {
  window.addEventListener('click', checkClickOnDropdown)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', checkClickOnDropdown)
})
</script>