<template lang='pug'>
  .customer_spotlight_card(:style='card_style')
    h6 Customer Spotlight
    h2 {{content_asset.title}}
    h5 {{verified_at}}
</template>
<script>
import dayjs from 'dayjs'

export default {
  props: ['content_asset'],
  computed: {
    card_style() {
      return {
        //borderLeft: `4px solid ${this.content_asset?.account?.brand_color_1}`,
      }
    },
    verified_at() {
      return dayjs(this.content_asset.verified_at).format('MMMM D, YYYY')
    },
  }
}
</script>
<style lang='sass' scoped>
  *
    font-family: 'Inter', sans-serif

  .customer_spotlight_card
    position: relative
    border-radius: 24px
    width: 100%
    margin: 0
    padding: 24px 24px 24px 24px
    border: 1px solid hsl(200, 24%, 90%)
    overflow: hidden
    //&::before
      content: ''
      display: block
      position: absolute
      left: 24px
      top: 24px
      z-index: 10
      height: 12px
      width: 12px
      background-color: hsl(270, 100%, 52%)
      border-radius: 0 0 50% 50%
    h2, h6
      font-weight: 800
      font-family: 'Inter-Extrabold', sans-serif
  h2, h3, h4, h5, h6
    color: hsl(200, 8%, 8%)
    margin: 0
    padding: 0
    font-size: 20px
  h6
    line-height: 1
    font-size: 9px
    text-transform: uppercase
    letter-spacing: 1.5px
    //margin-left: 24px
    //margin-top: 1px 
    margin-bottom: 16px
    opacity: 0.75
    color: hsl(270, 100%, 52%)
  h2
    //text-shadow: 0px 1px 0px hsla(200, 8%, 8%, 0.16)
  h5
    line-height: 1
    font-size: 12px
    text-transform: none
    letter-spacing: 0
    margin-top: 16px
    font-weight: 500
    color: hsl(200, 12%, 40%)
</style>
