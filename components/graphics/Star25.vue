<template>
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 11.4286H2.66145C1.73808 11.4286 1.30804 12.5731 2.00294 13.1812L8 18.4286V11.4286ZM8 23.1212L6.05855 29.3942C5.7832 30.2838 6.76656 31.0338 7.55169 30.5329L8 30.2469V23.1212Z" :fill='color1'/>
  </svg>
</template>
<script lang='ts'>
export default {
  props: ['brand_color_1', 'brand_color_2'],
  computed: { 
    color1() {
      return this.brand_color_1 || '#FFD400'
    },
    color2() {
      return this.brand_color_2 || '#FFD40050'
    }
  }
}
</script>
<style lang='sass' scoped>
</style>