<template lang='pug'>
  .testimonial_highlight
    .right(:style='`background-color: ${account.brand_color_1};`')
    .left(:style='`background-color: ${account.brand_color_1};`')
    .highlights
      .testimonial(v-for='(testimonial, i) in testimonials' :class='{ single: single}')
        .quote
          UpsideDownQuoteIcon.quote1(:brand_color_1='account.brand_color_1' v-if='i == 0')
          h2 {{testimonial.text_answer}} 
          QuoteIcon.quote2(:brand_color_1='account.brand_color_1' v-if='i == testimonials.length - 1')
        .attribution
          .avatar
            img(:style='avatar_circle_color' :src='testimonial.recipient.gravatar_url' v-if='testimonial.recipient.gravatar_url')
            AvatarIcon(:style='avatar_circle_color' v-else)
          .name(v-if='testimonial.recipient.named')
            h3 {{testimonial.recipient.person_attribution}}
            h4 {{testimonial.recipient.title}}
            h4 {{testimonial.recipient.company_name}}
          .name(v-else)
            h4 {{testimonial.recipient.person_attribution}}
            h4 {{testimonial.recipient.company_attribution}}
</template>
<script lang='ts'>
import UpsideDownQuoteIcon from './graphics/UpsideDownQuoteIcon'
import QuoteIcon from './graphics/QuoteIcon'
import AvatarIcon from './graphics/AvatarIcon'

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
    .highlights
      display: flex
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
    .quote
      display: flex
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
    width: 100%
    min-width: 48%
    overflow: visible !important
    &:first-of-type
      margin-right: 4%
    &.single
      margin-right: 4%
      margin-left: 8%
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
    .attribution
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
        h3
          margin-bottom: 7px
        h4
          margin-bottom: 0px
          padding: 0
          line-height: 1.3
        h4:first-child
          margin-bottom: 4px
      img, svg
        width: 50px !important
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
      padding: 0 32px 0 0
      display: flex
      .left
        display: block
        left: -32px
        width: 8px
        height: 100%
        opacity: 1
      .right
        display: none !important
        opacity: 0
    .testimonial
      &.single
        margin-left: 0px !important
    .testimonial h5
      padding: 0 !important
      .left, .right
        display: none

    .testimonial_highlight
      padding: 0px
      h5 
        margin: 0px
      .highlights
        display: block
        .testimonial
          margin-bottom: 64px

  @media print
    .testimonial_highlight
      page-break-inside: avoid

</style>
