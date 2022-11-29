export const useInitialDataStore = defineStore('initialData', () => {
  let firstTimeAccess = ref(true)

  let globalPending = ref(false)

  const globalNotification = reactive({
    type: 'success', // success, warning, danger
    show: false,
    content: ''
  })

  let autoFade = 0

  /* WATCHER */
  watch(() => globalNotification.show, (newValue) => {
    if(newValue) {
      clearTimeout(autoFade)

      autoFade = setTimeout(() => {
        globalNotification.show = false
      }, 2000)
    }
  })
  
  return { globalPending, firstTimeAccess, globalNotification }
})