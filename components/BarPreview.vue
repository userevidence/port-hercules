<template lang='pug'>
  .bar_preview(v-if='content_asset')
    .chart(:class='orientation')
      .bar-group(v-for='(stat, i) in stats')
        .channel
          .bar(:class='statClass(i)' :style='barSize(stat.count)')
</template>
<script>
export default {
  name: 'BarPreview',
  props: {
    color_scheme: {
      default: 'orange'
    },
    content_asset: {
      default: {},
      type: Object
    },
  },
  computed: {
    stats() {
      return this.content_asset.answer_stats.sort((a, b) => b.count - a.count )
    },
    shortChart() {
      return Math.max(...this.stats.map((stat) => Number(this.statPercent(stat.count)))) < 50
    },
    orientation() {
      return Math.max(...this.stats.map((s) => s.the_answer.length), 0) > 10 ? 'horizontal' : 'vertical'
    },
    total() {
      return this.stats.reduce((a,b) => a + b.count, 0)
    }
  },
  methods: {
    statPercent(value) {
      return Math.round(value / this.total * 100)
    },
    barSize(value) {
      if(this.orientation == 'horizontal') {
        var width = this.statPercent(value)
        if(this.shortChart)
          width = Math.log10(Number(width))*50
        return 'width: ' + width + '%'
      }
        
      else {
        var height = Number(this.statPercent(value))
        
        if(this.shortChart)
          height = height*3
        return 'height: ' + 300 * height / 100 + 'px'
        
      }
    },
    statClass(value) {
      var color = this.content_asset.state == 'initialized' ? 'light_grey' : this.color_scheme
      return this.color_scheme + (9 - value)
    },
    showBar(stat) {
      return stat.count > 0 && !stat.exclude_from_asset 
    }
  }
}
</script>
<style lang='sass' scoped>
.bar_preview
  position: relative
  border-radius: 24px
  width: 100%
  margin: 0
  padding: 24px
  border: 1px solid hsl(200, 24%, 90%)
  overflow: hidden
.horizontal
  .bar-group
    margin-bottom: 24px
  .channel
    background: #f2f6f7
    height: 32px
  .bar
    height: 100%
    border-radius: 0 10px 10px 0
.vertical
  display: flex
  justify-content: space-between
  width: 100%
  height: 360px
  &.chart
    padding: 20px
  .bar-group
    height: 100%
    display: flex
    flex-direction: column
    justify-content: flex-end
  .channel
    width: 44px
  .bar
    width: 100%
    border-radius: 10px 10px 0px 0px
</style>
