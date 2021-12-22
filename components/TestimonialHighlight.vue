<template lang='pug'>
  .testimonial_highlight
    .right(:style='`background-color: ${account.brand_color_1};`')
    .left(:style='`background-color: ${account.brand_color_1};`')
    .d-flex
      .testimonial.w-100(v-for='(testimonial, i) in testimonials' :class='{ single: single}')
        .d-flex.justify-content-between
          UpsideDownQuoteIcon.quote1(:brand_color_1='account.brand_color_1' v-if='i == 0')
          h2 {{testimonial.text_answer}}
          QuoteIcon.quote2(:brand_color_1='account.brand_color_1' v-if='i == testimonials.length - 1')
        .avatar
          img(:style='avatar_circle_color' :src='testimonial.recipient.gravatar_url' v-if='testimonial.recipient.gravatar_url')
          AvatarIcon(:style='avatar_circle_color' v-else)
          .name
            h4 {{testimonial.recipient.person_attribution}}
            h4 {{testimonial.recipient.company_attribution}}
</template>
<script lang='ts'>
import UpsideDownQuoteIcon from 'src/app/graphics/UpsideDownQuoteIcon'
import QuoteIcon from 'src/app/graphics/QuoteIcon'
import AvatarIcon from 'src/app/graphics/AvatarIcon'

export default {
  props: ['testimonials'],
  components: { UpsideDownQuoteIcon, QuoteIcon, AvatarIcon },
  computed: {
    avatar_circle_color() {
      return `box-shadow: 0 0 0 2px white, 0 0 0 4px ${this.account.brand_color_1};`
    },
    account() {
      return this.testimonials[0].account
    },
    single() {
      return this.testimonials.length == 1
    }
  }
}
</script>
<style lang='sass' scoped>
  .testimonial_highlight
    padding: 0
    position: relative
    z-index: 2
    background: white
    .right, .left
      position: absolute
      z-index: 1
      width: 980px
      height: 8px
      background: $uePurple
      top: 50%
      transform: translateY(-50%)
      display: block
      opacity: 0.5
    .left
      left: -150%
    .right
      right: -150%
    .quote1, .quote2
      position: relative
    .quote1
      align-self: flex-start
      width: 64px
      position: absolute
      left: -70px
      top: 0px
    .quote2
      align-self: flex-end
      width: 64px
      right: -28px
      bottom: 24px
  .testimonial
    min-width: 48%
    &:first-of-type
      margin-right: 4%
    &.single
      margin-right: 0% !important
    h5
      line-height: 1
      margin: 0 0 16px 24px
      color: hsl(200, 16%, 45%)
      &:after
        display: none
    h2
      margin-bottom: 24px
      font-weight: 800
      font-size: 22px
      line-height: 140%
      letter-spacing: -0.01em
      color: #131516
    .avatar
      display: inline-flex
      flex-direction: row
      align-items: center
      .name
        display: flex
        flex-direction: column
        font-weight: 600
        font-size: 15px
        letter-spacing: -0.015em
        color: #48555B
        line-height: 1
        h4:first-child
          margin-bottom: 4px
      img, svg
        width: 50px
        height: 50px
        border-radius: 50%
        margin-right: 16px

  @media screen and (max-width: 1200px), print
    .testimonial_highlight
      border-left: none !important

  @media screen and (max-width: 816px)
    .quote1, .quote2
      display: none
      visibility: hidden
      opacity: 0
    .testimonial_highlight
      padding: 0 32px 0 24px
      max-width: 784px
      display: flex
      .left
        display: block
        left: 0
        width: 8px
        height: 100%
        opacity: 1
      .right
        display: none
    .testimonial h5
      margin-left: 0
      .left, .right
        display: none

  @media print
    .testimonial_highlight
      page-break-inside: avoid

</style>
