<template lang="pug">
  .content_asset.stat(v-if='content_asset')
    .asset-body
      .mb-4(v-if='content_asset.stat_type == "star_rating"')
        StarIcons(:stars='headline')
      h1(v-else v-html='headline')
      h3(v-html='sentence')
    .asset-footer
      .line1
        .logos
          .company_logo
            img(:src='content_asset.account.logo_url')
          .ue_logo
            Logo
        .ueid-container
          .ueid 
            | UEID: 
            span {{content_asset.identifier}}
          .url
            a(href='' :class='linkClass') uevi.co/{{content_asset.identifier}}
    .verification-text
      p Source: Survey of {{content_asset.recipient_count}} {{content_asset.account.name}} users, conducted by UserEvidence. Data verified {{verifiedDate}}.
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
  .content_asset
    font-family: 'Inter', sans-serif
    min-width: 480px
    background: white
    padding: 32px
    box-shadow: 0 -4px 8px hsla(200, 100%, 40%, .02) inset, 0 16px 40px hsla(200, 16%, 32%, .12), 0 1px 0 hsl(206, 23%, 94%)
    //border: 1px solid hsla(200, 100%, 40%, .12)
    border-radius: 24px

  .asset-body
    h1
      margin-bottom: 10px
    margin-bottom: 40px
  .line1
    display: flex
    justify-content: space-between
    margin-bottom: 35px
    .logos
      display: flex
    .company_logo
      max-width: 192px
      height: 24px
      padding-right: 10px
      margin-right: 10px
      border-right: 1px solid #ccc
      img
        max-width: 192px
        height: 24px
    .ue_logo svg
      width: 24px
      height: 24px
    .ueid-container
      text-align: right
      font-size: 10px
    .url, .ueid span
      font-family: 'Inter-ExtraBold'
  .verification-text p
    font-size: 9px
</style>
