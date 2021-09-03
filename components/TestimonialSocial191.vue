<template lang='pug'>
.testimonial_social_191
  .header
    div(v-html='content_asset.account.svg_logo')
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
    div(v-if='content_asset.recipient.named')
      h4 {{content_asset.recipient.person_attribution}}
      h6 {{content_asset.recipient.title}}
      h6 {{content_asset.recipient.best_company_name}}
    div(v-else)
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
        background: `linear-gradient(${this.content_asset?.account?.gradient_1}, ${this.content_asset?.account?.gradient_2})`,
      }
    },
    content_asset_text() {
      return this.content_asset.text || this.content_asset.survey_response.text_answer || ''
    },
    vertical_gradient() {
      return {
        background: `linear-gradient(180deg, ${this.content_asset?.account?.gradient_2} 0%, rgba(255, 255, 255, 0) 100%)`,
        transform: 'matrix(1, 0, 0, -1, 0, 0)'
      }
    },
  }
}
</script>
<style lang='sass' scoped>
.testimonial_social_191
  background: white
  width: 616px
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
    background: red
  .arc1
    z-index: 10
    position: absolute
    bottom: -108px
    left: -108px
    width: 196px
    height: 196px
    border: 4px solid #F2F6F7
    border-radius: 150px
  .arc2
    z-index: 9
    position: absolute
    bottom: -108px
    right: -108px
    width: 196px
    height: 196px
    border: 4px solid #F2F6F7
    border-radius: 150px

  .header
    z-index: 11
    padding-left: 48px
    display: flex
    justify-content: space-between
    align-items: center
    margin-bottom: 27px
    a
      background: red
      border-radius: 20px 0 0 20px
      font-family: 'Inter-ExtraBold'
      font-size: 9px
      padding: 6px 48px 6px 6px
      color: white
      svg::v-deep
        width: 12px
        height: 12px
        margin-right: 12px
        path
          fill: #ffffff90 !important
  .testimonial
    padding: 0 48px
    margin-bottom: 27px
    h2::v-deep
      dispay: inline-flex
      font-family: 'Inter-Regular'
      strong
        font-family: 'Inter-ExtraBold' !important
      span
        div
          display: inline
  .footer
    position: relative
    z-index: 11
    padding: 0 48px
    display: flex
    color: rgba(19,20,21,1)
    align-items: center
    .avatar
      margin-right: 12px
      padding: 12px
      background: $uePurple
      border-radius: 27px 27px 27px 0px
      dispay: flex
      align-items: center
      svg::v-deep
        path
          fill: #ffffff90 !important
    h4
      font-family: 'Inter-Regular'
      font-size: 14px
      line-height: 12px
      margin-bottom: 8px
    h6
      font-family: 'Inter-Regular'
      font-size: 10px
      line-height: 8px
      letter-spacing: inherit
      margin-bottom: 8px
</style>
