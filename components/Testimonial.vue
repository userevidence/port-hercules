<template lang="pug">
  .testimonial_container(:class='theme')
    .testimonial_card_header
      .titles
        h4(v-if='content_asset.show_title') {{content_asset.title}}
        h4(v-else-if='content_asset.show_question') {{content_asset.question.the_question}}
      h3(v-html='content_asset_text')
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
    AssetFooter(:content_asset='content_asset')
</template>
<script>
import AvatarIcon from './graphics/AvatarIcon.vue'
import AssetFooter from './AssetFooter.vue'

export default {
  name: 'Testimonial',
  components: { AvatarIcon, AssetFooter },
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
    content_asset_text() {
      var asset_text = this.content_asset.text || this.content_asset.survey_response.text_answer || ''
      return '<span>"</span>' + asset_text + '<span>"</span>'
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

  h6
    margin: 0px
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

  .testimonial_card_header h3 ::v-deep strong, .testimonial_card_header .titles h4, .testimonial_nps_container .nps_badge
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
</style>
