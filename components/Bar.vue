<template lang='pug'>
.bar_chart
  .header
    .titles(v-if='content_asset.show_title && content_asset.show_question')
      h6 {{content_asset.question.the_question}}
      h2 {{content_asset.title}}
    .titles(v-else-if='content_asset.show_title')
      h2 {{content_asset.title}}
    .titles(v-else-if='content_asset.show_question')
      h2 {{content_asset.question.the_question}}
    .titles(v-else)
      
  BarGuts(:stats='stats' :total='content_asset.recipient_stats[0].count'  :color_scheme='colorScheme')

  .content_asset_footer
    .logo_and_ueid_container
      .logos_container
        .company_logo
          figure(v-html='content_asset.account.svg_logo_mark')
        .ue_logo
          Logo(:fill='fill')
      .ueid_container
        .url
          a(href='' :class='linkClass') uevi.co/{{content_asset.identifier}}
    .verification_text
      p Survey of {{content_asset.recipient_stats[0].count}} {{content_asset.account.name}} {{filterText}} users, conducted by UserEvidence. Data verified {{verifiedAt}}.

</template>
<script>
import BarGuts from './BarGuts.vue'
import Logo from './graphics/Logo.vue'
import dayjs from 'dayjs'

export default {
  name: 'Bar',
  props: ['content_asset', 'theme'],
  components: { BarGuts, Logo },
  data() {
    return {
      fill: '#3E5865',
    }
  },
  computed: {
    filterText() {
      if(this.content_asset.filtered_by.length > 0)
        return this.content_asset.filtered_by.join(', ')// + ' and ' + this.filters.slice(-1)[0].name
      else
        return
    },
    filters() {
      var filter = `${this.content_asset.filter}_stats`
      return this.content_asset[filter].filter(group  => this.content_asset.filter_data.includes(group.id))
    },
    stats() {
      // return this.content_asset.response_stats.sort((a, b) => b.count - a.count)
      return this.content_asset.response_stats
    },
    colorScheme() {
      return this.content_asset.color_scheme || 'purple'
    },
    verifiedAt() {
      if(this.content_asset.verified_at)
        return dayjs(this.content_asset.verified_at).format('MMMM D, YYYY')
      else
        return dayjs().format('MMMM D, YYYY')
    },
    linkClass() {
      return this.colorScheme + 'Text'
    },
  },
}
</script>
<style lang='sass' scoped>
  .bar_chart
    position: relative
    border-radius: 24px
    width: 100%
    margin: 0
    padding: 24px
    border: 1px solid hsl(200, 24%, 90%)
    background: white
    overflow: hidden
  .header
    .titles h2
      margin-bottom: 24px
    h2
      margin: 0
      padding: 0
      font-family: 'Inter-Regular', sans-serif
      font-weight: 400
      font-size: 16px
      line-height: 23px
      letter-spacing: -0.015em
      color: #131516
    h6
      margin: 0 0 16px 0
      font-size: 12px
      line-height: 16px
      display: flex
      align-items: center
      letter-spacing: -0.015em
      color: hsl(200, 8%, 8%)

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
        margin-left: 8px
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

  h6, .ueid_container .url a
    font-weight: 800
    font-family: 'Inter-Extrabold', sans-serif

</style>
