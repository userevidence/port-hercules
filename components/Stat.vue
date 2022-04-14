<template lang="pug">
  .content_asset_container.content_asset(v-if='content_asset' :class='{ dark_text: content_asset.account.dark_text }')
    .stat_header
      .mb-4(v-if='content_asset.stat_type == "star_rating"')
        StarIcons(:stars='headline' :account='content_asset.account')
      h2(v-else v-html='headline' :style='`color: ${content_asset.account.brand_color_1};`')
      h3(v-html='sentence')
    
    AssetFooter(:content_asset='content_asset')
</template>
<script>
import AssetFooter from './AssetFooter.vue'
import StarIcons from './graphics/StarIcons'

export default {
  name: 'Stat',
  props: ['content_asset'],
  components: { StarIcons, AssetFooter },
  computed: {
    headline() {
      return this.content_asset.headline || this.content_asset.rendered_headline
    },
    sentence() {
      return this.content_asset.sentence || this.content_asset.rendered_sentence
    },
  }
}
</script>
<style lang='sass' scoped>
  *
    font-family: 'Inter', sans-serif

  .content_asset_container
    background: white
    padding: 24px
    border: 1px solid hsl(200, 24%, 90%)
    border-radius: 24px
    display: flex
    flex-wrap: wrap

  .stat_header
    h2
      font-size: 30px
      line-height: 22px
      letter-spacing: -0.015em
      text-transform: capitalize
      color: #131516
      margin: 0px 2px 16px 0
    h3
      margin: 0
      padding: 0
      font-weight: 400
      font-size: 16px
      line-height: 23px
      letter-spacing: -0.015em
      color: #131516

  .star_icons
    svg
      height: 32px
      width: 32px

  h2, .ueid_container .url a
    font-weight: 800
    font-family: 'Inter-Extrabold', sans-serif
          
  .dark_text
    .stat_header h2
      color: hsl(200, 8%, 8%) !important
</style>
