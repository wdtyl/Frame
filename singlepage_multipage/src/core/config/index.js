import Vue from 'vue'
import '@babel/polyfill';
import { Loading,Slider } from 'vant';

Vue.use(Loading).use(Slider);
Vue.mixin({
    components: {
        
    },
    data: function() {
        return {
            
        };
    }
  });
Vue.config.productionTip = false