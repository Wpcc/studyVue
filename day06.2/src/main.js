// 引入vue
import Vue from 'vue';
import VueRouter from 'vue-router'

import app from './app.vue'
import login from './main/login.vue'
import register from './main/register.vue'
import hello from './mainChi/hello.vue'
import world from './mainChi/world.vue'

Vue.use(VueRouter)

var router = new VueRouter({
  routes:[
    {
      path:'/login',
      component:login,
      children:[
        {path:'hello',component:hello},
        {path:'world',component:world},
      ]
    },
    {path:'/register',component:register},
  ]
})
new Vue({
  el:'#app',
  render(c){
    return c(app);
  },
  router
})
