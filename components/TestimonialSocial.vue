<template lang='pug'>
.content_asset.testimonial_social
  .asset_page(v-for='page, i in content_asset.pages')
    .asset_contents
      .header
        figure(v-html='content_asset.account.svg_logo')
        a(:href='asset_url' target='_blank' :style='linkStyle(i)')
          Logo
          | {{asset_link}}
      .testimonial
        h2
          span(v-if='i == 0') "
          span(v-else) ...
          span(v-html='page')
          span(v-if='i+1 == content_asset.pages.length') "
          span(v-else) ...
      .footer
        .avatar(:style='horizontal_gradient')
          b-img(:src='content_asset.recipient.recipient_gravatar_url' v-if='content_asset.recipient.recipient_gravatar_url')
          AvatarIcon(v-else)
        .author_information(v-if='content_asset.recipient.named')
          h4 {{content_asset.recipient.person_attribution}}
          h6 {{content_asset.recipient.title}}
          h6 {{content_asset.recipient.best_company_name}}
        .author_information(v-else)
          h4 {{content_asset.recipient.person_attribution}}
          h6 {{content_asset.recipient.company_attribution}}
    .gradient(:style='vertical_gradient' v-if='i+1 == content_asset.pages.length')
    .arc1
      div(v-if='content_asset.pages.length > 1') {{pageIndicator(i)}}
    .arc2
      div(v-if='i+1 != content_asset.pages.length')
        RightArrowIcon
</template>
<script>
import Logo from './graphics/Logo'
import AvatarIcon from './graphics/AvatarIcon'
import RightArrowIcon from './graphics/RightArrowIcon'
import dayjs from 'dayjs'

export default {
  name: 'TestimonialSocial',
  props: ['content_asset'],
  components: { Logo, AvatarIcon, RightArrowIcon },
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
    horizontal_gradient() {
      return {
        background: `linear-gradient(90deg, ${this.content_asset?.account?.gradient_1}, ${this.content_asset?.account?.gradient_2})`,
      }
    },
    vertical_gradient() {
      return {
        background: `linear-gradient(180deg, ${this.content_asset?.account?.brand_color_1} 0%, hsla(200, 100%, 100%, 0) 100%)`,
        transform: 'matrix(1, 0, 0, -1, 0, 0)'
      }
    },
    pages() {
      content_asset_text.split(' ')
    },
    content_asset_text() {
      return this.content_asset.text || this.content_asset.survey_response.text_answer || ''
    },
  },
  methods: {
    pageIndicator(page) {
      return `${page + 1} / ${this.content_asset.pages.length}`
    },
    linkStyle(i) {
      if(this.content_asset.pages.length == 1 || i == this.content_asset.pages.length - 1)
        return Object.assign(this.horizontal_gradient, { color: 'white', border: '1px solid transparent' })
      else
        return { color: this.content_asset.account.brand_color_1 }
    },
    
  }
}
</script>
<style lang='sass' scoped>
.asset_page
  position: relative
  overflow: hidden
  background: white
  width: 360px
  height: 360px
  padding: 32px
  .asset_contents
    height: 100%
    display: flex
    flex-direction: column
    justify-content: space-between
  .header
    display: flex
    justify-content: space-between
    figure
      height: 24px
      margin: 0
      padding: 0
    a
      font-family: 'Inter-ExtraBold'
      font-size: 9px
      border-radius: 20px 0 0 20px
      border-top: 1px solid #ccc
      border-bottom: 1px solid #ccc
      border-left: 1px solid #ccc
      line-height: 1
      padding: 6px 32px 6px 6px
      display: flex
      align-items: center
      margin-right: -32px
    svg::v-deep
      width: 12px
      height: 12px
      margin-right: 12px
      path
        fill: #ffffff99 !important
  .footer
    z-index: 11
    display: flex
    height: 48px
    bottom: 32px
    left: 48px
    h4, h6
      color: hsl(200, 8%, 8%)
      font-family: 'Inter-Medium'
      letter-spacing: -0.02em
    h4
      font-size: 14px
      line-height: 16px
      margin-bottom: 4px
    h6
      font-size: 10px
      line-height: 12px
      letter-spacing: inherit
    .avatar
      margin-right: 12px
      display: flex
      align-items: center
      position: relative
      height: 48px
      width: 48px
      border-radius: 32px 32px 32px 0px
      img
        border-radius: 48px 48px 48px 0px
        width: 48px
      svg
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        ::v-deep path
          fill: hsla(200, 100%, 100%, 0.9) !important
  .gradient
    z-index: 10
    position: absolute
    width: 16px
    height: 100%
    top: 0
    right: 0
  .arc1, .arc2
    position: absolute
    z-index: 9
    width: 112px
    height: 112px
    border: 4px solid hsl(200, 24%, 96%)
    border-radius: 50%
    bottom: -56px
    div
      position: absolute
  .arc1
    left: -56px
    div
      top: 25px
      right: 20px
      font-size: 10px
  .arc2
    right: -56px
    div
      top: 20px
      left: 20px


  h2::v-deep
    dispay: inline-flex
    font-size: 18px
    line-height: 26px
    font-family: 'Inter-Regular'
    letter-spacing: -0.015em
    strong, b
      font-family: 'Inter-ExtraBold' !important
    span
      div
        display: inline
</style>
