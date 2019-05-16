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
      apiKey: "AIzaSyB2k3fvrjS7fB2JmUr4RbroZ_ZYrBv9h-s",
      authDomain: "vue-blog-journal.firebaseapp.com",
      databaseURL: "https://vue-blog-journal.firebaseio.com",
      projectId: "vue-blog-journal",
      storageBucket: "vue-blog-journal.appspot.com",
      messagingSenderId: "46284764099",
      appId: "1:46284764099:web:9965c1db71ae8a79"
    })
  },
}).$mount('#app')
