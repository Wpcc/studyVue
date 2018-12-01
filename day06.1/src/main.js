// 引入vue
import Vue from 'vue';
import login from './login.vue';

new Vue({
  el:'#app',
  render(c){
    return c(login);
  }
})
