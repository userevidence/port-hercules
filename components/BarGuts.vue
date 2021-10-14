<template lang='pug'>
  .bar_guts(:class='[orientation, bar_class]')
    .legend
      .legendy % of Users
    .bar_group(v-for='(stat, i) in shown_stats')
      .channel(:style='barSize(stat.count)')
        .bar(:class='statClass(i)')
          .stat 
            | {{statPercent(stat.count)}}
            span %
      .answer {{stat.the_answer}}
</template>

<script>
import chart_helpers from '../mixins/chart_helpers'

export default {
  mixins: [ chart_helpers ],
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
  },
  methods: {
  }
}
</script>
<style lang='sass' scoped>
</style>
