<template lang='pug'>
.bar_chart.variant-red
  .header
    .titles(v-if='content_asset.show_title && content_asset.show_question')
      h2 {{content_asset.title}}
      h6 {{content_asset.question.the_question}}
    .titles(v-else-if='content_asset.show_title')
      h2 {{content_asset.title}}
    .titles(v-else-if='content_asset.show_question')
      h2 {{content_asset.question.the_question}}
    .titles(v-else)
      
  BarGuts(:stats='stats' :total='content_asset.recipient_stats[0].count'  :color_scheme='colorScheme')
  //- .legendx &nbsp; 
  .footer
    .company_logo
      img(:src='content_asset.account.logo_url')
    .ue_logo
      Logo(:fill='fill')
    .ueid-container
      .ueid 
        | UEID: 
        span {{content_asset.identifier}}
      .url
        a(href='' :class='linkClass') uevi.co/{{content_asset.identifier}}
  .disclaimer Source: Survey of {{content_asset.recipient_stats[0].count}} {{content_asset.account.name}} {{filterText}} users, conducted by UserEvidence. Data verified {{verifiedAt}}.
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
    font-family: 'Inter-Black', sans-serif
    min-width: 480px
    max-width: 640px
    background: white
    padding: 32px
    // box-shadow: 0 -4px 8px hsla(200, 100%, 40%, .02) inset, 0 16px 40px hsla(200, 16%, 32%, .12), 0 1px 0 hsl(206, 23%, 94%)
    border: 1px solid hsl(200, 24%, 92%)
    border-radius: 24px
  .header
    font-family: 'Inter', sans-serif
    .titles
      margin-bottom: 24px
    h2
      color: hsl(200, 32%, 8%)
      font-weight: 800
      font-size: 20px
      line-height: 24px
      letter-spacing: -.25px
      transition: all 0.15s ease-in-out
    h6
      font-size: 14px
      line-height: 1.35
      font-weight: 600
      letter-spacing: -.25px
      color: hsl(200, 24%, 32%)
      margin-top: 4px
      transition: all 0.15s ease-in-out
  .share
    stroke: blue !important
    &:hover
      stroke: red !important
  .footer
    display: inline-flex
    margin-bottom: 16px
    width: 100%
    height: 24px
    align-items: center
    justify-content: space-between
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
      .ueid 
        font-family: 'Inter', sans-serif
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
  .disclaimer
    font-family: 'Inter', sans-serif
    font-size: 11px
    font-weight: 400
    line-height: 1.4
    color: hsl(200, 8%, 32%)
</style>

<!-- So I’ve been thinking that they will have a set aspect ratio (1:1, 4:3, 3:2, etc.) and that will shrink down to a minimum size
So on desktop we could have the element be able to expand to fill a larger area, always having a maximum and minimum width set

For minimum widths, let’s use the component sizes to guide those for now. For maximum, it’ll likely be dependent on the orientation of the bar graph (whether horizontal or vertical) but for now let’s say no more than 150% of the minimum width. So, the “Long Form Answer Bar Chart - Desktop” would be no wider than 1080px
2:44
The container (Currently, the white background box with drop shadows) will have a fixed equal padding of 32px for start (in the future, we can offer “small”, “medium”, “large” padding - or none, if they so choose) (edited) 
2:45
And then for the “Bar Chart - Mobile”, those should have minimum values set to the current designs, I’m not sure the maximum values will need to be much larger, I was thinking that those would function as essentially width: calc(100% - 64px); (edited)  -->
