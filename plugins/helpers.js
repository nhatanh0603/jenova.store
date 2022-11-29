export default defineNuxtPlugin(() => {
  return {
    provide: {
      toDec: (number = 0, tenths = 1, accuracy = false) => {
        return accuracy ? parseFloat(parseFloat(number).toFixed(tenths)) : parseFloat(number).toFixed(tenths)
      },
    }
  }
})