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
            .download(v-for='variant in content_asset.variants')
              .mutli_tag(v-if='variant.page_count') {{pageCountTag(variant)}}
              
              .preview
                img(:src='variantImage(variant)')
              .text
                .header
                  h3(v-if='content_asset.type == "CustomerSpotlightAsset"') Customer Spotlight
                  h3(v-else-if='isBasic(variant)') Basic Theme
                  h3(v-else) Styled Theme
                  .buttons
                    a.span(:href='variantUrl(variant)' title='Download PDF' target='_blank' v-if='isPdf(variant)')
                      | PDF
                      DownloadIcon
                    a.span(:href='variantUrl(variant)' title='Download PNG' target='_blank' v-if='isPng(variant)')
                      | PNG
                      DownloadIcon
                p(v-if='content_asset.type == "CustomerSpotlightAsset"') Download and share the Customer Spotlight with customers.
                p(v-else-if='isBasic(variant)') With a simple, rounded border design, this theme is best suited for slide decks and text documents.
                p(v-else) Featuring a modern, colorful design, this theme is best suited for social media posts and marketing emails.
      .modal_footer
        span(@click='copyUrl') 
          LinkIcon
          | Copy Asset URL
        span(@click='copySnippet()' v-if='copyable_variant')
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
    pdf_variant() {
      return this.content_asset.variants.find(v => v.type == 'PdfVariant')
    },
    copyable_variant() {
      return this.content_asset.variants.find(v => ['TestimonialPngVariant', 'StatPngVariant', 'ChartPngVariant'].includes(v.type))
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
    isBasic(variant) {
      return ['TestimonialPngVariant', 'ChartPngVariant', 'StatPngVariant'].includes(variant.type) ? true : false
    },
    variantUrl(variant) {
      if(variant.type == 'TestimonialMultiPagePngVariant')
        return `${variant.the_url}.zip`
      else
        return `${variant.the_url}?d=`
    },
    variantImage(variant) {
      if(this.content_asset.type == 'TestimonialAsset')
        return require(this.isBasic(variant) ? `../static/testimonial_preview_basic_theme.png` : `../static/testimonial_preview_styled_theme.png`)
      if(this.content_asset.type == 'StatAsset')
        return require(this.isBasic(variant) ? `../static/stat_preview_basic_theme.png` : `../static/stat_preview_styled_theme.png`)
      if(this.content_asset.type == 'ChartAsset')
        return require(this.isBasic(variant) ? `../static/vertical_bar_chart_preview_basic_theme.png` : `../static/vertical_bar_chart_preview_styled_theme.png`)
      if(this.content_asset.type == 'CustomerSpotlightAsset')
        return require(`../static/customer_spotlight_preview_image.png`)
    },
    copyUrl() {
      navigator.clipboard.writeText(`https://uevi.co/${this.content_asset.identifier}`)
      this.$toast('Asset URL Copied to Clipboard')
    },
    copySnippet() {
      var snippet = `<iframe src='${window.location.protocol}//${window.location.host}/content_assets/${this.content_asset.id}/raw' width='${this.copyable_variant.width/2}' height='${this.copyable_variant.height/2}' frameBorder='0'></iframe>`
      navigator.clipboard.writeText(snippet)
      this.$toast('Snippet Copied to Clipboard')
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
    height: 470px
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
    margin-bottom: 16px
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
    span
      font-size: 13px
      font-weight: 800
      font-family: 'Inter-ExtraBold', sans-serif
      letter-spacing: -0.015em
      line-height: 1
      color: hsl(200, 12%, 32%)
      background: white
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
