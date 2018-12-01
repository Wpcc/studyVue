// 自定义 vue 的插件
(function(){
  // 定义一个插件对象
  const MyPlugin = {};
  MyPlugin.install = function (Vue, options) {
    // 1. 添加全局方法或属性
    Vue.myGlobalMethod = function () {
      console.log('vue 函数对象的方法');
    }

    // 2. 添加全局资源
    Vue.directive('my-directive',function(el,binding){
      // 定义一个指令
      el.textContent = binding.value.toUpperCase();
    })

    // 3. 注入组件
    Vue.mixin({
      created: function () {
        // 逻辑...
      }
    })

    // 4. 添加实例方法
    Vue.prototype.$myMethod = function (methodOptions) {
      console.log('vue 实例方法');
    }
  }
  // 向外暴露 MyPlugin 方法
  window.MyPlugin = MyPlugin;
})()
