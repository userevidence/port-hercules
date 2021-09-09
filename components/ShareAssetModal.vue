<template lang='pug'>
  modal(name='share_asset_modal' height='auto' width='40%')
    .modal_container
      .modal_header
        .d-flex.justify-content-between.align-items-center
          h2 Share Asset
          .closer(@click='$modal.hide("share_asset_modal")')
            TimesIcon
      .modal_body
        .pdf(v-if='pdf_variant')
          h3.mb-3 PDF
          a.download-button(:href='`/variants/${pdf_variant.id}`' target='_blank')
            .d-flex.justify-content-between.align-items-center
              PdfIcon
              div Download PDF
              DownloadIcon
                
        .pngs(v-if='pngs.length > 0')
          h3.mb-3 PNG
          div(v-if='multiple_pngs')
            .mb-3 Select where you'll be sharing this testimonial to receive an optimzed PNG for that environment.
          b-row
            b-col(v-for='variant in pngs')
              a.download-card(:href='`/variants/${variant.id}`' target='_blank')
                ImgIcon.mb-2
                .mb-3(v-if='variant.type == "UePngVariant"')
                  h3 Slide Presentation
                  h4 (16:9 Aspect Ratio)
                .mb-3(v-if='variant.type == "Social191PngVariant"')
                  h3 Social Media
                  h4 (2:1 Aspect Ratio)
                b
                  | Download PNG 
                  DownloadIcon
</template>
<script>
import DownloadIcon from 'src/port-hercules/components/graphics/DownloadIcon'
import TimesIcon from 'src/port-hercules/components/graphics/TimesIcon'
import ImgIcon from 'src/port-hercules/components/graphics/ImgIcon'
export default {
  components: { DownloadIcon, ImgIcon, TimesIcon },
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
  a.download-button
    border: 1px solid #E6ECEF
    box-shadow: inset 0px -1px 0px rgba(125, 149, 161, 0.08)
    border-radius: 10px
    padding: 13px 16px
    color: black
    display: block
    &:hover
      cursor: pointer
  a.download-card
    border: 1px solid #E6ECEF
    box-shadow: inset 0px -1px 0px rgba(125, 149, 161, 0.08)
    border-radius: 10px
    padding: 13px 16px
    display: block
    text-align: center
    h3
      font-size: 15px
      color: #131516
    h4
      font-family: 'Inter-ExtraBold'
      font-size: 12px
      color: #6C7F89
    b
      display: flex
      justify-content: space-around
      font-family: 'Inter-Medium'
      font-size: 15px
      color: #131516
    &:hover
      text-decoration: none
      border: 1px solid $uePurple
</style>  
