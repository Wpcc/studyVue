// 引入vue
import Vue from 'vue';
import login from './login.vue';
console.log(login);
new Vue({
  el:'#app',
  render(c){
    return c(login);
  }
})
