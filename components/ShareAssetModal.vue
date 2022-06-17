<template lang='pug'>
  modal(name='advanced_share_asset_modal' height='690' width='688' @before-open='beforeOpen')
    .modal_container(v-if='content_asset')
      .modal_header
        h2 Share {{asset_type}}
        .closer(@click='$modal.hide("advanced_share_asset_modal")')
          TimesIcon
      .modal_body
        p Select the destination where you’ll be sharing the {{asset_type.toLowerCase()}}, and you’ll receive optimized files for that platform.
        section
          .tiles.platforms
            .tile(v-if='variant_map.linkedin')
              .image
                img(src='./graphics/logos/linkedin-logo.svg')
              .info
                .brand LinkedIn
                a.downloader(:href='variant_map.linkedin' target='_blank')
                  | Download
                  DownloadIcon
            .tile(v-if='variant_map.instagram')
              .image
                img(src='./graphics/logos/instagram-logo.svg')
              .info
                .brand Instagram
                a.downloader(:href='variant_map.instagram')
                  | Download
                  DownloadIcon
            .tile(v-if='variant_map.twitter')
              .image
                img(src='./graphics/logos/twitter-logo.svg')
              .info
                .brand Twitter
                a.downloader(:href='variant_map.twitter')
                  | Download
                  DownloadIcon
            .tile(v-if='variant_map.facebook')
              .image
                img(src='./graphics/logos/facebook-logo.svg')
              .info
                .brand Facebook
                a.downloader(:href='variant_map.facebook')
                  | Download
                  DownloadIcon
            .tile(v-if='variant_map.powerpoint')
              .image
                img(src='./graphics/logos/powerpoint-logo.svg')
              .info
                .brand PowerPoint
                a.downloader(:href='variant_map.powerpoint' target='_blank')
                  | Download
                  DownloadIcon
        section
          p Or choose your prefered format.
          .tiles.files
            .tile
              .image
                img(:src='variant_map.left_image')
              .info
                .brand.mr-2 {{variant_map.left_text}}
                a.downloader(:href='variant_map.left' title='Download' target='_blank')
                  | Download
                  DownloadIcon
            .tile(v-if='variant_map.right_image')
              .image.mb-2
                img(:src='variant_map.right_image')
              .info
                .brand.mr-2 {{variant_map.right_text}}
                a.downloader(:href='variant_map.right' title='Download' target='_blank')
                  | Download
                  DownloadIcon
      .modal_footer
        .left
          a(href='#' @click='copyUrl()') 
            LinkIcon
            | Copy Asset URL
        .right(v-if='content_asset.download_url')
          a(:href='content_asset.download_url') 
            DownloadIcon
            | Download All Formats
</template>
<script lang='ts'>
import TimesIcon from './graphics/TimesIcon'
import DownloadIcon from './graphics/DownloadIcon'
import LinkIcon from './graphics/LinkIcon'
import EmbedIcon from './graphics/EmbedIcon'

