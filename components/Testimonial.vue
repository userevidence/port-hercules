<template lang="pug">
  .testimonial_container(:class='theme')
    .testimonial_card_header
      .titles
        h4(v-if='content_asset.show_title') {{content_asset.title}}
        h4(v-else-if='content_asset.show_question') {{content_asset.question.the_question}}
      h3(v-html='contentAssetText')
    .testimonial_card_body
      .testimonial_author_container
        figure.testimonial_card_avatar
          AvatarIcon
        .testimonial_author(v-if='content_asset.recipient.named')
          h4 {{content_asset.recipient.person_attribution}}
          h6 {{content_asset.recipient.title}}
          h6 {{content_asset.recipient.best_company_name}}
        .testimonial_author(v-else)
          h6 {{content_asset.recipient.title}}
          h6 {{content_asset.recipient.company_attribution}}
      .testimonial_nps_container(v-if='content_asset.show_nps')
        .nps_score {{content_asset.recipient.nps_score}}
        .nps_badge NPS
    .content_asset_footer
      .logo_and_ueid_container
        .logos_container
          .company_logo
            img(:src='content_asset.account.logo_url')
          .ue_logo
            Logo(:fill='fill')
        .ueid_container
          .url
            a(href='' :class='linkClass') uevi.co/{{content_asset.identifier}}
      .verification_text
        p Survey conducted by UserEvidence. Testimonial verified {{verifiedDate}}.
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
  *
    font-family: 'Inter', sans-serif

  .testimonial_container
    background: white
    padding: 24px
    border: 1px solid hsl(200, 24%, 90%)
    border-radius: 24px
    display: flex
    flex-wrap: wrap

  .testimonial_card_header
    position: relative
    width: 100%
    .titles
      h4
        margin: 0 0 16px 0
        font-size: 12px
        line-height: 16px
        display: flex
        align-items: center
        letter-spacing: -0.015em
        color: hsl(200, 8%, 8%)
    h3
      margin: 0
      padding: 0
      font-weight: 400
      font-size: 16px
      line-height: 23px
      letter-spacing: -0.015em
      color: #131516
      ::v-deep div
        display: inline

  .testimonial_card_body
    display: flex
    justify-content: space-between
    width: 100%
    align-items: center
    flex-direction: row
    margin: 0
    padding: 24px 0 0
    .testimonial_author h4, .testimonial_author h6
      font-weight: 500
      font-family: 'Inter-Medium', sans-serif
      letter-spacing: -0.02em
    .testimonial_author h4
      font-size: 14px
      line-height: 16px
      color: hsl(200, 8%, 8%)
      margin-bottom: 4px
    .testimonial_author h6
      font-size: 10px
      line-height: 12px
      color: hsl(200, 12%, 32%)
      &:not(:last-child)
        margin-bottom: 4px
  .testimonial_nps_container
    display: flex
    align-items: center
    flex-direction: column
    .nps_score
      font-size: 26px
      line-height: 20px
      margin-bottom: 8px
      color: hsl(200, 8%, 8%)
    .nps_badge
      background-color: hsl(200, 24%, 90%)
      color: hsl(200, 12%, 40%)
      font-size: 10px
      padding: 4px
      letter-spacing: 0.05em
      line-height: 8px
      text-transform: uppercase
      border-radius: 4px

  .testimonial_card_header h3 ::v-deep strong, .testimonial_card_header .titles h4, .testimonial_nps_container .nps_badge, .ueid_container .url a
    font-weight: 800
    font-family: 'Inter-Extrabold', sans-serif

  .testimonial_author_container
    display: flex
    align-items: center
    .testimonial_author
      min-height: 28px
      order: 2
      flex-direction: column
      margin-left: 8px
      padding: 0
    .testimonial_author, .testimonial_card_avatar
      display: inline-flex
    .testimonial_card_avatar
      width: 100%
      height: 100%
      min-width: 48px
      min-height: 48px
      max-width: 48px
      max-height: 48px
      margin: 0
      order: 1
      flex-grow: 0
      background: white
      border-radius: 50%
      border: 1px solid hsl(200, 24%, 90%)
      svg
        width: 24px
        height: 24px
        position: relative
        top: 11px
        left: 11px

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
