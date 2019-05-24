import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Myblog from './views/Myblog.vue'
import Newpost from './views/Newpost.vue'
import Signup from './views/Signup.vue'
import Login from './views/Login.vue'
import Post from './views/Post.vue'
import Guard from './router-guard'
import Calendar from './views/Calendar.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/post/:author/:id',
      props: true,
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
      component: Myblog,
      beforeEnter: Guard
    },
    {
      path: '/newpost',
      name: 'newpost',
      component: Newpost,
      beforeEnter: Guard
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/calendar',  // For
      name: 'calendar',   // Training 
      component: Calendar // Porpose only!!!
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
