<template lang='pug'>
  modal(name='share_asset_modal' height='624' width='688')
    .modal_container
      .modal_header
        h2 Share Content Asset
        .closer(@click='$modal.hide("share_asset_modal")')
          TimesIcon
      .modal_body
        .download_container
          .downloads(:class='download_class')
            .download(v-if='basic_variant')
              .preview
                img(:src='variantImage(basic_variant)')
              .text
                .header
                  h3 Basic Theme
                  .buttons
                    a(:href='variantUrl(basic_variant)' title='Download PNG' target='_blank')
                      | PNG
                      DownloadIcon
                p With a simple, rounded border design, this theme is best suited for slide decks and text documents.
            .download(v-if='styled_png_variant')
              .mutli_tag(v-if='styled_png_variant.page_count') {{pageCountTag(styled_png_variant)}}
              .preview
                img(:src='variantImage(styled_png_variant)')
              .text
                .header
                  h3 Styled Theme
                  .buttons
                    a(:href='variantUrl(pdf_variant)' title='Download PDF' target='_blank' v-if='pdf_variant')
                      | PDF
                      DownloadIcon
                    a.span(:href='variantUrl(styled_png_variant)' title='Download PNG' target='_blank')
                      | PNG
                      DownloadIcon
                p Featuring a modern, colorful design, this theme is best suited for social media posts and marketing emails.
            .download(v-if='customer_spotlight_variant')
              .preview
                img(src='../static/customer_spotlight_preview_image.png')
              .text
                .header
                  h3 Customer Spotlight
                  .buttons
                    a.span(:href='variantUrl(customer_spotlight_variant)' title='Download PDF' target='_blank')
                      | PDF
                      DownloadIcon
                p Download and share the Customer Spotlight with customers.
      .modal_footer
        a(@click='copyUrl') 
          LinkIcon
          | Copy Asset URL
        a(@click='copySnippet()' v-if='copyable_variant')
          EmbedIcon
          | Copy Embed Code
</template>
<script>
import DownloadIcon from './graphics/DownloadIcon'
import LinkIcon from './graphics/LinkIcon'
import EmbedIcon from './graphics/EmbedIcon'
import TimesIcon from './graphics/TimesIcon'

