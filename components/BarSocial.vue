<template lang='pug'>
.bar_chart.bar_social_191.content_asset
  a.uevi(:href='asset_url' target='_blank' :style='horizontal_gradient')
    Logo
    | {{asset_link}}
  .header
    figure(v-html='content_asset.account.svg_logo')
  .caption {{content_asset.question.the_question}}
  BarGuts(:stats='content_asset.answer_stats' :total='content_asset.response_count' :gradient_1='content_asset.account.gradient_2' :gradient_2='content_asset.account.gradient_2')
</template>
<script>
import BarGuts from './BarGuts.vue'
import Logo from './graphics/Logo.vue'
import AvatarIcon from './graphics/AvatarIcon.vue'
import dayjs from 'dayjs'

export default {
  name: 'StatlSocial191',
  props: ['content_asset'],
  components: { BarGuts, Logo, AvatarIcon },
  computed: {
    testimonial_text() {
      return `"${this.content_asset.text}"`
    },
    asset_link() {
      return `uevi.co/${this.content_asset.identifier}`
    },
    asset_url() {
      return `https://${this.asset_link}`
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
