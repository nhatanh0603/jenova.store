import { useInitialDataStore } from "./initialData"

export const useNewsStore = defineStore('news', () => {
  const ini = useInitialDataStore()
  const news = ref({})
  const newsDetail = ref({})
  
  async function fetch (isLoading) {
    var url = news.value?.links?.next || '/news/whole'

    await useApi(url, {
      async onRequest() {
        isLoading.value = true
      },

      async onRequestError({ error }) {
        isLoading.value = false
        notification('danger', error)
      },

      async onResponse({ response }) {
        if(response.status == 200) {
          if(Object.keys(news.value).length == 0)
            news.value = response._data
          else {
            news.value.data.push(...response._data.data)
            news.value.links = response._data.links
            news.value.meta = response._data.meta
          }
          isLoading.value = false
        }
      },

      async onResponseError({ response }) {
        isLoading.value = false
        notification('danger', response._data.message)
      }
    })
  }

  async function fetchNewsDetail(slug, url) {
    await useApi('/news/' + slug, {
      async onRequest() {
        ini.globalPending = true
      },

      async onRequestError({ error }) {
        ini.globalPending = false
        notification('danger', error)
      },

      async onResponse({ response }) {
        if(response.status == 200) {
          newsDetail.value = response._data.data
          newsDetail.value.body = newsDetail.value.body.replace(/{JENOVA_NEWS_IMAGE}/g, url)
          ini.globalPending = false
        }
      },

      async onResponseError({ response }) {
        ini.globalPending = false

        if(response.status == 404)
          notification('warning', 'The page you requested could not be found.')
        else
          notification('danger', response._data.message)
      }
    })
  }

  return { news, newsDetail, fetch, fetchNewsDetail }
})