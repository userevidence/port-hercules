<template lang='pug'>
  .bar_guts(:class='orientation')
    .chart(:class='orientation')
      .legend
        .legendy % of Users
      .bar-group(v-for='(stat, i) in stats' :class='barChartCount' v-if='showBar(stat)' )
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
    font-family: 'Inter-Black', sans-serif
  .horizontal
    .chart
      .bar-group
        &:not(:last-child)
          margin-bottom: 16px
      .bar
        border-radius: 0 10px 10px 0
        padding: 0
        height: 40px
        color: white
        display: flex
        align-items: flex-end
        min-width: 48px
      .answer
        margin-top: 4px
      .stat
        font-feature-settings: 'cv01' on, 'salt' on
        font-style: normal
        font-weight: 900
        letter-spacing: -1.5px
        font-size: 28px
        line-height: 1
        position: relative
        bottom: -5px
        left: 14px
        text-shadow: 2px 0px 0 hsla(200, 8%, 8%, 0.2)
        font-size: 24px
        bottom: -3px
        span
          font-size: 16px
          position: relative
          left: 2px
    .legendy, .legendx
      display: none
  .vertical
    .chart
      display: flex
      justify-content: space-between
      // height: 260px
      position: relative
      .many_bars > .channel .bar
        border-radius: 11px 11px 0 0
        width: 64px
      .six_bars > .channel .bar
        border-radius: 12px 12px 0 0
        width: 72px
      .five_bars > .channel .bar
        border-radius: 13px 13px 0 0
        width: 80px
      .four_bars > .channel .bar
        border-radius: 14px 14px 0 0
        width: 88px
        margin: 0 24px
        .stat
          font-size: 28px
      .three_bars > .channel .bar
        border-radius: 15px 15px 0 0
        width: 96px
        margin: 0 32px
        .stat
          font-size: 32px
      .two_bars > .channel .bar
        border-radius: 16px 16px 0 0
        width: 104px
        margin: 0 40px
        .stat
          font-size: 34px
      .bar-group
        font-family: 'Inter-Black', sans-serif
        display: flex
        flex-direction: column
        justify-content: flex-end
      .bar
        border-radius: 18px 18px 0px 0px
        padding: 0
        color: white
        display: flex
        justify-content: center
        align-items: flex-end
        height: 100%
        width: 64px
      .stat
        font-feature-settings: 'cv01' on, 'salt' on
        font-style: normal
        font-weight: 900
        letter-spacing: -0.05em
        font-size: 1.4rem
        line-height: 0.8rem
        bottom: -1px
        position: relative
        span
          font-size: 14px
          margin-left: 2px
          font-family: 'Inter', sans-serif
          font-weight: 100
          opacity: 0.9
      .answer
        margin-top: 8px
        justify-content: center
    .legend
      position: absolute
      left: -52px
      top: 50%
      font-size: 14px
    .legendy
      font-family: 'Inter', sans-serif
      font-weight: 400
      transform:  rotate(-90deg)
    .legendx
      font-family: 'Inter', sans-serif
      text-align: center
      margin-bottom: 20px

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

  .vertical .chart .answer, .horizontal .chart .answer
    display: flex

    font-weight: 500
    font-family: 'Inter-Medium', sans-serif
    letter-spacing: -0.02em
    font-size: 12px
    line-height: 16px
    color: hsl(200, 8%, 8%)

  @media (max-width: 1024px)
    .vertical .chart
      .six_bars > .channel .bar
        width: 64px
        .stat
          font-size: 18px
      .five_bars > .channel .bar
        width: 72px
        .stat
          font-size: 20px
      .four_bars > .channel .bar
        margin: 0
      .three_bars > .channel .bar
        .stat
          font-size: 26px

</style>
