<template lang='pug'>
.bar_chart.content_asset
  .header
    .titles(v-if='content_asset.show_title && content_asset.show_question')
      h6 {{content_asset.question.the_question}}
      h2 {{content_asset.title}}
    .titles(v-else-if='content_asset.show_title')
      h2 {{content_asset.title}}
    .titles(v-else-if='content_asset.show_question')
      h2 {{content_asset.question.the_question}}
    .titles(v-else)
  .bars(:class='orientation')
    BarGuts(:stats='content_asset.response_stats' :total='content_asset.recipient_stats[0].count' :gradient_1='content_asset.account.gradient_2' :gradient_2='content_asset.account.gradient_2')
  AssetFooter(:content_asset='content_asset')
</template>
<script>
import BarGuts from './BarGuts.vue'
import AssetFooter from './AssetFooter.vue'

export default {
  name: 'Bar',
  props: ['content_asset', 'theme'],
  components: { BarGuts, AssetFooter },
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
      return this.content_asset.response_stats
    },
    orientation() {
      // we need to know the orientation here so we can fix the height 
      // (vertical) or not (horizontal)
      return Math.max(...this.stats.map((s) => s.the_answer.length), 0) > 10 ? 'horizontal' : 'vertical'
    },
    color_scheme() {
      return this.content_asset.color_scheme || 'purple'
    },
  },
}
</script>
<style lang='sass' scoped>
  .bars
    display: flex
    justify-content: center
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
  .bars
    .vertical
      height: 387px
</style>
