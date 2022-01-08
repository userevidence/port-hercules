<template lang='html'>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 11H6C7.65685 11 9 12.3431 9 14V18C9 19.6569 7.65685 21 6 21H4C2.34315 21 1 19.6569 1 18V11Z" :stroke='brand_color_1' stroke-width="2" stroke-linecap="round"/>
    <path d="M9 3C8.3094 3 7.63924 3 6.99999 3C3.68629 3 1 5.68629 1 9V15" :stroke='brand_color_1' stroke-width="2" stroke-linecap="round"/>
    <path d="M15 11H20C21.6569 11 23 12.3431 23 14V18C23 19.6569 21.6569 21 20 21H18C16.3431 21 15 19.6569 15 18V11Z" :stroke='brand_color_1' stroke-width="2" stroke-linecap="round"/>
    <path d="M23 3C22.3094 3 21.6392 3 21 3C17.6863 3 15 5.68629 15 9V15" :stroke='brand_color_1' stroke-width="2" stroke-linecap="round"/>
  </svg>
</template>
<script lang='ts'>
export default {
  props: ['brand_color_1'],
  mounted() {
    if(!this.brand_color_1 == null)
      this.brand_color_1 = '#850AFF'
  }
}
</script>
<style lang='sass' scoped>
</style>
