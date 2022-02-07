<template lang='pug'>
  .customer_spotlight_multi_page.content_asset(:style='css_vars' :class='{ pdf: type.indexOf("SpotlightMultiPagePdfVariant") >= 0 }')
    .title_page.page
      .customer_logo
        div(v-html='content_asset.account.svg_logo_mark')
      .uevi
        Logo
        a(:href='asset_url' target='_blank') {{asset_link}}
      .content
        h2 {{content_asset.title}}
      .asset_type(v-if='is_customer_spotlight')
        p Customer <br> Spotlight
        .avatar
          CustomerSpotlightAvatarIcon
      .asset_type(v-if='is_account_spotlight')
        p Account <br> Spotlight
        .avatar
          CustomerSpotlightAvatarIcon
      .asset_type(v-else-if='is_survey_spotlight')
        p Survey <br> Spotlight
        .avatar
          CustomerSpotlightAvatarIcon
      .arc.arc2
      .page_indicator {{pageIndicator(1)}}
      .right_arrow
        RightArrowIcon
    .profile_page.page
      .header
        h6 Customer Profile
        .uevi
          Logo
          a(:href='asset_url' target='_blank') {{asset_link}}
      .content
        .facts
          .fact(v-if='is_fortune_500')
            Fortune500Icon(:brand_color_1='content_asset.account.brand_color_1' :brand_color_2='content_asset.account.brand_color_2')
            | Fortune 500
          .fact(v-if='company_size')
            CompanySizeIcon(:brand_color_1='content_asset.account.brand_color_1' :brand_color_2='content_asset.account.brand_color_2')
            | {{company_size}}
          .fact(v-if='industry_size')
            IndustryIcon(:brand_color_1='content_asset.account.brand_color_1' :brand_color_2='content_asset.account.brand_color_2')
            | {{industry_size}}
          .fact(v-if='country_size')
            LocationIcon(:brand_color_1='content_asset.account.brand_color_1' :brand_color_2='content_asset.account.brand_color_2')
            | {{country_size}}
      .customer_logo
        div(v-html='content_asset.account.svg_logo_mark')
      .arc.arc1
      .arc.arc2
      .page_indicator {{pageIndicator(2)}}
      .right_arrow
        RightArrowIcon
    .introduction_page.page(v-if='false')
      .header
        h6 Introduction
        .uevi
          Logo
          a(:href='asset_url' target='_blank') {{asset_link}}
      .content
        p This Customer Spotlight is a synopsis of how {{company_qualifier}} used {{this.content_asset.account.name}} to benefit their business.  The feedback included was collected and verified in a {{surveyed_at | dayjs('MMMM')}} {{surveyed_at | dayjs('YYYY')}} survey of {{this.content_asset.account.name}} customers conducted by UserEvidence, an independent research firm. 
      .customer_logo
        div(v-html='content_asset.account.svg_logo_mark')
      .arc.arc1
      .arc.arc2
      .page_indicator {{pageIndicator(2)}}
      .right_arrow
        RightArrowIcon
    .key_results_page.page(v-if='stats.length > 0')
      .header
        h6 Key Results
        .uevi
          Logo
          a(:href='asset_url' target='_blank') {{asset_link}}
      .content(v-if='is_survey_spotlight')
        .stats
          | &nbsp;
          .stat(v-for='stat in this.stats')
            h1
              | {{stat.aggregate_stat_value}}
              .qualifier(:style='text_color_1') {{stat.aggregate_qualifier}}
            p {{stat.aggregate_stat_tagline}}
      .content(v-else)
        .stats
          | &nbsp;
          .stat(v-for='stat in stats')
            h1
              | {{statMidpoint(stat)}}
              .qualifier(:style='text_color_1') {{stat.qualifier}}
            p {{stat.stat_tagline}}
      .arc.arc1
      .arc.arc2
      .customer_logo
        div(v-html='content_asset.account.svg_logo_mark')
      .page_indicator {{pageIndicator(3)}}
      .right_arrow
        RightArrowIcon

    .testimonial_page.page
      .header
        h6 Testimonial
        .uevi
          Logo
          a(:href='asset_url' target='_blank') {{asset_link}}
      .content
        h2 
          | {{testimonial_pages[0]}}
          span(v-if='testimonial_pages.length > 1') ...
        .profile
          .avatar
            img(:src='recipient.recipient_gravatar_url' v-if='recipient.recipient_gravatar_url')
            AvatarIcon(v-else)
          .author_information(v-if='recipient.named')
            h4 {{recipient.person_attribution}}
            h6 {{recipient.title}}
            h6 {{recipient.best_company_name}}
          .author_information(v-else)
            h4 {{recipient.person_attribution}}
            h6 {{recipient.company_attribution}}
      .arc.arc1
      .arc.arc2
      .page_indicator {{pageIndicator(4)}}
      .right_arrow
        RightArrowIcon
    .testimonial_page.page(v-for='(page, i) in testimonial_pages.slice(1)')
      .header
        h6 Testimonial
        .uevi
          Logo
          a(:href='asset_url' target='_blank') {{asset_link}}
      .content
        h2 {{page}}
      .arc.arc1
      .arc.arc2
      .page_indicator {{pageIndicator(5 + i)}}
      .right_arrow
        RightArrowIcon
    .scenario_page.page(v-if='false')
      .header
        h6 Scenario
        .uevi
          Logo
          a(:href='asset_url' target='_blank') {{asset_link}}
      .content
        .question
          p {{scenario_questions[0].the_question}}
          ul
            li(v-for='answer in scenario_questions[0].answers') 
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="6" cy="6" r="4" fill="white" stroke="#1B97FA" stroke-width="4"/>
              </svg>
            
              | {{answer.answer.the_answer}}
      .arc.arc1
      .arc.arc2
      .page_indicator {{pageIndicator(4)}}
      .right_arrow
        RightArrowIcon
    .cta_page.page
      .header
        h6 Learn More
      .content
        h3 
          | See the full {{content_asset.account.name}} Customer Spotlight here:
          br
          a(:href='asset_url' target='_blank') {{asset_link}}
      .footer
        .text
          p Generate Customer Content
          a(href='https://www.userevidence.com') UserEvidence.com
        Logo
        
      .customer_logo
        div(v-html='content_asset.account.svg_logo_mark')
      .arc.arc1
      .page_indicator {{pageIndicator(total_pages)}}
  </template>
  <script>
  import Logo from './graphics/Logo'
  import CustomerSpotlightAvatarIcon from './graphics/CustomerSpotlightAvatarIcon.vue'
  import Fortune500Icon from 'src/app/graphics/Fortune500Icon'
  import CompanySizeIcon from 'src/app/graphics/CompanySizeIcon'
  import IndustryIcon from 'src/app/graphics/IndustryIcon'
  import LocationIcon from 'src/app/graphics/LocationIcon'
  import RightArrowIcon from './graphics/RightArrowIcon'
  import AvatarIcon from './graphics/AvatarIcon.vue'

  export default {
    // name: 'CustomerSpotlight11Title',
    props: ['content_asset', 'type'],
    components: { CustomerSpotlightAvatarIcon, Logo, Fortune500Icon, CompanySizeIcon, IndustryIcon, LocationIcon, RightArrowIcon, AvatarIcon },
    computed: {
      is_customer_spotlight() {
        return this.content_asset.type.indexOf('CustomerSpotlight') >= 0
      },
      is_survey_spotlight() {
        return this.content_asset.type.indexOf('SurveySpotlight') >= 0
      },
      // note an account spotlight is ALSO a survey spotlight
      is_account_spotlight() {
        return this.content_asset.filter == 'company'
      },
      is_fortune_500() {
        return this.content_asset?.recipient?.company_size == "fortune_500" || this.content_asset?.company?.is_fortune_500
      },
      company_size() {
        var sizes = {
          small_business: '1-50',
          medium_enterprise: '50-1000',
          large_enterprise: '> 1000',
          fortune_500: '> 5000',
        }
        if(this.content_asset?.recipient?.company_size)
          return `${sizes[this.content_asset.recipient.company_size]} Employees`
        else if(this.content_asset.company)
          return `${sizes[this.content_asset.company.size_group]} Employees`
        else
          return null
      },
      industry_size() {
        if(this.is_customer_spotlight)
          return this.content_asset?.recipient?.industry_name
        else if(this.is_survey_spotlight)
          return this.content_asset.sector_count > 1 ? `${this.content_asset.sector_count} Industries` : this.content_asset.filtered_by
        else if(this.is_account_spotlight)
          return this.content_asset?.company?.sector_name
      },
      country_size() {
        if(this.is_customer_spotlight)
          return this.content_asset.recipient.company_country_code
        else if(this.is_survey_spotlight)
          return this.content_asset.survey.country_count > 1 ? `${this.content_asset.survey.country_count} Countries` : 'US'
        else if(this.is_account_spotlight)
          return this.content_asset.company.country_code
        else
          return 'US'
      },
      questions() {
        if(this.is_survey_spotlight)
          return this.content_asset.questions
        else
          return this.content_asset.recipient.questions
      },
      recipient() {
        if(this.is_survey_spotlight)
          return this.testimonial.recipient
        else
          return this.content_asset.recipient
      },
      asset_link() {
        return `uevi.co/${this.content_asset.identifier}`
      },
      asset_url() {
        return `https://${this.asset_link}`
      },
      company_qualifier() {
        if(this.content_asset.recipient.named && this.content_asset.recipient.best_company_name)
          return this.content_asset.recipient.best_company_name
        else {
          var size_string = this.content_asset?.recipient?.company_size?.split('_').map(w => w[0].toUpperCase() + w.substring(1)).join(' ')
          return `a ${size_string} ${this.content_asset.recipient.industry_name} company`
        }
      },
      surveyed_at() {
        return this.content_asset.first_sent_at || new Date()
      },
      stats() {
        if(this.is_survey_spotlight)
          return this.content_asset.stat_questions
        else
          return this.questions.filter(q => q.distribution_direction != null && 
            q.type == 'MultipleChoiceOne' &&
            q.stat_tagline != null &&
            q.stat_tagline != '' &&
            q.qualifier != null &&
            q.qualifier != ''
          ).slice(0, 2)
      },
      testimonial() {
        if(this.is_survey_spotlight)
          return this.content_asset?.responses[0]
        else
          return this.content_asset.recipient.questions.filter(q => q.type == 'Testimonial' &&
            q.answers[0].response.text_answer != '' &&
            q.answers[0].response.text_answer != null
          )[0].answers[0].response
      },
      words() {
        return this.testimonial.text_answer.split(' ')
      },
      testimonial_pages() {
        var pages = []
        pages.push(this.page(170))
        
        while(this.words.length > 0)
          pages.push(this.page(240))
          
        return pages
      },
      total_pages() {
        return 4 + this.testimonial_pages.length
      },
      multiple_choice_questions() {
        return this.content_asset.recipient.questions.filter(q => ['MultipleChoiceOne', 'MultipleChoiceMany'].includes(q.type))
      },
      scenario_questions() {
        return this.multiple_choice_questions.filter(q => q.category == 'scenario')
      },
      css_vars() {
        return {
          '--brand-color-1': this.content_asset.account.brand_color_1,
          '--avatar-gradient': `linear-gradient(to right, #fff 30%, ${this.content_asset.account.brand_color_1} 100%)`
        }
      },
    },
    methods: {
      page(length) {
        var the_page = ''
        while(the_page.length < length && this.words.length > 0) {
          if(this.words[0].length + the_page.length > length) {
            break;
          }
          the_page += this.words.shift() + ' '
        }
        return the_page.trim()

      },
      statMidpoint(stat) {
        return Math.round((stat.answers[0].answer.low_value + stat.answers[0].answer.high_value) / 2)
      },
      pageIndicator(page) {
        return `${page}/${this.total_pages}`
      },
    }
  }
