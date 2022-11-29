import { useInitialDataStore } from '@/stores/initialData'

export const notification = (noti_type = 'success', content = '', show = true) => {
  const { globalNotification } = useInitialDataStore()

  globalNotification.show = show
  globalNotification.type = noti_type
  globalNotification.content = content
}