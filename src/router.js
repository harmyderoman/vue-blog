import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Myblog from './views/Myblog.vue'
import Newpost from './views/Newpost.vue'
import Signup from './views/Signup.vue'
import Login from './views/Login.vue'
import Post from './views/Post.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/post/:id',
      name: 'Post',
      component: Post
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/myblog',
      name: 'myblog',
      component: Myblog
    },
    {
      path: '/newpost',
      name: 'newpost',
      component: Newpost
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ],
  mode: 'history'
})
