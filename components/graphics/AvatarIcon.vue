<template lang='html'>
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M30 16C30 19.3137 27.3137 22 24 22C20.6863 22 18 19.3137 18 16C18 12.6863 20.6863 10 24 10C27.3137 10 30 12.6863 30 16ZM28 16C28 18.2091 26.2091 20 24 20C21.7909 20 20 18.2091 20 16C20 13.7909 21.7909 12 24 12C26.2091 12 28 13.7909 28 16Z" fill="#D6DDE1"/>
      <path d="M8 24C8 32.8366 15.1634 40 24 40C32.8366 40 40 32.8366 40 24H38C38 31.732 31.732 38 24 38C16.268 38 10 31.732 10 24H8Z" fill="#D6DDE1"/>
      <path d="M14.6769 31.5557C17.1525 29.3443 20.4193 28 24 28C27.5807 28 30.8475 29.3443 33.3231 31.5557C33.7458 31.0348 34.1257 30.4778 34.4574 29.8901C31.653 27.4661 27.9977 26 24 26C20.0023 26 16.347 27.4661 13.5426 29.8901C13.8743 30.4778 14.2542 31.0348 14.6769 31.5557Z" fill="#D6DDE1"/>
  </svg>
</template>
<script lang='ts'>
export default {
  props: ['brand_color_1'],
  computed: { 
    color1() {
      return this.brand_color_1 || '#850AFF'
    }
  }
}
</script>
<style lang='sass' scoped>
</style>
