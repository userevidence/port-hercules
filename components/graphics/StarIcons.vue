<template lang='pug'>
  .star_icons
    Star100(v-for='i in star_count' :key='i' :style='star_gradient')
    component(:is='star_fraction')
</template>
<script>
import Star25 from './Star25'
import Star50 from './Star50'
import Star75 from './Star75'
import Star100 from './Star100'
export default {
  props: ['stars', 'account'],
  components: { Star100, Star75, Star50, Star25 },
  mounted() {
    this.brand_color_1 = this.account.brand_color_1 || '#850AFF'
    this.brand_color_2 = this.account.brand_color_3 || '#850AFF'
  },
  data() {
    return {
      brand_color_1: '#850AFF',
      brand_color_2: '#850AFF',
    }
  },
  computed: {
    star_count() {
      return Math.floor(this.stars)
    },
    star_fraction() {
      var fraction = this.stars - this.star_count
      console.log(fraction);
      
      if(fraction == 0)
        return null
      else if(fraction<.5)
        return 'Star25'
      else if(fraction<.7)
        return 'Star50'
      else if(fraction<1)
        return 'Star75'
      else
        return 'Star100'
    },
    star_gradient() {
      return `fill: linear-gradient(180deg, ${this.brand_color_1} 0%, ${this.brand_color_2} 100%)`
    },
  },
}
</script>
<style lang='sass'>
  .star_icons
    margin-bottom: 16px
    svg
      height: 48px
      width: 48px
      &:not(:last-child)
        margin-right: 8px
  .cover
    position: absolute
    background: white
    height: 32px
    right: 0
</style>
