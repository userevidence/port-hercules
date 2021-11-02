<template>
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 27C22.0751 27 27 22.0751 27 16H32C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16H5C5 22.0751 9.92487 27 16 27Z" :fill='fill' />
        <path d="M19 16L26 0H21L15.8667 11.7333L14 8H9L13 16H19Z" :fill='fill' />
    </svg>
</template>
<script lang='ts'>
export default {
  props: {
    fill: {
      default: '#850AFF'
    }
  }
}
</script>
