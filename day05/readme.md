## watch
Vue 实例中的 watch 主要是为了监听 Vue 属性的变化，当 Vue 属性的值发送变化的时候会相应的触发监听事件。
- 监听数据函数中的两个参数 `newData` 和 `oldData` 分别代表更新之后的数据和更新之前的数据。

### 监听数据
当数据发生变化的时候，发相应的触发 watch 中对应的事件
```JavaScript
var vm = new Vue({
  el:'#app',
  data:{
    firstName:'',
    lastName:'',
    fullName:''
  },
  watch:{
    firstName:function(newData,oldData){
      //其中 newData 是更新后的数据，而 oldData 是更新之前的数据
    }
  }
})
```
### 监听路由中的路径
当路径发生变化的时候，通过`$route.path`属性能够触发 url 改变时候的监听事件。
```JavaScript
var vm = new Vue({
  el:'#app',
  router,
  watch:{
    $route.path:function(newData){
      console.log(newData)
    }
  }
})
```
## computed
computed出现的原因在于 data 中的数据是无法做处理的，例如：
```JavaScript
var vm = new Vue({
  el:'#app',
  data:{
    firstName:'',
    lastName:'',
    // 报错 data 中的数据无法计算
    fullName:this.firstName + this.lastName
  }
})
```
这个时候就需要能够计算的 data 值， Vue 实例通过 computed 属性从而对 data 进行功能补充。
- computed 在计算完毕后，如果没有数据更新，会将计算完毕的数据进行缓存从而提高性能。
```JavaScript
var vm = new Vue({
  el:'#app',
  data:{
    firstName:'',
    lastName:'',
  },
  computed:{
    'fullName':function(){
      return this.firstName + this.lastName
    }
  }
})
```
