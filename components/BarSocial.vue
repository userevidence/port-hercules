<template lang='pug'>
.bar_chart.bar_social_191
  a.uevi(:href='asset_url' target='_blank' :style='horizontal_gradient')
    Logo
    | {{asset_link}}
  .header
    figure(v-html='content_asset.account.svg_logo')
  .caption {{content_asset.question.the_question}}
  .bar_guts(:class='orientation')
    .legend
      .legendy % of Users
    .bar_group(v-for='(stat, i) in shown_stats')
      .channel(:style='barSize(stat.count)')
        .bar(:style='bar_style')
          .stat 
            | {{statPercent(stat.count)}}
            span %
      .answer {{stat.the_answer}}
</template>
<script>
import Logo from './graphics/Logo.vue'
import AvatarIcon from './graphics/AvatarIcon.vue'
import dayjs from 'dayjs'
import chart_helpers from '../mixins/chart_helpers'

export default {
  mixins: [ chart_helpers ],
  name: 'StatlSocial191',
  props: ['content_asset'],
  components: { Logo, AvatarIcon },
  computed: {
    stats() {
      return this.content_asset.response_stats
    },
    total() {
      return this.content_asset.recipient_stats[0].count
    },
    testimonial_text() {
      return `"${this.content_asset.text}"`
    },
    asset_link() {
      return `uevi.co/${this.content_asset.identifier}`
    },
    asset_url() {
      return `https://${this.asset_link}`
    },
    color_scheme() {
      return this.content_asset.color_scheme || 'purple'
    },
    bar_style() {
      return {
        background: `linear-gradient(180deg, ${this.content_asset?.account?.gradient_1}, ${this.content_asset?.account?.gradient_2})`,
      }
    },
    horizontal_gradient() {
      return {
        background: `linear-gradient(90deg, ${this.content_asset?.account?.gradient_1}, ${this.content_asset?.account?.gradient_2})`,
      }
    },
  }
}

</script>
<style lang='sass' scoped>
.bar_social_191
  background: white
  width: 520px
  height: 520px
  padding: 32px
  position: relative
  display: flex
  flex-direction: column
  justify-content: space-between
  a.uevi
    position: absolute
    right: 0
    font-family: 'Inter-ExtraBold'
    font-size: 9px
    border-radius: 20px 0 0 20px
    line-height: 1
    padding: 6px 48px 6px 6px
    color: white
    display: flex
    align-items: center
    svg::v-deep
      width: 12px
      height: 12px
      margin-right: 12px
      path
        fill: hsla(0, 0%, 100%, 0.6) !important
  .header
    display: flex
    justify-content: space-between
    align-items: center
    margin-bottom: 32px
    figure
      height: 24px
      margin: 0
      padding: 0
  .caption
    margin-bottom: 32px
  .bar_guts, .bar_group
    height: 300px
  
    
  
.ueid_container .url a
    font-weight: 800
    font-family: 'Inter-Extrabold', sans-serif
.legend .legendy
  font-family: 'Inter-ExtraBold'
</style>
