<template lang='pug'>
.asset_footer
  .logo_and_ueid_container
    .logos_container
      .company_logo
        figure(v-html='content_asset.account.svg_logo_mark')
      .ue_logo
        Logo(:fill='fill')
    .ueid_container
      .url
        a(:href='`https://${uevico_link}`' :class='link_class') {{uevico_link}}
  .verification_text
    p(v-if='content_asset.type == "TestimonialAsset"') Survey conducted by UserEvidence. Testimonial verified {{verified_date}}.
    p(v-else) Survey of {{content_asset.response_count}} {{content_asset.account.name}} {{filter_text}} users, conducted by UserEvidence. Statistic verified {{verified_date}}.
</template>
<script>
import Logo from './graphics/Logo.vue'
import dayjs from 'dayjs'

export default {
  props: ['content_asset'],
  components: { Logo },
  computed: {
    link_class() {
      return (this.content_asset.color_scheme || 'purple') + 'Text'
    },
    verified_date() {
      if(this.content_asset.verified_at)
        return dayjs(this.content_asset.verified_at).format('MM/D/YYYY')
      else
        return dayjs().format('MM/D/YYYY')
    },
    uevico_link() {
      return `uevi.co/${this.content_asset.identifier}`
    },
    filter_text() {
      if(this.content_asset.filtered_by?.length > 0)
        return this.content_asset.filtered_by.join(', ')// + ' and ' + this.filters.slice(-1)[0].name
      else
        return
    },
  }
}
</script>
<style lang='sass' scoped>
.asset_footer
  padding-top: 24px
  display: block
  width: 100%
  .logo_and_ueid_container
    width: 100%
    display: inline-flex
    align-items: center
    justify-content: space-between
  .logos_container
    width: 100%
    height: 16px
    display: flex
    align-items: center
    order: 1
    flex-grow: 0
    figure
      margin: 0
    ::v-deep svg
      width: 100%
      height: 100%
    .company_logo
      width: 16px
      height: 16px
      margin-right: 8px
      &::after
        content: ''
        height: 16px
        width: 1px
        background-color: hsl(200, 24%, 90%)
        position: relative
        left: 8px
        display: inline-block
        top: 0
      img
        height: 16px
    .ue_logo
      width: 16px
      height: 16px
      margin-left: 8px
    .company_logo, .ue_logo
      display: flex
      align-items: center

  .ueid_container
    margin-left: auto
    text-align: right
    font-size: 10px
    line-height: 1
    order: 2
    flex-grow: 0
    .url a
      font-weight: 800
      font-family: 'Inter-Extrabold', sans-serif
      &:hover
        color: hsl(270, 100%, 24%)
        text-decoration: none

.verification_text
  width: 100%
  margin-top: 12px
  display: inline-block
  p
    font-weight: 500
    font-family: 'Inter-Medium', sans-serif
    font-size: 10px
    line-height: 12px
    color: hsl(200, 12%, 40%)

</style>