export default {
  components: { DownloadIcon, LinkIcon, EmbedIcon, TimesIcon },
  props: ['content_asset'],
  computed: {
    basic_variant() {
      return this.content_asset.variants.find(v => ['TestimonialPngVariant', 'StatPngVariant', 'ChartPngVariant'].includes(v.type))
    },
    pdf_variant() {
      return this.content_asset.variants.find(v => v.type.indexOf('PdfVariant') >= 0)
    },
    styled_png_variant() {
      return this.content_asset.variants.find(v => ['ChartSocial11PngVariant', 'StatSocial191PngVariant', 'TestimonialMultiPagePngVariant', 'TestimonialSocial191PngVariant'].includes(v.type))
    },
    customer_spotlight_variant() {
      if(this.content_asset.type == 'CustomerSpotlightAsset')
        return this.content_asset.variants.find(v => ['PdfVariant'].includes(v.type))
      else 
        return null
    },
    copyable_variant() {
      return this.basic_variant
    },
    download_class() {
      return this.content_asset.variants.count == 1 ? 'single' : ''
    },
    url() {
      return `${window.location.protocol}://${window.location.host}/`
    },
  },
  methods: {
    isPng(variant) {
      return variant.type.indexOf('Png') > 0
    },
    isPdf(variant) {
      return variant.type == 'PdfVariant'
    },
    variantUrl(variant) {
      if(variant.type == 'TestimonialMultiPagePngVariant')
        return `${variant.the_url}.zip`
      else
        return `${variant.the_url}?d=`
    },
    variantImage(variant) {
      switch(variant.type) {
        case 'ChartPngVariant':
          return require('../static/vertical_bar_chart_preview_basic_theme.png')
        case 'StatPngVariant':
          return require('../static/stat_preview_basic_theme.png')
        case 'TestimonialPngVariant':
          return require('../static/testimonial_preview_basic_theme.png')
        case 'ChartSocial11PngVariant':
          return require('../static/vertical_bar_chart_preview_styled_theme.png')
        case 'StatSocial191PngVariant':
          return require('../static/stat_preview_styled_theme.png')
        case 'TestimonialMultiPagePngVariant':
        case 'TestimonialMultiPagePdfVariant':
          return require('../static/testimonial_preview_styled_theme.png')
        case 'TestimonialSocial191PngVariant':
          return require('../static/testimonial_preview_styled_theme.png')
      }

    },
    copyUrl() {
      navigator.clipboard.writeText(`https://uevi.co/${this.content_asset.identifier}`)
      this.$toast('Asset URL copied to clipboard')
    },
    copySnippet() {
      var snippet = `<iframe src='${window.location.protocol}//${window.location.host}/content_assets/${this.content_asset.id}/raw' width='${this.copyable_variant.width/2}' height='${this.copyable_variant.height/2}' frameBorder='0'></iframe>`
      navigator.clipboard.writeText(snippet)
      this.$toast('Embed Code copied to clipboard')
    },
    pageCountTag(variant) {
      if(variant.page_count > 1)
        return `${variant.page_count} Images`
      else
        return `${variant.page_count} Image`
      
    }
  }
}
</script>
<style lang='sass' scoped>
  .download_container  
    position: relative
    //height: 470px
    overflow-y: auto
  .downloads
    display: flex
    justify-content: space-between
    margin: 0 auto
    flex-wrap: wrap
    &.single
      justify-content: space-around
  .download
    position: relative
    width: 312px
    //margin-bottom: 16px
    border: 1px solid hsl(200, 24%, 90%)
    border-radius: 24px
    overflow: hidden
    .mutli_tag
      position: absolute
      top: 12px
      right: 12px
      border: 1px solid #DFE8EC
      border-radius: 15px
      padding: 6px 12px 
      background: white
      font: normal 12px 'Inter-Regular'
      letter-spacing: -0.015em
    .preview
      background-color: hsl(200, 24%, 96%)
      img
        width: 100%
    .text
      padding: 24px
      .buttons
        display: flex
        align-items: center
        line-height: 1
        a
          color: hsl(200, 12%, 32%)
          font-size: 14px
          font-weight: 800
          font-family: 'Inter-ExtraBold', sans-serif
          line-height: 1
          letter-spacing: -0.015em
          display: flex
          &:not(:last-child)
            margin-right: 16px
          &:hover
            color: hsl(200, 8%, 8%)
            cursor: pointer
            text-decoration: none
            svg ::v-deep path
              stroke: hsl(270, 100%, 52%)
          svg
            margin-left: 6px
      .header
        display: flex
        justify-content: space-between
        align-items: center
        line-height: 1
        h3
          font-size: 15px
          font-weight: 500
          line-height: 12px
          letter-spacing: -0.02em
          margin: 0
          font-family: 'Inter-Regular'
        .download_buttons
          display: flex
          align-items: center
          line-height: 1
          a.span
            color: hsl(200, 12%, 32%)
            font-size: 14px
            font-weight: 800
            font-family: 'Inter-ExtraBold', sans-serif
            line-height: 1
            letter-spacing: -0.015em
            &:not(:last-child)
              margin-right: 16px
            &:hover
              color: hsl(200, 8%, 8%)
              cursor: pointer
              text-decoration: none
              svg ::v-deep path
                stroke: hsl(270, 100%, 52%)
            svg
              margin-left: 6px
      p
        color: #6C7F89
        font-size: 14px
        font-weight: 400
        line-height: 20px
        margin: 16px 0 0 0
      &:hover
        text-decoration: none
        cursor: default
  .modal_footer
    a
      font-size: 13px
      font-weight: 800
      font-family: 'Inter-ExtraBold', sans-serif
      letter-spacing: -0.015em
      line-height: 1
      color: hsl(200, 12%, 32%)
      background: white
      display: flex
      svg
        margin-right: 8px
      &:not(:last-child)
        margin-right: 24px
      &:hover
        cursor: pointer
        color: hsl(200, 8%, 8%)
        ::v-deep svg path, ::v-deep svg circle
          stroke: hsl(270, 100%, 52%)
</style>  
