export const useInitialDataStore = defineStore('initialData', () => {
  const initialDataStatus = reactive({
    all: false,
    authentication: false,
    locale: false
  })
  let globalPending = ref(false)

  watch(initialDataStatus, (newValue) => {
    if(newValue.authentication && newValue.locale) {
      initialDataStatus.all = true
    }
  })

  return { initialDataStatus, globalPending }
})