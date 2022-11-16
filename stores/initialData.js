export const useInitialDataStore = defineStore('initialData', () => {
  const initialDataStatus = reactive({
    all: false,
    authentication: false,
    locale: false
  })   

  let globalPending = ref(false)

  const globalNotification = reactive({
    type: 'success', // success, warning, danger
    show: false,
    content: ''
  })

  let autoFade = 0

  /* WATCHER */
  watch(initialDataStatus, (newValue) => {
    if(newValue.authentication && newValue.locale) {
      initialDataStatus.all = true
    }
  })

  watch(globalNotification, (newValue) => {
    if(newValue.show) {
      clearTimeout(autoFade)

      autoFade = setTimeout(() => {
        globalNotification.show = false
      }, 3000)
    }
  })
  
  return { initialDataStatus, globalPending, globalNotification }
})