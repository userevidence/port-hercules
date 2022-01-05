<template lang='pug'>
.spotlight_asset(v-if='content_asset' :class='{ horizontal: horizontal }')
  header(:style='gradient')
    .hero_logo
      div(v-html='content_asset.account.svg_logo_mark')
    .cs_container
      .contents
        .customer
          div(v-html='content_asset.account.svg_logo')
          h3 Customer Spotlight
        .spotlight_title
          h1 {{content_asset.title}}
          h6 Published: {{published_at | dayjs('MMMM DD, YYYY')}}
  .content
    .cs_container
      section
        h5 Respondents Profile
        .facts
          .fact
            CompanySizeIcon(:brand_color_1='content_asset.account.brand_color_1' :brand_color_2='content_asset.account.brand_color_2')
            | {{content_asset.survey.respondent_count}} Respondents
          .fact
            IndustryIcon(:brand_color_1='content_asset.account.brand_color_1' :brand_color_2='content_asset.account.brand_color_2')
            | {{content_asset.survey.industry_count}} Industries
          .fact
            Fortune500Icon(:brand_color_1='content_asset.account.brand_color_1' :brand_color_2='content_asset.account.brand_color_2')
            | {{content_asset.survey.company_count}} Companies
          .fact
            LocationIcon(:brand_color_1='content_asset.account.brand_color_1' :brand_color_2='content_asset.account.brand_color_2')
            | {{ country_count}}
            

      section
        h5 Introduction
        p.intro_text
          | This Survey Spotlight is a synopsis of how {{content_asset.account.name}} is received by its customers.  The feedback included was collected and verified in a survey, conducted between {{ content_asset.survey.first_sent_at | dayjs('MMMM D') }} - {{ content_asset.survey.last_response_at | dayjs('MMMM DD, YYYY')}}, of {{content_asset.survey.respondent_count}} {{content_asset.account.name}} customers conducted by UserEvidence, an independent research firm.
          
      section
        h5 Key Results
        .stats
          .stat(v-for='stat in this.multiple_choice_stat_questions')
            h2 
              | {{stat.aggregate_stat_value}}
              .qualifier(:style='text_color_1') {{stat.aggregate_qualifier}}
            h6 {{stat.aggregate_stat_tagline}}
          .stat(v-if='nps')
            h2 
              | {{nps.aggregate_stat_value}}
              .qualifier(:style='text_color_1') {{nps.aggregate_qualifier}}
            h6 {{nps.aggregate_stat_tagline}}
      section
        .testimonial(v-if='key_testimonials.length > 1')
          h5 Key Testimonials
          TestimonialHighlight(:testimonials='key_testimonials')
        
      section
        h5 Scenario
        .chart_preview
          h4 {{scenario_question.the_question}}
          .bar_chart
            BarGuts(:stats='scenario_question.stats' :total='stat_total(scenario_question.stats)' :gradient_1='account.gradient_2' :gradient_2='account.gradient_2')
          .citation Source: Survey of {{content_asset.survey.respondent_count}} {{account.name}} customers.
      
      //- section(v-for='i in 10')
      //-   h1 {{i}}
      section(v-for='(question, i) in content_asset.questions')
        .testimonial(v-if='testimonial_groups[i] && testimonial_groups[i].length > 0')
          h5 Testimonials
          TestimonialHighlight(:testimonials='testimonial_groups[i]')
        .chart_preview
          h4 {{question.the_question}}
          .bar_chart(:class='orientation(question.stats)')
            BarGuts(:stats='question.stats' :total='stat_total(question.stats)' :gradient_1='account.gradient_2' :gradient_2='account.gradient_2')
          .citation Source: Survey of {{content_asset.survey.respondent_count}} {{account.name}} customers.

      section
        h5 About {{account.name}}
        p(v-html='content_asset.account.introduction')

    footer
      .ue_logo
        UELogo
      .disclaimer Source: Survey of {{content_asset.survey.respondent_count}} {{account.name}} customers. Independent research conducted by UserEvidence. Data verified {{published_at | dayjs('MM/DD/YY')}}.
      //- .disclaimer(v-else) Source: Survey of {{company_qualifier}}. Independent research conducted by <a href='https://www.userevidence.com'>UserEvidence</a>. Data verified {{published_at | dayjs('MMMM DD, YYYY')}}.
      .ueid-container
        .ueid 
          | UEID: {{content_asset.identifier}}
          span 
        .url
          a(:href='`https://uevi.co/${content_asset.identifier}`') uevi.co/{{content_asset.identifier}}
