<template>
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M24 11.4285H21.2485C20.8396 11.4285 20.4718 11.1796 20.32 10.7999L16.9286 2.32118C16.5933 1.48303 15.4069 1.48302 15.0716 2.32116L11.68 10.7999C11.5282 11.1796 11.1604 11.4285 10.7515 11.4285H2.66145C1.73808 11.4285 1.30804 12.5731 2.00294 13.1811L8.65402 19.0008C8.95131 19.2609 9.0676 19.6717 8.95081 20.0491L6.05855 29.3941C5.7832 30.2838 6.76656 31.0337 7.55169 30.5328L15.4623 25.486C15.7903 25.2767 16.2099 25.2767 16.538 25.486L24 30.2467V23.121L23.0492 20.0491C22.9324 19.6717 23.0487 19.2609 23.346 19.0008L24 18.4285V11.4285Z" :fill='color1'/>
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