<template lang='html'>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23 13H18C16.3431 13 15 11.6569 15 10V6C15 4.34315 16.3431 3 18 3H20C21.6569 3 23 4.34315 23 6V13Z" :stroke='brand_color_1' stroke-width="2" stroke-linecap="round"/>
    <path d="M15 21C15.6906 21 16.3608 21 17 21C20.3137 21 23 18.3137 23 15V9" :stroke='brand_color_1' stroke-width="2" stroke-linecap="round"/>
    <path d="M9 13H4C2.34315 13 1 11.6569 1 10V6C1 4.34315 2.34315 3 4 3H6C7.65685 3 9 4.34315 9 6V13Z" :stroke='brand_color_1' stroke-width="2" stroke-linecap="round"/>
    <path d="M1 21C1.6906 21 2.36076 21 3.00001 21C6.31371 21 9 18.3137 9 15V9" :stroke='brand_color_1' stroke-width="2" stroke-linecap="round"/>
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
