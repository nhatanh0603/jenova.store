export default defineNuxtPlugin(() => {
  return {
    provide: {
      toDec: (number = 0, tenths = 1, accuracy = false) => {
        return accuracy ? parseFloat(parseFloat(number).toFixed(tenths)) : parseFloat(number).toFixed(tenths)
      },

      formatDateTime: (timeStamp) => {
        var dateRaw = new Date(timeStamp)

        var time = dateRaw.toLocaleTimeString()
        var day = dateRaw.getDate()
        var month = dateRaw.getMonth() + 1
        var year = dateRaw.getFullYear()

        return time + ', ' + day + '/' + month + '/' + year
      }
    }
  }
})