<template lang='html'>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 21H14" :stroke='brand_color_2' stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 19V23" :stroke='brand_color_2' stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M19 21H23" :stroke='brand_color_2' stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M21 19V23" :stroke='brand_color_2' stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M19 12H23" :stroke='brand_color_2' stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M21 10V14" :stroke='brand_color_2' stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M5 19H1V23H5V19Z" :stroke='brand_color_1' stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 10H10V14H14V10Z" :stroke='brand_color_1' stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 1H10V5H14V1Z" :stroke='brand_color_1' stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M5 1H1V5H5V1Z" :stroke='brand_color_1' stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M23 1H19V5H23V1Z" :stroke='brand_color_1' stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M5 10H1V14H5V10Z" :stroke='brand_color_1' stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>
<script lang='ts'>
export default {
  props: ['brand_color_1', 'brand_color_2'],
  mounted() {
    if(!this.brand_color_1 == null)
      this.brand_color_1 = '#850AFF'
    if(this.brand_color_2 == null)
      this.brand_color_2 = this.brand_color_1 + '50'
  }
}
</script>
<style lang='sass' scoped>
</style>
