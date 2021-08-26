/* eslint-disable import/prefer-default-export */
import '@/styles/port-hercules.sass'

// import GlobalStyle from 'port-hercules'

import GlobalStyle from  '../styles/typeography';
import BarPreview from './BarPreview.vue';
import Bar from './Bar.vue';
import Stat from './Stat.vue';
import Testimonial from './Testimonial.vue';
import CustomerSpotlightPreview from './CustomerSpotlightPreview.vue';


console.log('GlobalStyle', GlobalStyle);

export { BarPreview, Bar, Stat, Testimonial, CustomerSpotlightPreview, GlobalStyle }