</template>
<script lang='ts'>
import axios from 'axios'
import UELogo from 'src/app/graphics/UELogo'
import AvatarIcon from 'src/app/graphics/AvatarIcon'
import Fortune500Icon from 'src/app/graphics/Fortune500Icon'
import CompanySizeIcon from 'src/app/graphics/CompanySizeIcon'
import IndustryIcon from 'src/app/graphics/IndustryIcon'
import LocationIcon from 'src/app/graphics/LocationIcon'
import BarGuts from './BarGuts'
import TestimonialHighlight from './TestimonialHighlight'

export default {
  components: { UELogo, AvatarIcon, Fortune500Icon, CompanySizeIcon, IndustryIcon, LocationIcon, TestimonialHighlight, BarGuts },
  props: ['content_asset', 'horizontal'],
  mounted() {
    if(!this.content_asset.account.brand_color_1 == null)
      this.content_asset.account.brand_color_1 = '#850AFF'
    if(this.content_asset.account.brand_color_2 == null)
      this.content_asset.account.brand_color_2 = this.content_asset.account.brand_color_1 + '50'
  },
  methods: {
    orientation(stats) {
      return Math.max(...stats.map((s) => s.the_answer.length), 0) > 10 ? 'horizontal' : 'vertical'
    },
    testimonial(testimonial) {
      return {text_answer: testimonial.text_answer, recipient: testimonial.recipient, account: this.content_asset.account }
    },
    stat_total(stats) {
      return stats.reduce((a,b) => a + b.count, 0)
    },
  },
  computed: {
    testimonials() {
      return this.content_asset.responses
    },
    key_testimonials() {
      return this.testimonial_groups.shift()
    },
    testimonial_groups() {
      var testies = []
      for(var i = 0; i<this.testimonials.length; i++) {
        testies.push(this.testimonials.slice(i*2, i*2+2))
      }
      return testies.map(g => g.map(t => this.testimonial(t)))
    },
    scenario_question() {
      return this.content_asset.questions.shift()
    },
    multiple_choice_stat_questions() {
      return this.content_asset.stat_questions.filter(q => q.type != 'Nps' ).slice(0, 2)
    },
    nps() {
      return this.content_asset.stat_questions.filter(q => q.type == 'Nps' )[0]
    },
    section_count() {
      return Math.min((this.testimonials.count - 2) / 2, this.content_asset.questions -1)
    },
    published_at() {
      return this.content_asset.verified_at || new Date()
    },
    country_count() {
      var qual = this.content_asset.survey.country_count > 1 ? 'Countries' : 'Country'
      return `${this.content_asset.survey.country_count} ${qual}`
    },
    gradient() {
      return `background: radial-gradient(134.88% 877.05% at 15.14% -17.75%, ${this.account.brand_color_1} 0%, ${this.account.brand_color_1} 100%), no-repeat`
    },
    text_color_1() {
      return `color: ${this.content_asset.account.brand_color_1};`
    },
    text_color_2() {
      return `color: ${this.content_asset.account.brand_color_2};`
    },
    account() {
      return this.content_asset.account
    }
  }
}
</script>
<style lang='sass' scoped>
.testimonial
  margin-bottom: 96px
  
.bar_guts 
  ::v-deep .bar_group
    .channel
      border-radius: 0 8px 8px 0
      background: #F2F6F7 !important
  ::v-deep.legend
    display: none !important
.chart_preview
  .vertical
    height: 387px
  h4
    margin-bottom: 20px
  .citation
    margin-top: 20px
    font-size: 12px

</style>
