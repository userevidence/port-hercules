
<template lang='pug'>
.customer_spotlight_title.content_asset(:style='css_vars' :class='{ wide: wide }')
  .header
    p Full Report
    .arrow 
      LongArrow
    .uevi
      a(:href='asset_url' target='_blank')
        Logo
        | {{asset_link}}
  .title
    h2 {{content_asset.title}}
  .asset_type
    p Customer <br> Spotlight
    .avatar
      .icon
        CustomerSpotlightAvatarIcon
  .customer_logo
    div(v-html='content_asset.account.svg_logo_mark')
  .arc1
</template>
<script>
import Logo from './graphics/Logo'
import LongArrow from './graphics/LongArrow'
import CustomerSpotlightAvatarIcon from './graphics/CustomerSpotlightAvatarIcon.vue'

export default {
  name: 'CustomerSpotlighSocialTitle',
  props: ['content_asset', 'type'],
  components: { CustomerSpotlightAvatarIcon, Logo, LongArrow },
  computed: {
    wide() {
      return this.type == 'CustomerSpotlight191TitlePngVariant'
    },
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
  width: 360px !important
  height: 360px
  padding: 32px
  position: relative
  overflow: hidden
  background: white
  &.wide
    width: 624px !important
    .uevi
      width: 180px
    .arrow svg
      left: 0px
h2
  font-size: 22px
  line-height: 30px
  letter-spacing: -2%
.header
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: 12px
  .arrow
    margin-left: 5px
    margin-right: 5px
    position: relative
    flex-grow: 1
    height: 25px
    overflow: hidden
    svg
      position: absolute
      top: 7px
      left: -260px
      ::v-deep path
        fill: var(--brand-color-1)
        stroke: var(--brand-color-1)
  .uevi
    position: absolute
    top: 32px
    right: 0px
    width: 180px
    &::before
      position: absolute
      top: 0
      width: 400px
      height: 28px
      z-index: 1
      border-radius: 25px
      content: ''
      background-image: linear-gradient(to right, #f2f6f7 0%, #fff 100%)
    a
      display: block
      position: relative
      background: white
      border-radius: 15px
      width: 300px
      font-size: 10px !important
      padding: 4px
      margin-left: 2px
      margin-top: 2px

      font-family: 'Inter-ExtraBold'
      color: black
      font-size: 12px
      z-index: 3
      svg
        width: 15px
        height: 15px
        margin-right: 10px
.title
  height: 65%
  display: flex
  align-items: center
.asset_type
  display: flex
p
  font-size: 12px
.asset_type
  position: absolute
  bottom: 32px
  right: 32px
  p
    margin-right: 10px
.avatar
  position: relative
  &::before
    border-radius: 40px
    width: 42px
    height: 42px
    content: ''
    background-image: var(--avatar-gradient)
    bottom: -2px
    right: -2px
    position: absolute
    z-index: 1
  .icon
    position: relative
    border-radius: 50px
    padding: 6px
    z-index: 4
    background: white
    svg
      width: 25px
      height: 25px
      ::v-deep path
        fill: var(--brand-color-1)
.customer_logo
  z-index: 100
  position: absolute
  top: 288px
  ::v-deep svg
    width: 144px
    height: 144px
    path
      fill: var(--brand-color-1)
.arc1
  position: absolute
  width: 112px
  height: 112px
  border: 4px solid #f2f6f7
  border-radius: 150px
  bottom: -53px
  left: -53px
</style>
