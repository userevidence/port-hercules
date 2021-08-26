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
        background: `linear-gradient(${this.content_asset?.account?.gradient_1}, ${this.content_asset?.account?.gradient_2})`,
      }
    },
    verified_at() {
      return dayjs(this.content_asset.verified_at).format('MMMM D, YYYY')
    },
  }
}
</script>
<style lang='sass' scoped>
  .customer_spotlight_card
    border-radius: 24px
    width: 100%
    margin: 0
    padding: 32px
  h2, h3, h4, h5, h6
    font-family: 'Inter', sans-serif
    color: white
    margin: 0
    padding: 0
    font-size: 20px
  h6
    line-height: 1
    font-size: 10px !important
    text-transform: uppercase
    font-weight: 800
    letter-spacing: 1.5px
    margin-bottom: 16px
    opacity: 0.8
  h2
    font-weight: 800
    text-shadow: 0px 1px 0px hsla(200, 8%, 8%, 0.16)
  h5
    line-height: 1
    font-size: 12px
    text-transform: none
    letter-spacing: 0
    margin-top: 16px
    font-weight: 700
    opacity: 0.75
</style>
