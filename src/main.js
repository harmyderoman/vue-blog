import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import * as fb from 'firebase'
import {firebaseConfig} from './apifb'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    fb.initializeApp(firebaseConfig)
    fb.auth().onAuthStateChanged(user => {
      if(user){
        this.$store.dispatch('autoLoginUser', user)
      }
    })
    this.$store.dispatch('fetchPosts')
  },
}).$mount('#app')
