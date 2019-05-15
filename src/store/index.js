import Vue from 'vue'
import Vuex from 'vuex'
import posts from './posts'
// import author from './author'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        posts
    }
})