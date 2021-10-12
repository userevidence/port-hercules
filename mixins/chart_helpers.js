// expects stats, color_scheme and total to be defined.

export default {
  computed: {
    short_chart() {
      return Math.max(...this.stats.map((stat) => Number(this.statPercent(stat.count)))) < 50
    },
    orientation() {
      return Math.max(...this.stats.map((s) => s.the_answer.length), 0) > 10 ? 'horizontal' : 'vertical'
    },
    shown_stats() { 
      return this.stats.filter(s => !s.exclude_from_asset)
    },
    max_percent() {
      return Math.max(...this.stats.map((stat) => Number(this.statPercent(stat.count))))
    },
    bar_class() {
      if(this.orientation == 'vertical') 
        return this.stats.length > 6 ? 'barx' : `bar${this.stats.length}`
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
    statClass(value) {
      return this.color_scheme + (9 - value)
    },
    showBar(stat) {
      return stat.count > 0 && !stat.exclude_from_asset 
    }
  }
}
