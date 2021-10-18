<template lang='pug'>
  .bar_guts(:class='orientation')
    .legend
      .legendy % of Users
    .bar_group(v-for='(stat, i) in stats')
      .channel(:style='barSize(stat.count)')
        .bar(:style='bar_style')
          .stat 
            | {{statPercent(stat.count)}}
            span %
      .answer {{stat.the_answer}}
</template>

<script>
export default {
  props: {
    stats: { default: {} },
    total: { default: 0 },
    gradient_1: { default: 'hsl(270, 100%, 48%)' },
    gradient_2: { default: 'hsl(270, 100%, 40%)' },
  },
  computed: {
    short_chart() {
      return Math.max(...this.stats.map((stat) => Number(this.statPercent(stat.count)))) < 50
    },
    orientation() {
      return Math.max(...this.stats.map((s) => s.the_answer.length), 0) > 10 ? 'horizontal' : 'vertical'
    },
    max_percent() {
      return Math.max(...this.stats.map((stat) => Number(this.statPercent(stat.count))))
    },
    bar_class() {
      if(this.orientation == 'vertical') 
        return this.stats.length > 6 ? 'barx' : `bar${this.stats.length}`
    },
    bar_style() {
      return {
        background: `linear-gradient(180deg, ${this.gradient_1}, ${this.gradient_2})`,
      }
    },
  },
  methods: {
    statPercent(value) {
      return Math.round(value / this.total * 100)
    },
    barSize(value) {
      if(this.orientation == 'horizontal') {
        var width = this.statPercent(value)
        if(this.short_chart)
          width = Math.log10(Number(width))*50
        return 'width: ' + width + '%'
      }
        
      else {
        var height = Number(this.statPercent(value))
        return 'height: ' + height / this.max_percent * 100 + '%'
      }
    },
  }
}
</script>
<style lang='sass' scoped>
.bar_chart
  .bar_guts
    height: 100%
    width: 100%
    margin: 0 auto
  .horizontal
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
      width: 100%
    .stat
      left: 12px
    .legendy, .legendx
      display: none
  .vertical
    display: flex
    justify-content: space-between
    align-items: flex-end
    margin-left: -1%
    margin-right: -1%
    .bar_group
      display: flex
      flex-direction: column
      justify-content: flex-end
      width: 100%
      height: 100%
      margin-left: 1%
      margin-right: 1%
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
    left: -15px
    top: 50%
    font-size: 12px
  .legendy
    transform:  rotate(-90deg)
  .legendx
    text-align: center
    margin-bottom: 20px
  .legend, .legendx, .legendy
    color: hsl(200, 16%, 44%)

  .vertical .answer, .horizontal .answer
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
      left: 2px
  .bar3
    width: 80%
    .channel, .answer
      width: 90% !important
    
  .bar7 .stat, .bar8 .stat, .bar9 .stat
    bottom: -3px
    span
      font-size: 10px

  .bar7 .stat
    font-size: 20px
    span
      font-size: 12px

  .bar8 .stat
    font-size: 19px
    span
      font-size: 11px

  .bar9 .stat
    font-size: 18px

  .barx .stat
    bottom: -2px
    font-size: 16px
    span
      font-size: 9px

  .vertical .answer, .horizontal .answer, .stat span, .legend, .legendx, .legendy
    font-weight: 500
    font-family: 'Inter-Medium', sans-serif

  .bar_guts, .bar_group, .stat
    font-weight: 800
    font-family: 'Inter-Extrabold', sans-serif
</style>
