<template lang='pug'>
  modal(name='advanced_share_asset_modal' height='660' width='688')
    .modal_container
      .modal_header
        h2 Share {{spotlight_type}}
        .closer(@click='$modal.hide("advanced_share_asset_modal")')
          TimesIcon
      .modal_body
        p Select the destination where you’ll be sharing the content asset, and you’ll receive optimized files for that platform.
        section(v-if='has_platforms')
          h5 Platforms
          .tiles.platforms
            .tile(v-if='multipage_pdf_url')
              .image
                img(src='./graphics/logos/linkedin-logo.svg')
              .info
                .brand LinkedIn
                a.downloader(:href='multipage_pdf_url' target='_blank')
                  | Download
                  DownloadIcon
            .tile(v-if='multipage_png_url')
              .image
                img(src='./graphics/logos/instagram-logo.svg')
              .info
                .brand Instagram
                a.downloader(:href='multipage_png_url')
                  | Download
                  DownloadIcon
            .tile(v-if='multipage_png_url')
              .image
                img(src='./graphics/logos/twitter-logo.svg')
              .info
                .brand Twitter
                a.downloader(:href='multipage_png_url')
                  | Download
                  DownloadIcon
            .tile(v-if='multipage_png_url')
              .image
                img(src='./graphics/logos/facebook-logo.svg')
              .info
                .brand Facebook
                a.downloader(:href='multipage_png_url')
                  | Download
                  DownloadIcon
            .tile(v-if='multipage_pdf_url')
              .image
                img(src='./graphics/logos/powerpoint-logo.svg')
              .info
                .brand PowerPoint
                a.downloader(:href='multipage_pdf_url' target='_blank')
                  | Download
                  DownloadIcon
        section
          h5 Files
          .tiles.files
            .tile(v-if='title_png_url || multipage_png_url')
              .image
                img(src='./graphics/png-icon.svg')
              .info
                .brand PNG
                .downloaders
                  a.downloader(:href='title_png_url' target='_blank' v-if='title_png_url && is_testimonial')
                    | Title Slide
                    DownloadIcon
                  a.downloader(:href='multipage_png_url' v-if='multipage_png_url && !is_testimonial')
                    | {{png_file_text}}
                    DownloadIcon
            .tile(v-if='!is_testimonial')
              .image
                img(src='./graphics/pdf-icon.svg')
              .info
                .brand PDF
                .downloaders
                  a.downloader(:href='pdf_url' target='_blank' v-if='pdf_url')
                    | {{pdf_file_text}}
                    DownloadIcon
      .modal_footer
        .left
          a(href='#' @click='copyUrl()') 
            LinkIcon
            | Copy Asset URL
          //- a(@click='')
            EmbedIcon
            | Copy Embed Code
        .right
          a(:href='`/content_assets/${content_asset.identifier}.zip`') 
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
  props: ['content_asset'],
  mounted() {
  },
  computed: {
    has_platforms() {
      return this.multipage_pdf_url && this.multipage_png_url
    },
    spotlight_type() {
      switch(this.content_asset.type) {
        case 'TestimonialAsset':
          return 'Testimonial'
        case 'CustomerSpotlightAsset':
          return 'Customer Spotlight'
        case 'SurveySpotlightAsset':
          return 'Survey Spotlight'
      }
    },
    png_file_text() {
      return this.content_asset.type.indexOf('Spotlight') > 0 ? 'Full Report' : 'Title Slide'
    },
    pdf_file_text() {
      return this.content_asset.type.indexOf('Spotlight') > 0 ? 'Full Report' : 'Full Document'
    },
    title_png_url() {
      var variant = this.content_asset.variants.find(v => v.type.indexOf('TitlePngVariant') > 0 || v.type == 'TestimonialPngVariant')
      if(variant)
        return `${variant.the_url}?d=`
    },
    multipage_pdf_url() {
      var variant = this.content_asset.variants.find(v => v.type.indexOf('MultiPagePdfVariant') > 0)
      if(variant)
        return `${variant.the_url}?d=`
    },
    multipage_png_url() {
      var variant = this.content_asset.variants.find(v => v.type.indexOf('MultiPagePngVariant') > 0)
      if(variant)
        return `${variant.the_url}.zip`
    },
    pdf_url() {
      var variant = this.content_asset.variants.find(v => v.type.indexOf('PdfVariant') >= 0)
      if(variant)
        return `${variant.the_url}?d=`
    },
    is_testimonial() {
      return this.content_asset.type.indexOf('Testimonial') >= 0
    }
  },
  methods: {
    copyUrl() {
      navigator.clipboard.writeText(`https://uevi.co/${this.content_asset.identifier}`)
      this.$toast('Asset URL copied to clipboard')
    },
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
