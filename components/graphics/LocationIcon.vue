<template lang='html'>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" :stroke='brand_color_2' stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20 9C20 13.9 12 22 12 22C12 22 4 13.9 4 9C4 3.9 8.1 1 12 1C15.9 1 20 3.9 20 9Z" :stroke='brand_color_1' stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