export default {
  components: { TimesIcon, DownloadIcon, LinkIcon, EmbedIcon },
  data() {
    return {
      content_asset: null,
    }
  },
  computed: {
    variant_map() {
      if(this.content_asset.type == 'TestimonialAsset') {
        if(this.is_multipage_testimonial) {
          return {
            linkedin: this.variantUrl('TestimonialMultiPagePdfVariant'),
            instagram: this.variantUrl('TestimonialMultiPagePngVariant'),
            twitter: this.variantUrl('TestimonialSocial191PngVariant'),
            facebook: this.variantUrl('TestimonialSocial191PngVariant'),
            powerpoint: this.variantUrl('TestimonialSocial191PngVariant'),
            left: this.variantUrl('TestimonialSocial191PngVariant'),
            right: this.variantUrl('TestimonialPngVariant'),
            left_text: 'Styled Theme',
            right_text: 'Basic Theme',
            left_image: require('../static/testimonial_preview_styled_theme.png'),
            right_image: require('../static/testimonial_preview_basic_theme.png')
          }
        }
        else {
          return {
            linkedin: this.variantUrl('TestimonialSocial191PngVariant'),
            instagram: this.variantUrl('TestimonialSocial191PngVariant'),
            twitter: this.variantUrl('TestimonialSocial191PngVariant'),
            facebook: this.variantUrl('TestimonialSocial191PngVariant'),
            powerpoint: this.variantUrl('TestimonialSocial191PngVariant'),
            left: this.variantUrl('TestimonialSocial191PngVariant'),
            right: this.variantUrl('TestimonialPngVariant'),
            left_text: 'Styled Theme',
            right_text: 'Basic Theme',
            left_image: require('../static/testimonial_preview_styled_theme.png'),
            right_image: require('../static/testimonial_preview_basic_theme.png')
          }
        }
      }
      if(this.content_asset.type == 'StatAsset') {
        return {
          linkedin: this.variantUrl('StatSocial191PngVariant'),
          instagram: this.variantUrl('StatSocial191PngVariant'),
          twitter: this.variantUrl('StatSocial191PngVariant'),
          facebook: this.variantUrl('StatSocial191PngVariant'),
          powerpoint: this.variantUrl('StatSocial191PngVariant'),
          left: this.variantUrl('StatSocial191PngVariant'),
          right: this.variantUrl('StatPngVariant'),
          left_text: 'Styled Theme',
          right_text: 'Basic Theme',
          left_image: require('../static/stat_preview_styled_theme.png'),
          right_image: require('../static/stat_preview_basic_theme.png')
        }
      }
      if(this.content_asset.type == 'ChartAsset') {
        var basic_url = this.variantUrl('ChartPngVariant')
        // this will be null for horizontal charts
        var styled_url = this.variantUrl('ChartSocial11PngVariant')

        var left_image = styled_url ? require('../static/vertical_bar_chart_preview_styled_theme.png') : require('../static/vertical_bar_chart_preview_basic_theme.png')
        var right_image = styled_url ? require('../static/vertical_bar_chart_preview_basic_theme.png') : null

        var left_text = styled_url ? 'Styled Theme' : 'Basic Theme'
        var right_text = styled_url ? 'Basic Theme' : null
        return {
          linkedin: styled_url || basic_url,
          instagram: styled_url || basic_url,
          twitter: styled_url || basic_url,
          facebook: styled_url || basic_url,
          powerpoint: styled_url || basic_url,
          left: styled_url || basic_url,
          right: basic_url,
          left_text: left_text,
          right_text: right_text,
          left_image: left_image,
          right_image: right_image
        }
      }
      if(this.content_asset.type == 'CustomerSpotlightAsset') {
        return {
          linkedin: this.variantUrl('CustomerSpotlightMultiPagePdfVariant'),
          instagram: this.variantUrl('CustomerSpotlightMultiPagePngVariant'),
          twitter: this.variantUrl('CustomerSpotlightMultiPagePngVariant'),
          facebook: this.variantUrl('CustomerSpotlightMultiPagePngVariant'),
          powerpoint: this.variantUrl('CustomerSpotlightMultiPagePngVariant'),
          left: this.variantUrl('CustomerSpotlightMultiPagePngVariant'),
          right: this.variantUrl('PdfVariant'),
          left_text: 'Zip File of PNGs',
          right_text: 'Full Page PDF',
          left_image: require('../static/multi_page_spotlight.png'),
          right_image: require('../static/customer_spotlight_preview_image.png')
        }
      }
      if(this.content_asset.type == 'SurveySpotlightAsset') {
        return {
          linkedin: this.variantUrl('SurveySpotlightMultiPagePdfVariant'),
          instagram: this.variantUrl('SurveySpotlightMultiPagePngVariant'),
          twitter: this.variantUrl('SurveySpotlightMultiPagePngVariant'),
          facebook: this.variantUrl('SurveySpotlightMultiPagePngVariant'),
          powerpoint: this.variantUrl('SurveySpotlightMultiPagePngVariant'),
          left: this.variantUrl('SurveySpotlightMultiPagePngVariant'),
          right: this.variantUrl('PdfVariant'),
          left_text: 'Zip File of PNGs',
          right_text: 'Full Page PDF',
          left_image: require('../static/multi_page_spotlight.png'),
          right_image: require('../static/customer_spotlight_preview_image.png')
        }
      }
    },
    asset_type() {
      switch(this.content_asset.type) {
        case 'ChartAsset':
          return 'Chart'
        case 'StatAsset':
          return 'Stat'
        case 'TestimonialAsset':
          return 'Testimonial'
        case 'CustomerSpotlightAsset':
          return 'Customer Spotlight'
        case 'SurveySpotlightAsset':
          return 'Survey Spotlight'
      }
    },
    is_multipage_testimonial() {
      return this.content_asset.variants.find(v => v.type.indexOf('MultiPage') > 0)
    },
  },
  methods: {
    copyUrl() {
      navigator.clipboard.writeText(`https://uevi.co/${this.content_asset.identifier}`)
      this.$toast('Asset URL copied to clipboard')
    },
    variantUrl(variant_type) {
      var append = variant_type.indexOf('MultiPagePng') > 0 ? '.zip' : '?d='
      console.log(variant_type, append);
      
      var variant = this.content_asset.variants.find(v => v.type == variant_type)
      return variant ? variant.the_url + append : null
    },
    beforeOpen(e) {
      this.content_asset = e.params.content_asset
    }
  }
}
</script>
<style lang='sass' scoped>
  p
    margin-bottom: 20px
  h5
    margin-bottom: 10px
    color: #6c7f89
  section
    margin-bottom: 20px
  .tiles
    display: flex
    justify-content: space-between
    .tile
      border-radius: 16px
      border: 1px solid #dfe8ec
      text-align: center
      .image
        border-radius: 16px 16px 0 0
        background: #f2f6f7
        padding: 20px
        img
          width: 37%
      .info
        padding: 15px
        .brand
          margin-bottom: 6px
          font-size: 15px
      .downloader
        font-family: 'Inter-ExtraBold'
        font-size: 14px
        color: #48555b
        svg
          margin-left: 6px

  .files
    .tile
      width: 49%
    .downloaders
      display: flex
      justify-content: space-around
  .modal_footer
    padding-top: 20px
    a
      font-family: 'Inter-ExtraBold'
      font-size: 14px
      color: #48555b
      svg
        margin-right: 6px
    justify-content: space-between
    .left
      a
        margin-right: 12px
</style>
