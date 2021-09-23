<template lang="pug">
  .content_asset_container(v-if='content_asset')
    .stat_header
      .mb-4(v-if='content_asset.stat_type == "star_rating"')
        StarIcons(:stars='headline' :account='content_asset.account')
      h2(v-else v-html='headline')
      h3(v-html='sentence')
    
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
        p Survey of {{content_asset.recipient_count}} {{content_asset.account.name}} users, conducted by UserEvidence. Statistic verified {{verifiedDate}}.

</template>
<script>
import Logo from './graphics/Logo.vue'
import StarIcons from './graphics/StarIcons'
import dayjs from 'dayjs'

export default {
  name: 'Stat',
  props: ['content_asset'],
  components: { StarIcons, Logo },
  computed: {
    verifiedDate() {
      return dayjs(this.verifiedAt).format('MM/D/YYYY')
    },
    colorScheme() {
      return this.content_asset.color_scheme || 'purple'
    },
    linkClass() {
      return this.colorScheme + 'Text'
    },
    headline() {
      return this.content_asset.headline || this.content_asset.rendered_headline
    },
    sentence() {
      return this.content_asset.sentence || this.content_asset.rendered_sentence
    },
  }
}
</script>
<style lang='sass' scoped>
  *
    font-family: 'Inter', sans-serif

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
