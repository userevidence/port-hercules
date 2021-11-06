
<template lang='pug'>
.customer_spotlight11_title.content_asset(:style='css_vars')
  .header
    p Full Report
    .long_arrow 
      LongArrow
    .uevi
      a(:href='asset_url' target='_blank')
        Logo(:fill='content_asset.account.brand_color_1')
        | {{asset_link}}
  .title
    h2 Yellowbrick "Slashes Data Center Costs to a Fifth" and "Improves Query Performance by More Than 10x" for Medium-Sized Software Company
  .asset_type
    p Customer <br> Spotlight
    .avatar
      CustomerSpotlightAvatarIcon
  .customer_logo
    div(v-html='content_asset.account.svg_logo_mark')
</template>
<script>
import Logo from './graphics/Logo'
import LongArrow from './graphics/LongArrow'
import CustomerSpotlightAvatarIcon from './graphics/CustomerSpotlightAvatarIcon.vue'

export default {
  name: 'CustomerSpotlight11Title',
  props: ['content_asset'],
  components: { CustomerSpotlightAvatarIcon, Logo, LongArrow },
  computed: {
    asset_link() {
      return `uevi.co/${this.content_asset.identifier}`
    },
    asset_url() {
      return `https://${this.asset_link}`
    },
    css_vars() {
      return {
        '--brand-color-1': this.content_asset.account.brand_color_1,
        '--avatar-gradient': `linear-gradient(to right, #fff 30%, ${this.content_asset.account.brand_color_1} 100%)`
      }
    }
  },
}
</script>
<style lang='sass' scoped>
.content_asset
  width: 360px
  height: 360px
  border: 1px solid black
  padding: 32px
  position: relative
h2
  font-size: 22px
  line-height: 30px
  letter-spacing: -2%
.header
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: 12px
  .long_arrow
    margin-left: 5px
    margin-right: 5px
    position: relative
    flex-grow: 1
    height: 25px
    overflow: hidden
    svg
      position: absolute
      right: 0
      top: 6px
      ::v-deep path
        fill: var(--brand-color-1)
  .uevi
    background: white
    border-radius: 15px
    position: relative
    padding: 2px 0px 2px 7px
    box-sizing: border-box
    svg
      width: 15px
      height: 15px
      margin-right: 10px
    a
      background: white
      border-radius: 10px
      font-family: 'Inter-ExtraBold'
      color: black
      font-size: 12px
  .uevi::before
    border-radius: 25px
    content: ''
    background-image: linear-gradient(to right, #f2f6f7 0%, #fff 100%)
    top: -2px
    left: -2px
    bottom: -2px
    right: -2px
    position: absolute
    z-index: -1

.asset_type
  display: flex
p
  font-size: 12px
.asset_type
  position: absolute
  bottom: 20px
  right: 20px
  .avatar
    background: white
    border-radius: 50px
    position: relative
    padding: 6px
    box-sizing: border-box
    svg
      width: 25px
      height: 25px
      ::v-deep path
        fill: var(--brand-color-1)
  .avatar::before
    border-radius: 50px
    content: ''
    background-image: var(--avatar-gradient)
    top: -1px
    left: -1px
    bottom: -1px
    right: -1px
    position: absolute
    z-index: -1





    
.customer_logo
  position: absolute
  top: 288px
  ::v-deep svg
    width: 144px
    height: 144px
    path
      fill: var(--brand-color-1)
</style>
