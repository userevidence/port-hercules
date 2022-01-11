<template lang='pug'>
  .customer_spotlight_card.content_asset
    .header(v-if='content_asset.type == "CustomerSpotlightAsset"')
      UserIcon
      h6 Customer Spotlight
    .header(v-if='content_asset.type == "SurveySpotlightAsset"')
      SmallSurveySpotlightIcon
      h6 Survey Spotlight
    h2 {{content_asset.title}}
    h5(v-if='content_asset.verified_at') {{verified_at}}
</template>
<script>
import UserIcon from './graphics/UserIcon.vue'
import SmallSurveySpotlightIcon from './graphics/SmallSurveySpotlightIcon.vue'
import dayjs from 'dayjs'

export default {
  props: ['content_asset'],
  components: { UserIcon, SmallSurveySpotlightIcon },
  computed: {
    verified_at() {
      return dayjs(this.content_asset.verified_at).format('MMMM D, YYYY')
    },
  }
}
</script>
<style lang='sass' scoped>
  *
    font-family: 'Inter', sans-serif

  .customer_spotlight_card
    position: relative
    border-radius: 24px
    width: 100%
    margin: 0
    padding: 24px
    border: 1px solid hsl(200, 24%, 90%)
    overflow: hidden
    .header
      display: inline-flex
      align-items: center
      line-height: 1
      margin-bottom: 16px
      margin-top: 0
      svg
        opacity: 0.5
        height: 12px
        width: 12px
    //&::before
      content: ''
      display: block
      position: absolute
      right: 12px
      top: 12px
      z-index: 10
      height: 12px
      width: 12px
      background-color: hsl(270, 100%, 52%)
      border-radius: 50% 50% 50% 50%
    h2, h6
      font-weight: 800
      font-family: 'Inter-Extrabold', sans-serif
  h2, h3, h4, h5, h6
    color: hsl(200, 8%, 8%)
    margin: 0
    padding: 0
    font-size: 20px
  h6
    line-height: 1
    font-size: 10px
    text-transform: uppercase
    letter-spacing: 1.5px
    margin-left: 8px
    color: hsl(270, 100%, 52%)
  h2
    //text-shadow: 0px 1px 0px hsla(200, 8%, 8%, 0.16)
  h5
    line-height: 1
    font-size: 12px
    text-transform: none
    letter-spacing: 0
    margin-top: 16px
    font-weight: 500
    color: hsl(200, 12%, 40%)
</style>
