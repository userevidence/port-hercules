export default {
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
  },
}
