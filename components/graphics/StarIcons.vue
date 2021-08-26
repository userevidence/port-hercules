<template lang='pug'>
  .star_icons
    Star100(v-for='i in star_count' :key='i')
    component(:is='star_fraction')
</template>
<script>
import Star25 from '@/components/graphics/Star25.vue'
import Star50 from '@/components/graphics/Star50.vue'
import Star75 from '@/components/graphics/Star75.vue'
import Star100 from '@/components/graphics/Star100.vue'
export default {
  props: ['stars'],
  components: { Star100, Star75, Star50, Star25 },
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
    }
    
  },
}
</script>
<style lang='sass'>
  .star_icon
    width: 32px
    height: 32px
    position: relative
  .cover
    position: absolute
    background: white
    height: 32px
    right: 0
  .star
    position: absolute
    border: 3px solid red
</style>
