<template lang='html'>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 16H11" :stroke='color1' stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9 19H11" :stroke='color1' stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9 13H11" :stroke='color1' stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M19 19V9" :stroke='color1' stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M5 23H1V13H5" :stroke='color2' stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13 6V2L23 5V23H5V9H15V23" :stroke='color2' stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>
<script lang='ts'>
export default {
  props: ['brand_color_1', 'brand_color_2'],
  computed: { 
    color1() {
      return this.brand_color_1 || '#850AFF'
    },
    color2() {
      return this.brand_color_2 || '#850AFF50'
    }
  }
}
</script>
<style lang='sass' scoped>
</style>
