import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'



Vue.use(Vuetify, {
  options: {
    customProperties: true
  },
  iconfont: 'md',
  theme:  {
    primary: '#009688',
    secondary: '#cddc39',
    accent: '#ff5722',
    error: '#e91e63',
    warning: '#9c27b0',
    info: '#ffeb3b',
    success: '#4caf50'
    }

})
