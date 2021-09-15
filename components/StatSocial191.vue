<template lang='pug'>
.stat_social_191
  .header
    figure(v-html='content_asset.account.svg_logo')
    a(:href='asset_url' target='_blank' :style='horizontal_gradient')
      Logo
      | {{asset_link}}
  .statistic
    .mb-4(v-if='content_asset.stat_type == "star_rating"')
      StarIcons(:stars='headline')
    h1(v-else v-html='headline')
    h2(v-html='sentence')
  .gradient(:style='vertical_gradient')
  .arc1
  .arc2

</template>
<script>
import Logo from './graphics/Logo.vue'
import StarIcons from './graphics/StarIcons'
import AvatarIcon from './graphics/AvatarIcon.vue'
import dayjs from 'dayjs'

export default {
  name: 'StatlSocial191',
  props: ['content_asset', 'theme'],
  components: { Logo, AvatarIcon, StarIcons },
  computed: {
    testimonial_text() {
      return `"${this.content_asset.text}"`
    },
    asset_link() {
      return `uevi.co/${this.content_asset.identifier}`
    },
    asset_url() {
      return `https://${this.asset_link}`
    },
    headline() {
      return this.content_asset.headline || this.content_asset.rendered_headline
    },
    sentence() {
      return this.content_asset.sentence || this.content_asset.rendered_sentence
    },
    horizontal_gradient() {
      return {
        background: `linear-gradient(${this.content_asset?.account?.gradient_1}, ${this.content_asset?.account?.gradient_2})`,
      }
    },
    vertical_gradient() {
      return {
        background: `linear-gradient(180deg, ${this.content_asset?.account?.brand_color_1} 0%, hsla(200, 100%, 100%, 0) 100%)`,
        transform: 'matrix(1, 0, 0, -1, 0, 0)'
      }
    },
  }
}

</script>
<style lang='sass' scoped>
.stat_social_191
  background: white
  width: 616px
  height: 320px
  padding: 32px 0px
  position: relative
  overflow: hidden
  .gradient
    z-index: 10
    position: absolute
    width: 32px
    height: 100%
    top: 0
    right: 0
  .arc1, .arc2
    position: absolute
    z-index: 9
    width: 196px
    height: 196px
    border: 4px solid hsl(200, 24%, 96%)
    border-radius: 50%
    bottom: -104px
  .arc1
    left: -104px
  .arc2
    right: -104px
  .header
    z-index: 11
    padding-left: 48px
    display: flex
    justify-content: space-between
    align-items: center
    figure
      height: 24px
      margin: 0
      padding: 0
    a
      font-family: 'Inter-ExtraBold'
      font-size: 9px
      border-radius: 20px 0 0 20px
      line-height: 1
      padding: 6px 48px 6px 6px
      color: white
      display: flex
      align-items: center
      svg::v-deep
        width: 12px
        height: 12px
        margin-right: 12px
        path
          fill: hsla(0, 0%, 100%, 0.6) !important
  .statistic
    position: absolute
    top: calc(50% - 16px)
    transform: translateY(-50%)
    padding: 0 48px
    h2::v-deep
      dispay: inline-flex
      font-size: 18px
      line-height: 26px
      font-family: 'Inter-Regular'
      letter-spacing: -0.015em
      strong
        font-family: 'Inter-ExtraBold' !important
      span
        div
          display: inline
  .footer
    position: absolute
    z-index: 11
    display: flex
    height: 48px
    bottom: 32px
    left: 48px
    h4, h6
      color: hsl(200, 8%, 8%)
      font-family: 'Inter-Medium'
      letter-spacing: -0.02em
    .avatar
      margin-right: 12px
      height: 48px
      width: 48px
      border-radius: 32px 32px 32px 0px
      display: flex
      align-items: center
      position: relative
      svg
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        ::v-deep path
          fill: hsla(200, 100%, 100%, 0.5) !important
    h4
      font-size: 14px
      line-height: 16px
      margin-bottom: 4px
    h6
      font-size: 10px
      line-height: 12px
      letter-spacing: inherit
    
    .author_information
      display: flex
      flex-direction: column
      text-align: left
      justify-content: center
      h6:not(:last-child)
        margin-bottom: 4px


.stat_social_191
  background: white
  width: 616px
  height: 320px
  padding: 32px 0px
  position: relative
  overflow: hidden

  .content_asset_container
    background: white
    padding: 24px
    border: 1px solid hsl(200, 24%, 90%)
    border-radius: 24px
    display: flex
    flex-wrap: wrap

  .stat_header
    h2
      font-size: 30px
      line-height: 22px
      letter-spacing: -0.015em
      text-transform: capitalize
      color: #131516
      margin: 0px 2px 16px 0
    h3
      margin: 0
      padding: 0
      font-weight: 400
      font-size: 16px
      line-height: 23px
      letter-spacing: -0.015em
      color: #131516

  h2, .ueid_container .url a
    font-weight: 800
    font-family: 'Inter-Extrabold', sans-serif

  .content_asset_footer
    padding-top: 24px
    display: block
    width: 100%
    .logo_and_ueid_container
      width: 100%
      display: inline-flex
      align-items: center
      justify-content: space-between
    .logos_container
      width: 100%
      height: 16px
      display: flex
      align-items: center
      order: 1
      flex-grow: 0
      .company_logo
        width: 16px
        height: 16px
        margin-right: 8px
        &::after
          content: ''
          height: 16px
          width: 1px
          background-color: hsl(200, 24%, 90%)
          position: relative
          left: 8px
          display: inline-block
          top: 0
        img
          height: 16px
      .ue_logo
        width: 16px
        height: 16px
      .company_logo, .ue_logo
        display: flex
        align-items: center

    .ueid_container
      margin-left: auto
      text-align: right
      font-size: 10px
      line-height: 1
      order: 2
      flex-grow: 0
      .url a
        color: hsl(270, 100%, 52%)
        &:hover
          color: hsl(270, 100%, 24%)
          text-decoration: none
  .verification_text
    width: 100%
    margin-top: 12px
    display: inline-block
    p
      font-weight: 500
      font-family: 'Inter-Medium', sans-serif
      font-size: 10px
      line-height: 12px
      color: hsl(200, 12%, 40%)

</style>
