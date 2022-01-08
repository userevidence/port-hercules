<template lang='pug'>
.spotlight_asset(v-if='content_asset' :class='{ horizontal: horizontal }')
  header(:style='gradient')
    .back-link
      router-link(:to='`/user-research-library/${content_asset.account.slug}`')
        BackArrow
        span {{content_asset.account.name}} Home



    .hero_logo(v-html='content_asset.account.svg_logo_mark')
    .header_contents
      .spotlight_header
        figure(v-html='content_asset.account.svg_logo')
        h3 Customer Spotlight
      .title
        h1 {{content_asset.title}}
        h6 Published: {{published_at | dayjs('MMMM DD, YYYY')}}
  .content
    .cs_container
      section(v-if='profile_point_count >= 2')
        h5 Customer Profile
        .facts
          .fact(v-if='content_asset.recipient.company_size == "fortune_500"') 
            Fortune500Icon(:brand_color_1='content_asset.account.brand_color_1' :brand_color_2='content_asset.account.brand_color_2')
            | Fortune 500 Company
          .fact(v-if='company_size')
            CompanySizeIcon(:brand_color_1='content_asset.account.brand_color_1' :brand_color_2='content_asset.account.brand_color_2')
            | {{company_size}}
          .fact(v-if='content_asset.recipient.industry_name')
            IndustryIcon(:brand_color_1='content_asset.account.brand_color_1' :brand_color_2='content_asset.account.brand_color_2')
            | {{content_asset.recipient.industry_name}}
          .fact(v-if='content_asset.recipient.company_country_code')
            LocationIcon(:brand_color_1='content_asset.account.brand_color_1' :brand_color_2='content_asset.account.brand_color_2')
            | {{content_asset.recipient.company_country_code}}

      section
        h5 Introduction
        p.intro_text 
          | This Customer Spotlight is a synopsis of how {{company_qualifier}} used {{this.content_asset.account.name}} to benefit their business.  The feedback included was collected and verified in a {{survayed_at | dayjs('MMMM')}} {{survayed_at | dayjs('YYYY')}} survey of {{this.content_asset.account.name}} customers conducted by UserEvidence, an independent research firm. 

      section
        h5 Key Results
        .stats(:class='stats_class')
          .stat(v-for='stat in stats')
            h2 
              | {{statMidpoint(stat)}}
              .qualifier(:style='text_color_1') {{stat.qualifier}}
            h6 {{stat.stat_tagline}}
          .stat(v-if='nps')
            h2 
              | {{nps.answers[0].response.value_answer}}
              .qualifier(:style='text_color_1') /10
            h6 Would Recommend
      
      section(v-if='testimonials.length > 0')
        TestimonialHighlight(:testimonials='[testimonial(testimonials[0])]')
        
      section
        h5 Scenario
        .question(v-for='question in scenario_questions')
          p {{question.the_question}}
          ul
            li(v-for='answer in question.answers') {{answer.answer.the_answer}}

      section(v-if='testimonials.length > 1')
        TestimonialHighlight(:testimonials='[testimonial(testimonials[1])]')

      section
        h5 Outcome
        .question(v-for='question in outcome_questions')
          p {{question.the_question}}
          ul
            li(v-for='answer in question.answers') {{answer.answer.the_answer}}
  
      section(v-if='testimonials.length > 2')
        TestimonialHighlight(:testimonials='[testimonial(testimonials[2])]')

      section
        h5 About {{content_asset.account.name}}
        p(v-html='content_asset.account.introduction')

    .spotlight_footer
      .ue_logo
        UELogo
      .disclaimer(v-if='content_asset.recipient.named') Source: {{content_asset.recipient.person_attribution}}, {{content_asset.recipient.company_attribution}}.  Independent research conducted by <a href='https://www.userevidence.com'>UserEvidence</a>. Data verified {{published_at | dayjs('MMMM DD, YYYY')}}.
      .disclaimer(v-else) Source: Survey of {{company_qualifier}}. Independent research conducted by <a href='https://www.userevidence.com'>UserEvidence</a>. Data verified {{published_at | dayjs('MMMM DD, YYYY')}}.
      .ueid-container
        .ueid 
          | UEID: {{content_asset.identifier}}
          span 
        .url
          a(:href='`https://uevi.co/${content_asset.identifier}`') uevi.co/{{content_asset.identifier}}
