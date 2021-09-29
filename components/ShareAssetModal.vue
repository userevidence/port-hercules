<template lang='pug'>
  modal(name='share_asset_modal' height='624' width='688')
    .modal_container
      .modal_header
        h2 Share Content Asset
        .closer(@click='$modal.hide("share_asset_modal")')
          TimesIcon
      .modal_body                
        .downloads(v-if='pngs.length > 0')(v-for='variant in pngs')
          .download_card
            figure.download_preview.stat_preview_image_basic
            .download_text
              .header
                h3 Basic Theme
                .download_buttons
                  a.span(title='Download Basic Theme Asset as PDF')(:href='`/variants/${variant.id}`' target='_blank')
                    | PDF
                    DownloadIcon
                  a.span(title='Download Basic Theme Asset as PNG')(:href='`/variants/${variant.id}`' target='_blank')
                    | PNG
                    DownloadIcon
              p With a simple, rounded border design, this theme is best suited for slide decks and text documents.
  
          .download_card
            figure.download_preview.stat_preview_image_styled
            .download_text
              .header
                h3 Styled Theme
                .download_buttons
                  a.span(title='Download Styled Theme Asset as PDF')(:href='`/variants/${variant.id}`' target='_blank')
                    | PDF
                    DownloadIcon
                  a.span(title='Download Styled Theme Asset as PNG')(:href='`/variants/${variant.id}`' target='_blank')
                    | PNG
                    DownloadIcon
              p Featuring a modern, colorful design, this theme is best suited for social media posts and marketing emails.

      .modal_footer
        span
          LinkIcon
          | Copy Asset URL
        span
          EmbedIcon
          | Copy Embed Code
</template>
<script>
import DownloadIcon from 'src/port-hercules/components/graphics/DownloadIcon'
import LinkIcon from 'src/port-hercules/components/graphics/LinkIcon'
import EmbedIcon from 'src/port-hercules/components/graphics/EmbedIcon'
import TimesIcon from 'src/port-hercules/components/graphics/TimesIcon'
export default {
  components: { DownloadIcon, LinkIcon, EmbedIcon, TimesIcon },
  props: ['content_asset'],
  computed: {
    pdf_variant() {
      return this.content_asset.variants.find(v => v.type == 'PdfVariant')
    },
    pngs() {
      return this.content_asset.variants.filter(v => ['UePngVariant', 'Social191PngVariant'].includes(v.type))
    },
    multiple_pngs() {
      return this.content_asset.variants.filter(v => ['UePngVariant', 'Social191PngVariant'].includes(v.type)).length > 1
    },
    
  }
}
</script>
<style lang='sass' scoped>
  .downloads
    display: flex
    margin: 0 auto
    max-width: 640px
    overflow-y: scroll
  .download_card
    height: 464px
    min-width: 312px
    max-width: 312px
    margin-bottom: 16px
    margin-left: auto
    margin-right: auto
    border: 1px solid hsl(200, 24%, 90%)
    border-radius: 24px
    display: block
    overflow: hidden
    &:not(:last-child)
      margin-right: 16px
    .download_preview
      width: 312px
      height: 312px
      background-color: hsl(200, 24%, 96%)
      background-size: cover
      background-repeat: no-repeat
      margin: 0
    .testimonial_preview_image_basic
      background-image: url('./graphics/share_modal_images/testimonial_preview_basic_theme.png')
    .testimonial_preview_image_styled
      background-image: url('./graphics/share_modal_images/testimonial_preview_styled_theme.png')
    .stat_preview_image_basic
      background-image: url('./graphics/share_modal_images/stat_preview_basic_theme.png')
    .stat_preview_image_styled
      background-image: url('./graphics/share_modal_images/stat_preview_styled_theme.png')
    .vertical_bar_chart_preview_image_basic
      background-image: url('./graphics/share_modal_images/vertical_bar_chart_preview_basic_theme.png')
    .vertical_bar_chart_preview_image_styled
      background-image: url('./graphics/share_modal_images/vertical_bar_chart_preview_styled_theme.png')
    .download_text
      padding: 24px
      .header
        display: inline-flex
        justify-content: space-between
        align-items: center
        width: 100%
        line-height: 1
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
        h3
          font-size: 15px
          font-weight: 500
          line-height: 12px
          letter-spacing: -0.02em
      p
        color: #6C7F89
        font-size: 14px
        font-weight: 400
        line-height: 20px
        margin-top: 16px
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
