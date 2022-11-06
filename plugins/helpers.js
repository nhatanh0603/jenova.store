export default defineNuxtPlugin(() => {
  return {
    provide: {
      toDec: (number, tenths = 1) => {
        return parseFloat(number).toFixed(tenths)
      },
    }
  }
})