</template>
<script lang='ts'>
import axios from 'axios'
import TestimonialHighlight from './TestimonialHighlight'
import BackArrow from './graphics/BackArrow'
import UELogo from './graphics/UELogo'
import AvatarIcon from './graphics/AvatarIcon'
import Fortune500Icon from './graphics/Fortune500Icon'
import CompanySizeIcon from './graphics/CompanySizeIcon'
import IndustryIcon from './graphics/IndustryIcon'
import LocationIcon from './graphics/LocationIcon'

export default {
  components: { UELogo, AvatarIcon, Fortune500Icon, CompanySizeIcon, IndustryIcon, LocationIcon, TestimonialHighlight, BackArrow },
  props: ['content_asset', 'horizontal'],
  mounted() {
    if(!this.content_asset.account.brand_color_1 == null)
      this.content_asset.account.brand_color_1 = '#850AFF'
    if(this.content_asset.account.brand_color_2 == null)
      this.content_asset.account.brand_color_2 = this.content_asset.account.brand_color_1 + '50'
  },
  methods: {
    testimonial(testimonial) {
      return {text_answer: testimonial.answers[0].response.text_answer, recipient: this.content_asset.recipient, account: this.content_asset.account }
    },
    statMidpoint(stat) {
      return Math.round((stat.answers[0].answer.low_value + stat.answers[0].answer.high_value) / 2)
    },
  },
  computed: {
    company_size() {
      if(this.content_asset.recipient.company_size) {
        var sizes = {
          small_business: '1-50',
          medium_enterprise: '50-1000',
          large_enterprise: '> 1000',
          fortune_500: '> 5000',
        }
        return sizes[this.content_asset.recipient.company_size]
      }
      else 
        return null
    },
    stats() {
      return this.content_asset.recipient.questions.filter(q => q.distribution_direction != null && 
        q.type == 'MultipleChoiceOne' &&
        q.stat_tagline != null &&
        q.stat_tagline != '' &&
        q.qualifier != null &&
        q.qualifier != ''
      ).slice(0, 2)
    },
    nps() {
      return this.content_asset.recipient.questions.filter(q => q.type == 'Nps' )[0]
    },
    testimonials() {
      return this.content_asset.recipient.questions.filter(q => q.type == 'Testimonial' &&
        q.answers[0].response.text_answer != '' &&
        q.answers[0].response.text_answer != null
      )
    },
    multiple_choice_questions() {
      return this.content_asset.recipient.questions.filter(q => ['MultipleChoiceOne', 'MultipleChoiceMany'].includes(q.type))
    },
    outcome_questions() {
      return this.multiple_choice_questions.filter(q => q.category == 'outcome')
    },
    scenario_questions() {
      return this.multiple_choice_questions.filter(q => q.category == 'scenario')
    },
    company_qualifier() {
      if(this.content_asset.recipient.named && this.content_asset.recipient.best_company_name)
        return this.content_asset.recipient.best_company_name
      else {
        if(this.content_asset && this.content_asset.recipient && this.content_asset.recipient.company_size) {
          var size_string = this.content_asset.recipient.company_size.split('_').map(w => w[0].toUpperCase() + w.substring(1)).join(' ')
          return `a ${size_string} ${this.content_asset.recipient.industry_name} company`
        }
        // var size_string = this.content_asset?.recipient?.company_size?.split('_').map(w => w[0].toUpperCase() + w.substring(1)).join(' ')
        // return `a ${size_string} ${this.content_asset.recipient.industry_name} company`
      }
    },
    profile_point_count() {
      var count = 0
      if(this.company_size)
        count++
      if(this.content_asset.recipient.company_size == 'fortune_500')
        count++
      if(this.content_asset.recipient.industry_name)
        count++
      if(this.content_asset.recipient.company_country_code)
        count++
      return count
    },
    survayed_at() {
      return this.content_asset.first_sent_at || new Date()
    },
    published_at() {
      return this.content_asset.verified_at || new Date()
    },
    stats_class() {
      return this.stats.length == 2 && this.nps ? 'three' : 'two'
    },
    gradient() {
      return `background: radial-gradient(134.88% 877.05% at 15.14% -17.75%, ${this.content_asset.account.brand_color_1} 0%, ${this.content_asset.account.brand_color_1} 100%), no-repeat`
    },
    text_color_1() {
      return `color: ${this.content_asset.account.brand_color_1};`
    },
    text_color_2() {
      return `color: ${this.content_asset.account.brand_color_2};`
    },
  }
}
</script>
<style lang='sass' scoped>
</style>
