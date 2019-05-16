import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import * as fb from 'firebase'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    
    fb.initializeApp({
      apiKey: "-s",
      authDomain: "vue-blog-journal.firebaseapp.com",
      databaseURL: "https://vue-blog-journal.firebaseio.com",
      projectId: "vue-blog-journal",
      storageBucket: "vue-blog-journal.appspot.com",
      messagingSenderId: "46284764099",
      appId: ""
    })
  },
}).$mount('#app')
