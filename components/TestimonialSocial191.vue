<template lang='pug'>
.testimonial_social_191.content_asset
  .header
    figure(v-html='content_asset.account.svg_logo')
    a(:href='asset_url' target='_blank' :style='horizontal_gradient')
      Logo
      | {{asset_link}}
  .testimonial
    h2
      span "
      span(v-html='content_asset_text')
      span "
  .footer
    .avatar(:style='horizontal_gradient')
      img(:src='content_asset.recipient.recipient_gravatar_url' v-if='content_asset.recipient.recipient_gravatar_url')
      AvatarIcon(v-else)
    .author_information(v-if='content_asset.recipient.named')
      h4 {{content_asset.recipient.person_attribution}}
      h6 {{content_asset.recipient.title}}
      h6 {{content_asset.recipient.best_company_name}}
    .author_information(v-else)
      h4 {{content_asset.recipient.person_attribution}}
      h6 {{content_asset.recipient.company_attribution}}
  .gradient(:style='vertical_gradient')
  .arc1
  .arc2
</template>
<script>
import Logo from './graphics/Logo.vue'
import AvatarIcon from './graphics/AvatarIcon.vue'
import dayjs from 'dayjs'

export default {
  name: 'TestimonialSocial191',
  props: ['content_asset', 'theme'],
  components: { Logo, AvatarIcon },
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
    content_asset_text() {
      return this.content_asset.text || this.content_asset.survey_response.text_answer || ''
    },
  }
}
</script>
<style lang='sass' scoped>
.testimonial_social_191
  background: white
  width: 616px
  padding: 32px 48px
  position: relative
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
    display: flex
    margin-bottom: 27px
    figure
      height: 24px
      margin: 0
      padding: 0
    a
      position: absolute
      right: 0
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
  .testimonial
    margin-bottom: 27px
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
    position: relative
    z-index: 11
    display: flex
    height: 48px
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
      img
        border-radius: 40px
        width: 48px
      svg
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        ::v-deep path
          fill: hsla(200, 100%, 100%, 0.9) !important
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

</style>