</script>
<style lang='sass' scoped>
  .pdf
    display: block !important
    .uevi::before
      background: white
    
    .page
      overflow: hidden
      height: 360px
      page-break-after: always
      .arc2
        display: block
        top: 304px
        right: -56px
    .profile_page
      .customer_logo
        display: block
        top: 100px
        right: -43px
    .cta_page
      position: relative
      .customer_logo
        position: absolute
        height: 30%
        ::v-deep svg
          position: absolute
          top: -20px
          right: 0px
  .content_asset
    width: 100%
    height: 360px
    background: white
    display: flex
    .page
      width: 360px
      padding: 40px 32px
      position: relative
      z-index: 1
  .header
    h6 
      font-family: 'Inter-Regular'
      font-weight: 600
      text-transform: uppercase
      font-size: 10px
      letter-spacing: 0.32em
      color: #48555b
  .content
    z-index: 199
    position: relative
    margin-top: 34px
    height: 210px
    h2
      line-height: 26px
      margin-bottom: 44px
    .profile
      display: flex
      align-items: center
      .avatar
        margin-right: 12px
        height: 48px
        width: 48px
        background: white
        border-radius: 50% 50% 50% 0%
        padding: 5px
        display: flex
        img
          border-radius: 40px
          width: 48px
        svg
          height: 100%
          width: 100%
          // ::v-deep path
            fill: hsla(200, 100%, 100%, 0.9) !important
      .author_information
      h4
        font-size: 14px
        line-height: 16px
        margin-bottom: 4px
      h6
        font-size: 10px
        line-height: 12px
        letter-spacing: inherit
  .uevi
    position: absolute
    display: flex
    align-items: center
    top: 33px
    left: 210px
    width: 170px
    background: white
    border-radius: 15px
    padding: 4px 0px 4px 7px
    a
      background: white
      border-radius: 10px
      font-family: 'Inter-Medium'
      color: black
      font-size: 10px
    svg
      width: 15px
      height: 15px
      margin-right: 10px
  .uevi::before
    border-radius: 25px
    content: ''
    background-image: linear-gradient(to right, rgba(223, 232, 236, 1) 0%, #f2f6f7 100%)
    
    top: -2px
    left: -2px
    bottom: -2px
    right: -2px
    position: absolute
    z-index: -1

  .asset_type
    position: absolute
    bottom: 32px
    left: 32px
    display: flex
    .avatar
      background: white
      border-radius: 50px
      position: relative
      box-sizing: border-box
      width: 56px
      height: 56px
      display: flex
      justify-content: center
      align-items: center
      svg
        height: 28px
        ::v-deep path
          fill: var(--brand-color-1)
    .avatar::before
      border-radius: 50px
      content: ''
      background-image: var(--avatar-gradient)
      top: -1px
      left: -1px
      bottom: -1px
      right: -1px
      position: absolute
      z-index: -1
  .customer_logo
    z-index: 1
    position: absolute
    ::v-deep svg
      width: 144px
      height: 144px
      pathx
        fill: var(--brand-color-1)
  .arc
    z-index: 99
    position: absolute
    width: 112px
    height: 112px
    border: 4px solid #f2f6f7
    border-radius: 150px
    &.arc1
      top: 304px
      left: -56px
    &.arc2
      display: none

  .title_page
    .customer_logo
      top: -80px
  .profile_page
    z-index: 5 !important
    .customer_logo
      display: none
  .key_results_page
    z-index: 4 !important
    .customer_logo
      top: 100px
      left: -100px
    .content
      text-align: right
  .testimonial_page
    .content
  .cta_page
    .customer_logo
      top: -20px
      right: 0
    .content
      display: flex
      align-items: center
      h3
        line-height: 32px
        font-size: 20px
        color: #131516
    a
      color: var(--brand-color-1)
      font-family: Inter-ExtraBold
    .footer
      position: absolute
      bottom: 32px
      right: 32px
      display: flex
      align-items: center
      text-align: right
      .text
        margin-right: 10px
        line-height: 20px
      p
        font-size: 12px
      a
        font-size: 12px
        color: $uePurple

  .facts
    .fact 
      font-family: 'Inter-Medium', sans-serif
      font-size: 14px
      margin-bottom: 18px
      color: #48555b
      svg
        margin-right: 12px

  .stats
    justify-content: space-between
    display: flex
    height: 100%
    flex-direction: column
  .stat
    h1
      font-size: 56px
      margin-bottom: 4px
      line-height: 1
      color: var(--brand-color-1)
    .qualifier
      display: inline-block
      font-size: 20px
      font-family: 'Inter', sans-serif
      font-weight: 100 !important
      margin-left: 4px
      color: black

  .right_arrow
    position: absolute
    bottom: 10px
    right: 10px
  .page_indicator
    font-size: 10px
    position: absolute
    bottom: 10px
    left: 10px
    
  .question
    display: block
    margin: 0 auto 48px
    padding: 0 !important
    p
      margin-bottom: 8px
    &:last-child
      margin-bottom: -32px
    &:hover
      border: 1px solid white
  ul
    padding: 0px !important
    li
      font-family: 'Inter-ExtraBold'
      font-weight: 700
      list-style: none
      ::v-deep svg
        width: 20px
        height: 20px
        margin-right: 20px
        circle
          stroke: var(--brand-color-1)
</style>
