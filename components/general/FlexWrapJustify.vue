<template>
  <div v-for="element in additionalElements" :style="'width: ' + elementWidth + 'px; opacity: 0;'"></div>
</template>
  
<script setup>
  const props = defineProps({
    elementWidth: {
      type: String,
      default: '130'
    },
    columnGap: {
      type: String,
      default: '25'
    },
    wrapperId: {
      type: String,
      default: ''
    },
    elementCount: {
      type: Number,
      default: 0
    },
    lazyLoad: {
      type: String,
      default: null
    }
  })

  const additionalElements = ref(0)
  const elementPerRow = ref(null)

  watch(() => props.lazyLoad, () => {
    if (props.lazyLoad == null)
      handleFlexWrapJustify()
  })

  onBeforeMount(() => {
    window.addEventListener('resize', handleFlexWrapJustify)
  })

  onMounted(() => {
    handleFlexWrapJustify()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleFlexWrapJustify)
  })

  const handleFlexWrapJustify = () => {
    var elPerRow = getElementPerRow()

    if (elPerRow != elementPerRow.value || elementPerRow.value == null || props.lazyLoad == null) {
      elementPerRow.value = elPerRow
      var remainder = props.elementCount % parseInt(elementPerRow.value)

      if(remainder > 0)
        additionalElements.value = parseInt(elementPerRow.value) - remainder
      else
        additionalElements.value = 0
    }
  }

  const getElementPerRow = () => {
    var el = document.getElementById(props.wrapperId)
    var preElPerRow = parseInt(el.offsetWidth / props.elementWidth)

    // vì offsetWidth chỉ lấy số nguyên nên sẽ làm tròn gây ra sai số 1 tí trong những break ví dụ khi từ 5 cột xuống 4 cột, nên phải thêm + 0.1
    var elementPerRow = (el.offsetWidth - (preElPerRow - 1) * parseInt(props.columnGap)) / (parseInt(props.elementWidth) + 0.1)

    return parseInt(elementPerRow)
  }
</script>