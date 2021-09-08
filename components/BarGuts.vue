<template lang='pug'>
  .bar_guts(:class='orientation')
    .chart(:class='orientation')
      .legend
        .legendy % of Users
      .bar_group(v-for='(stat, i) in stats' :class='barChartCount' v-if='showBar(stat)' )
        .channel
          .bar(:class='statClass(i)' :style='barSize(stat.count)')
            .stat 
              | {{statPercent(stat.count)}}
              span %
        .answer {{stat.the_answer}}
</template>

<script>
export default {
  props: {
    stats: {
      default: []
    },
    total: {
      type: Number,
      default: 0
    },
    color_scheme: {
      type: String,
      default: 'purple'
    }
  },
  computed: {
    shortChart() {
      return Math.max(...this.stats.map((stat) => Number(this.statPercent(stat.count)))) < 50
    },
    barChartCount() {
      if (this.stats.length > 6)
        return 'many_bars'
      else if (this.stats.length == 6)
        return 'six_bars'
      else if (this.stats.length == 5)
        return 'five_bars'
      else if (this.stats.length == 4)
        return 'four_bars'
      else if (this.stats.length == 3)
        return 'three_bars'
      else if (this.stats.length == 2)
        return 'two_bars'
      else if (this.stats.length == 1)
        return 'one_bar'
      else
        return
    },
    orientation() {
      return Math.max(...this.stats.map((s) => s.the_answer.length), 0) > 10 ? 'horizontal' : 'vertical'
    },
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
      return this.color_scheme + (9 - value)
    },
    showBar(stat) {
      return stat.count > 0 && !stat.exclude_from_asset 
    }
  }
}
</script>
<style lang='sass' scoped>
  .bar_guts
  .horizontal
    .chart
      .bar_group
        &:not(:last-child)
          margin-bottom: 16px
      .bar
        border-radius: 0 8px 8px 0
        padding: 0
        height: 40px
        color: white
        display: flex
        align-items: flex-end
        min-width: 48px
      .answer
        margin-top: 4px
      .stat
        left: 12px
    .legendy, .legendx
      display: none
      opacity: 0
      visibility: hidden
  .vertical
    .chart
      display: flex
      justify-content: space-between
      position: relative
      .many_bars
        width: 8%
      .six_bars
        width: 14%
      .five_bars
        width: 18%
      .four_bars
        width: 23%
      .three_bars
        width: 31%
      .two_bars
        width: 48%
      .one_bar
        width: 100%
      .bar_group
        display: flex
        flex-direction: column
        justify-content: flex-end
      .bar
        border-radius: 8px 8px 0px 0px
        padding: 0
        color: white
        display: flex
        justify-content: center
        align-items: flex-end
        height: 100%
        width: 100%
      .answer
        margin-top: 8px
        justify-content: center
    .legend
      position: absolute
      left: -42px
      top: 50%
      font-size: 12px
    .legendy
      transform:  rotate(-90deg)
    .legendx
      text-align: center
      margin-bottom: 20px
    .legend, .legendx, .legendy
      color: hsl(200, 16%, 44%)
      display: none
      opacity: 0
      visibility: hidden

  .vertical .chart .answer, .horizontal .chart .answer
    display: flex
    letter-spacing: -0.02em
    font-size: 12px
    line-height: 16px
    color: hsl(200, 8%, 8%)

  .stat
    font-size: 30px
    letter-spacing: -0.04em
    line-height: 1
    position: relative
    bottom: -4px
    text-shadow: 1px 0px 0 hsla(200, 8%, 8%, 0.5)
    span
      font-size: 14px
      letter-spacing: 0
      line-height: 1
      color: hsla(200, 100%, 100%, 0.8)
      position: relative
      left: 3px

  .vertical .chart .answer, .horizontal .chart .answer, .stat span, .legend, .legendx, .legendy
    font-weight: 500
    font-family: 'Inter-Medium', sans-serif

  .bar_guts, .bar_group, .stat
    font-weight: 800
    font-family: 'Inter-Extrabold', sans-serif

</style>
