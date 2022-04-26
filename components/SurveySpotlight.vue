<template lang='pug'>
.spotlight_asset(v-if='content_asset' :class='{ horizontal: horizontal }')
  header(:style='gradient')
    .back-link
      router-link(:to='`/user-research-library/${content_asset.account.slug}`')
        BackArrow
        span {{content_asset.account.name}} Home
    .hero_logo(v-html='content_asset.account.svg_logo_mark')
      
    .content_container
      .header_contents
        .spotlight_header
          figure(v-html='content_asset.account.svg_logo')
          h3(v-if='content_asset.filter == "company"') Account Spotlight
          h3(v-else) Survey Spotlight
        .title
          h1 {{content_asset.title}}
          h6 Published: {{published_at | dayjs('MMMM DD, YYYY')}}
        
  .content
    .content_container
      section(v-if='content_asset.filter == "company"')
        h5 Customer Profile
        .facts
          .fact(v-if='content_asset.company.is_fortune_500')
            Fortune500Icon(:brand_color_1='content_asset.account.brand_color_1' :brand_color_2='content_asset.account.brand_color_2')
            | Fortune 500
          .fact(v-if='content_asset.company.size_group')
            CompanySizeIcon(:brand_color_1='content_asset.account.brand_color_1' :brand_color_2='content_asset.account.brand_color_2')
            | {{company_sizes[content_asset.company.size_group]}}
          .fact
            IndustryIcon(:brand_color_1='content_asset.account.brand_color_1' :brand_color_2='content_asset.account.brand_color_2')
            | {{content_asset.company.sector_name}}
          .fact
            LocationIcon(:brand_color_1='content_asset.account.brand_color_1' :brand_color_2='content_asset.account.brand_color_2')
            span(v-if='content_asset.company.country_code') {{ content_asset.company.country_code }}
            span(v-else) US
      section(v-else)
        h5 Respondents Profile
        .facts
          .fact
            CompanySizeIcon(:brand_color_1='content_asset.account.brand_color_1' :brand_color_2='content_asset.account.brand_color_2')
            | {{content_asset.respondent_count}} Respondents
          .fact
            IndustryIcon(:brand_color_1='content_asset.account.brand_color_1' :brand_color_2='content_asset.account.brand_color_2')
            | {{sector_qualifier}}
          .fact
            Fortune500Icon(:brand_color_1='content_asset.account.brand_color_1' :brand_color_2='content_asset.account.brand_color_2')
            | {{content_asset.company_count}} {{company_qualifier}}
          .fact
            LocationIcon(:brand_color_1='content_asset.account.brand_color_1' :brand_color_2='content_asset.account.brand_color_2')
            span(v-if='this.content_asset.survey.country_count > 1') {{ country_count}}
            span(v-else) US

      section
        h5 Introduction
        p.intro_text(v-if='content_asset.filter == "company"')
          | This Account Spotlight is a synopsis of how {{ company_article }} {{content_asset.company.name}}, used {{content_asset.account.name}} to benefit their business. The feedback included was collected from {{content_asset.respondent_count}} users of the account in a {{ content_asset.survey.first_sent_at | dayjs('MMMM YYYY') }} survey of {{ content_asset.named ? '' : 'the' }} {{content_asset.company.name}} customers.
        p.intro_text(v-else)
          | This Survey Spotlight is a synopsis of how {{content_asset.account.name}} is received by its customers.  The feedback included was collected and verified in a survey, conducted between {{ content_asset.survey.first_sent_at | dayjs('MMMM Do, YYYY') }} - {{ content_asset.survey.last_response_at | dayjs('MMMM Do, YYYY')}}, of {{content_asset.survey.respondent_count}} {{content_asset.account.name}} customers conducted by UserEvidence, an independent research firm.
      section(v-if='this.multiple_choice_stat_questions.length > 0')
        h5 Key Results
        .stats(:class='stats_class')
          .stat(v-for='stat in this.multiple_choice_stat_questions')
            h2(v-if='stat.aggregate_qualifier == "$"')
              .qualifier(:style='text_color_1') {{stat.aggregate_qualifier}}
              | {{formatPrice(stat.aggregate_stat_value)}}
            h2(v-else)
              | {{stat.aggregate_stat_value}}
              .qualifier(:style='text_color_1') {{pluralize(stat)}}
            h6 {{stat.aggregate_stat_tagline}}
          .stat(v-if='nps')
            h2 
              | {{nps.aggregate_stat_value}}
              .qualifier(:style='text_color_1') {{nps.aggregate_qualifier}}
            h6 {{nps.aggregate_stat_tagline}}
      section(v-if='key_testimonials')
        .testimonial(v-if='key_testimonials.length > 1')
          h5 Key Testimonials
          TestimonialHighlight(:testimonials='key_testimonials' :hide_company_attribution='content_asset.filter == "company"')
        
      section
        //- h5 Scenario
        .chart_preview
          h4 {{scenario_question.the_question}}
          .bar_chart
            BarGuts(:stats='scenario_question.stats' :total='stat_total(scenario_question.stats)' :gradient_1='account.gradient_2' :gradient_2='account.gradient_2')
          .citation Source: Survey of {{content_asset.respondent_count}} {{account.name}} customers.
      
      section(v-for='(question, i) in content_asset.questions')
        .testimonial(v-if='testimonial_groups[i] && testimonial_groups[i].length > 0')
          h5 Testimonials
          TestimonialHighlight(:testimonials='testimonial_groups[i]' :hide_company_attribution='content_asset.filter == "company"')
        .chart_preview
          h4 {{question.the_question}}
          .bar_chart(:class='orientation(question.stats)')
            BarGuts(:stats='question.stats' :total='stat_total(question.stats)' :gradient_1='account.gradient_2' :gradient_2='account.gradient_2')
          .citation Source: Survey of {{content_asset.respondent_count}} {{account.name}} customers.

      section
        h5 About {{account.name}}
        p(v-html='content_asset.account.introduction')
      .spotlight_fab(v-if='download_url' @click='$modal.show("advanced_share_asset_modal")')
        DownloadIcon

      section.spotlight_footer
        .ue_logo
          UELogo
        .disclaimer Source: Survey of {{content_asset.respondent_count}} {{account.name}} {{content_asset.filtered_by}} customers. Independent research conducted by UserEvidence. Data verified {{published_at | dayjs('MM/DD/YY')}}.
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
import UELogo from './graphics/UELogo'
import AvatarIcon from './graphics/AvatarIcon'
import BackArrow from './graphics/BackArrow'
import Fortune500Icon from './graphics/Fortune500Icon'
import CompanySizeIcon from './graphics/CompanySizeIcon'
import IndustryIcon from './graphics/IndustryIcon'
import LocationIcon from './graphics/LocationIcon'
import DownloadIcon from './graphics/DownloadIcon'
import BarGuts from './BarGuts'
import TestimonialHighlight from './TestimonialHighlight'

