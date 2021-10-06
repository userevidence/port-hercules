<template lang='pug'>
.bar_social_191
  .header
    figure(v-html='content_asset.account.svg_logo')
    a(:href='asset_url' target='_blank')
      Logo
      | {{asset_link}}
  .bars
    BarGuts(:stats='stats' :total='content_asset.recipient_stats[0].count'  :color_scheme='colorScheme')
</template>
<script>
import Logo from './graphics/Logo.vue'
import AvatarIcon from './graphics/AvatarIcon.vue'
import BarGuts from './BarGuts.vue'
import dayjs from 'dayjs'

export default {
  name: 'StatlSocial191',
  props: ['content_asset'],
  components: { Logo, AvatarIcon, BarGuts },
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
    stats() {
      return this.content_asset.response_stats
    },
  }
}

</script>
<style lang='sass' scoped>
.bar_social_191
  background: white
  width: 520px
  height: 520px
  padding: 32px 0px
  position: relative
  overflow: hidden
  .header
    z-index: 11
    padding-left: 48px
    display: flex
    justify-content: space-between
    align-items: center
    figure
      height: 24px
      margin: 0
      padding: 0
    a
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
  .bars
    height: 100%
  .ueid_container .url a
    font-weight: 800
    font-family: 'Inter-Extrabold', sans-serif
</style>
