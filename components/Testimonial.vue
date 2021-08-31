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
  .testimonial_container
    background: white
    padding: 24px
    border: 1px solid hsl(200, 24%, 90%)
    border-radius: 24px
    display: flex
    flex-wrap: wrap

  .testimonial-card-header
    position: relative
    width: 100%
    .titles
      margin-bottom: -48px
      min-height: 0
      //display: none
      //visibility: hidden
      //opacity: 0
    h3
      margin: 0
      padding: 0
      font-weight: normal
      font-size: 16px
      line-height: 23px
      letter-spacing: -0.015em
      color: #131516
      ::v-deep strong
        font-family: 'Inter-Extrabold'
        font-weight: 800
      ::v-deep div
        display: inline
    .titles h4
      margin: 0 24px 72px 0
      font-weight: 800
      font-size: 12px
      line-height: 16px
      display: flex
      align-items: center
      letter-spacing: -0.015em
      color: hsl(200, 8%, 8%)

  .testimonial-card-body
    display: flex
    justify-content: space-between
    width: 100%
    align-items: center
    flex-direction: row
    margin: 0
    padding: 24px 0 0
    .testimonial-author h4
      font-weight: 500
      font-size: 14px
      line-height: 16px
      letter-spacing: -0.02em
      color: hsl(200, 8%, 8%)
    .testimonial-author h6
      font-weight: 500
      font-size: 10px
      line-height: 12px
      letter-spacing: -0.02em
      color: HSL(200, 12%, 32%)
  .testimonial-nps-container
    display: flex
    align-items: center
    flex-direction: column
    .nps-score
      font-size: 26px
      line-height: 20px
      margin-bottom: 8px
      color: hsl(200, 8%, 8%)
    .nps-badge
      background-color: hsl(200, 24%, 90%)
      color: hsl(200, 12%, 40%)
      font-size: 10px
      padding: 4px
      font-weight: 800
      letter-spacing: 5%
      line-height: 8px
      text-transform: uppercase
      border-radius: 4px

  .testimonial-author-container
    display: flex
    align-items: center
    .testimonial-card-avatar
      order: 1
      flex-grow: 0
      background: white
      border-radius: 50%
      border: 1px solid hsla(20, 100%, 50%, 0.25)
    .testimonial-author
      min-height: 36px
      order: 2
      flex-direction: column
      margin-left: 12px
      padding: 0
      justify-content: space-between
    .testimonial-author, .testimonial-card-avatar
      display: inline-flex
    .testimonial-card-avatar
      width: 100%
      height: 100%
      min-width: 48px
      min-height: 48px
      max-width: 48px
      max-height: 48px
    .testimonial-card-avatar svg
      width: 24px
      height: 24px
      position: relative
      top: 11px
      left: 11px

  
  .testimonial-logo-and-ueid-container
    width: 100%
    display: inline-flex
    align-items: center
    justify-content: space-between

  .testimonial-card-footer
    padding-top: 24px
    display: block
    width: 100%
    //display: none
    //visibility: hidden
    //opacity: 0
    .testimonial-card-footer-logos-container
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
        color: hsl(270, 100%, 52%)
        font-family: 'Inter-Black', sans-serif
        &:hover
          color: hsl(270, 100%, 24%)
          text-decoration: none
  .verification-text
    width: 100%
    margin-top: 12px
    display: inline-block
    p
      font-weight: 500
      font-size: 9px
      line-height: 12px
      letter-spacing: -2%
      color: hsl(200, 12%, 40%)
</style>
