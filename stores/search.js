export const useSearchStore = defineStore('search', () => {
  const result = ref({})
  const loading = ref(false)
  const keyword = ref('')

  const reset = () => {
    result.value = {}
    keyword.value = ''
  }

  const fetch = async () => {
    if(keyword.value != '') {
      await useApi('/search/' + keyword.value, {
        async onRequest() {
          loading.value = true
        },

        async onRequestError({ error }) {
          loading.value = false
          notification('danger', error)
        },
  
        async onResponse({ response }) {
          if(response.status == 200) {
            loading.value = false
            result.value = response._data.data
          }
        },

        async onResponseError({ response }) {
          loading.value = false
          notification('danger', response._data)
        }
      })
    }
    if(keyword.value == '') {
      result.value = {}
    }
  }

  return { result, loading, keyword, reset, fetch }
})