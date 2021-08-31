<template lang="pug">
  .testimonial_container(:class='theme')
    .testimonial-card-header
      .titles
        h4(v-if='content_asset.show_title') {{content_asset.title}}
        h4(v-else-if='content_asset.show_question') {{content_asset.question.the_question}}
        h4(v-else)

      h3(v-html='contentAssetText')
    .testimonial-card-body
      .testimonial-author-container
        .testimonial-card-avatar
          AvatarIcon
        .testimonial-author
          h4 {{content_asset.recipient.person_attribution}}
          h6 {{content_asset.recipient.company_attribution}}
      .testimonial-nps-container(v-if='content_asset.show_nps')
        .nps-score {{content_asset.recipient.nps_score}}
        .nps-badge NPS
    .testimonial-card-footer
      .testimonial-logo-and-ueid-container
        .testimonial-card-footer-logos-container
          .company_logo
            img(:src='content_asset.account.logo_url')
          .ue_logo
            Logo(:fill='fill')
        .ueid-container
          .url
            a(href='' :class='linkClass') uevi.co/{{content_asset.identifier}}
    .verification-text
      p Survey conducted by UserEvidence.  Testimonial verified {{verifiedDate}}.
</template>
<script>
import Logo from './graphics/Logo.vue'
import AvatarIcon from './graphics/AvatarIcon.vue'
import dayjs from 'dayjs'

export default {
  name: 'Testimonial',
  components: { AvatarIcon, Logo },
  props: ['content_asset', 'theme'],
  computed: {
    fill() {
      return this.theme == 'dark' ? 'white' : '#3a22ff'
    },
    recipient() {
      return this.content_asset?.recipient
    },
    company() {
      return this.recipient?.company
    },
    contentAssetText() {
      var asset_text = this.content_asset.text || this.content_asset.survey_response.text_answer || ''
      return '<span>"</span>' + asset_text + '<span>"</span>'
    },
    verifiedDate() {
      return dayjs(this.verifiedAt).format('MM/D/YYYY')
    },
    colorScheme() {
      return this.content_asset.color_scheme || 'purple'
    },
    verifiedAt() {
      return this.content_asset.verified_at || new Date()
    },
    linkClass() {
      return this.colorScheme + 'Text'
    },
  },
}
</script>
<style lang='sass' scoped>
  .dark
    background-color: #232323 !important
    color: white
    h4
      color: white !important
  
  .nps-score, .testimonial-author h4, .testimonial-author h6, .testimonial-card-avatar, .testimonial-card-footer p, .testimonial-card-header
    margin: 0
    padding: 0
    color: hsl(200, 12%, 8%)

  .testimonial_container
    font-family: 'Inter-Regular', sans-serif
    min-width: 480px
    background: white
    padding: 32px
    // box-shadow: 0 -4px 8px hsla(200, 100%, 40%, .02) inset, 0 16px 40px hsla(200, 16%, 32%, .12), 0 1px 0 hsl(206, 23%, 94%)
    border: 1px solid hsla(200, 100%, 40%, .12)
    border-radius: 24px
    
    display: flex
    flex-wrap: wrap
  
  .testimonial-card-header
    position: relative
    width: 100%
    .titles
      margin-bottom: -48px
      min-height: 0
    h3
      margin: 0
      padding: 0
      font-family: Inter
      font-style: normal
      font-weight: normal
      font-size: 16px
      line-height: 23px
      letter-spacing: -0.015em
      font-feature-settings: 'salt' on
      color: #131516
      ::v-deep strong
        font-family: 'Inter-Extrabold'
        font-weight: 800
      ::v-deep div
        display: inline
    .titles h4
      margin: 0 24px 80px 0
      font-family: Inter
      font-style: normal
      font-weight: 800
      font-size: 12px
      line-height: 16px
      display: flex
      align-items: center
      letter-spacing: -0.015em
      font-feature-settings: 'salt' on
      color: hsl(200, 8%, 8%)

  .testimonial-card-body
    display: flex
    justify-content: space-between
    color: hsl(200, 16%, 64%)
    width: 100%
    align-items: center
    flex-direction: row
    margin: 0
    padding: 24px 0 32px
    h4
      font-size: 14px
      line-height: 1.63
      font-weight: 700
    h6
      font-size: 12px
      line-height: 1.3
      font-weight: 600
      letter-spacing: -.1px
    .testimonial-author h4, .testimonial-author h6
      line-height: 1  
    .testimonial-author h4
      font-family: Inter
      font-style: normal
      font-weight: 500
      font-size: 14px
      line-height: 16px
      letter-spacing: -0.02em
      font-feature-settings: 'salt' on
      color: hsl(200, 8%, 8%)
    .testimonial-author h4
      font-family: Inter
      font-style: normal
      font-weight: 500
      font-size: 10px
      line-height: 12px
      letter-spacing: -0.02em
      font-feature-settings: 'salt' on
      color: HSL(200, 12%, 32%)
  .testimonial-nps-container
    display: flex
    align-items: center
    .nps-score
      font-family: 'Inter-Regular'
      font-size: 33px
      line-height: 1
      margin-right: 8px
    .nps-badge
      background-color: hsl(200, 24%, 92%)
      color: hsl(200, 12%, 36%)
      font-size: 10px
      padding: 3px 5px
      font-weight: 800
      letter-spacing: 1px
      line-height: 1
      text-transform: uppercase
      border-radius: 4px

  .testimonial-author-container
    display: flex
    align-items: center
    .testimonial-card-avatar
      order: 1
      flex-grow: 0
      background: hsl(204, 24%, 96%)
      border-radius: 50%
    .testimonial-author
      min-height: 36px
      order: 2
      flex-direction: column
      margin-left: 12px
      padding: 0
      justify-content: space-between
    .testimonial-author, .testimonial-card-avatar
      display: inline-flex
    .testimonial-card-avatar, .testimonial-card-avatar img, .testimonial-card-avatar svg
      width: 48px
      height: 48px
  
  .testimonial-card-footer, .testimonial-logo-and-ueid-container
    display: inline-flex
    width: 100%
    align-items: center
    justify-content: space-between

  .testimonial-card-footer
    .testimonial-card-footer-logos-container
      width: 100%
      height: 24px
      display: flex
      align-items: center
      order: 1
      flex-grow: 0
      .company_logo
        max-width: 192px
        height: 24px
        margin-right: 8px
        &::after
          content: ''
          height: 16px
          width: 1px
          background-color: hsl(200, 16%, 88%)
          position: relative
          left: 8px
          display: inline-block
          top: 0
        img
          height: 24px
      .ue_logo
        width: 120px
      .company_logo, .ue_logo
        display: flex
        align-items: center
      svg
        justify-content: center
        align-items: center
        max-height: 24px
        width: 120px
        padding-left: 12px
        margin-top: auto

    .ueid-container
      margin-left: auto
      text-align: right
      font-size: 10px
      line-height: 1
      order: 2
      flex-grow: 0
      .ueid 
        font-family: 'Inter-Regular', sans-serif
        font-weight: 400
        margin-bottom: 4px
        span
          font-weight: 800
      .url a
        color: hsl(270, 100%, 52%) !important
        font-family: 'Inter-Black', sans-serif
        &:hover
          color: hsl(270, 100%, 24%) !important
          text-decoration: none !important
  .verification-text
    width: 100%
    margin-top: 16px
    p
      font-family: Inter
      font-style: normal
      font-weight: 500
      font-size: 9px
      line-height: 12px
      letter-spacing: -0.02em
      font-feature-settings: 'salt' on
      color: HSL(200, 12%, 40%)
</style>