export default {
  components: { UELogo, AvatarIcon, BackArrow, Fortune500Icon, CompanySizeIcon, IndustryIcon, LocationIcon, TestimonialHighlight, BarGuts, DownloadIcon },
  props: ['content_asset', 'horizontal'],
  data() {
    return {
      company_sizes: {
        small_business: '1-50',
        medium_enterprise: '50-1000',
        large_enterprise: '> 1000',
        fortune_500: '> 5000',
        }
      }
  },
  mounted() {
    if(!this.content_asset.account.brand_color_1 == null)
      this.content_asset.account.brand_color_1 = '#850AFF'
    if(this.content_asset.account.brand_color_2 == null)
      this.content_asset.account.brand_color_2 = this.content_asset.account.brand_color_1 + '50'
  },
  methods: {
    orientation(stats) {
      return Math.max(...stats.map((s) => s.the_answer && s.the_answer.length), 0) > 10 ? 'horizontal' : 'vertical'
    },
    testimonial(testimonial) {
      return {text_answer: testimonial.text_answer, recipient: testimonial.recipient, account: this.content_asset.account }
    },
    stat_total(stats) {
      return stats.reduce((a,b) => a + b.count, 0)
    },
    pluralize(stat) {
      return (stat.aggregate_stat_value + '' == '1') ? stat.aggregate_qualifier.slice(0, -1) : stat.aggregate_qualifier
    },
    formatPrice(amount) {
      return amount.toFixed().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
    },
  },
  computed: {
    check_style() {
      return {
        background: `url(/img/home/ue-email-signup-background-shape.svg), linear-gradient(${this.content_asset.account.gradient_1}, ${this.content_asset.account.gradient_2})`,
        // backgroundRepeat: `no-repeat`,
        // backgroundPosition: `center`,
      }
    },
    testimonials() {
      // return this.content_asset.responses
      return this.content_asset.responses.sort( (a, b) => {
        if(b.text_answer && a.text_answer)
          return b.text_answer.length - a.text_answer.length
      })
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
    company_article() {
      return this.content_asset.named ? '' : (['a', 'e', 'i', 'o', 'u'].includes(this.content_asset.company.name[0].toLowerCase()) ? 'an' : 'a')
    },
    company_qualifier() {
      return this.content_asset.company_count > 1 ? 'Companies' : 'Company'
    },
    sector_qualifier() {
      if(this.content_asset.sector_count > 1)
        return `${this.content_asset.sector_count} Industries` 
      else {
        if(this.content_asset.filter == 'company')
          return this.content_asset.sector_name
        else
          return this.content_asset.filtered_by
      }
    },
    download_url() {
      var v = this.content_asset.variants.find(v => v.type == 'PdfVariant')
      return v ? v.the_url : null
    },
    published_at() {
      return this.content_asset.verified_at || new Date()
    },
    country_count() {
      var qual = this.content_asset.survey.country_count > 1 ? 'Countries' : 'Country'
      return `${this.content_asset.survey.country_count} ${qual}`
    },
    stats_class() {
      return this.multiple_choice_stat_questions.length == 2 && this.nps ? 'three' : 'two'
    },
    gradient() {
      return {
        background: `url(/img/home/ue-email-signup-background-shape.svg), linear-gradient(${this.account.gradient_1}, ${this.account.gradient_2})`,
        backgroundRepeat: `no-repeat`,
        backgroundPosition: `0 center`,
      }
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
  overflow: visible !important

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
