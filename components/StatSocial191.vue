<template lang='pug'>
.stat_social_191
  .header
    figure(v-html='content_asset.account.svg_logo')
    a(:href='asset_url' target='_blank' :style='horizontal_gradient')
      Logo
      | {{asset_link}}
  .statistic
    .star_container(v-if='content_asset.stat_type == "star_rating"')
      StarIcons(:stars='headline')
    h2(v-else v-html='headline')
    h3(v-html='sentence')
  .gradient(:style='vertical_gradient')
  .arc1
  .arc2

</template>
<script>
import Logo from './graphics/Logo.vue'
import StarIcons from './graphics/StarIcons'
import AvatarIcon from './graphics/AvatarIcon.vue'
import dayjs from 'dayjs'

export default {
  name: 'StatlSocial191',
  props: ['content_asset', 'theme'],
  components: { Logo, AvatarIcon, StarIcons },
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
    headline() {
      return this.content_asset.headline || this.content_asset.rendered_headline
    },
    sentence() {
      return this.content_asset.sentence || this.content_asset.rendered_sentence
    },
    horizontal_gradient() {
      return {
        background: `linear-gradient(90deg, ${this.content_asset?.account?.gradient_1}, ${this.content_asset?.account?.gradient_2})`,
      }
    },
    vertical_gradient() {
      return {
        background: `linear-gradient(180deg, ${this.content_asset?.account?.brand_color_1} 0%, hsla(200, 100%, 100%, 0) 100%)`,
        transform: 'matrix(1, 0, 0, -1, 0, 0)'
      }
    },
  }
}

</script>
<style lang='sass' scoped>
.stat_social_191
  background: white
  width: 616px
  height: 320px
  padding: 32px 0px
  position: relative
  overflow: hidden
  .gradient
    z-index: 10
    position: absolute
    width: 32px
    height: 100%
    top: 0
    right: 0
  .arc1, .arc2
    position: absolute
    z-index: 9
    width: 196px
    height: 196px
    border: 4px solid hsl(200, 24%, 96%)
    border-radius: 50%
    bottom: -104px
  .arc1
    left: -104px
  .arc2
    right: -104px
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
  .statistic
    position: absolute
    top: calc(50% + 32px)
    transform: translateY(-50%)
    padding: 0 48px
    z-index: 10
    h2
      font-size: 44px
      line-height: 36px
      font-weight: 800
      font-family: 'Inter-ExtraBold'
      letter-spacing: -.035em
      margin-bottom: 16px
    h3::v-deep
      font-size: 22px
      line-height: 30px
      font-family: 'Inter-Regular'
      color: hsl(200, 16%, 16%)
      letter-spacing: -0.015em
      strong
        font-family: 'Inter-ExtraBold' !important
      span
        div
          display: inline

  .ueid_container .url a
    font-weight: 800
    font-family: 'Inter-Extrabold', sans-serif
</style>