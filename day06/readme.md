## webpack中的vue
### 组件渲染的两种方式
- components注册
```html
  <div class="app">
    <login></login>
  </div>
```
```JavaScript
var login = {
  template:'<h1>这是一个login组件</h1>'
}
var vm = new Vue({
  el:'#app',
  components:{
    login
  }
})
```
- render替换
  - render方法提供一个回调函数，该回调函数会按照组件字面量创建一个dom节点并替换el中的DOM
```JavaScript
var login = {
  template:'<h1>这是一个login组件</h1>'
}
var vm = new Vue({
  el:'#app',
  render:function(createElements){
    return createElements(login);
  }
})
```

### webpack中vue配置

安装：

```shell
npm i vue
```

当用npm安装vue后，默认情况下只会引用`vue.runtime.commong.js`该版本不同于浏览器中的用`<script>`标签引入的vue.js。

区别在于vue.js中含有编译器，能够将模板字符串编译成为javascript渲染函数的代码。以至于运行时的版本（runtime-only）无法编译在浏览器中使用的vue代码。

如：

```html
//html
<div id='app'>
	{{ msg }}
</div>
```

```javascript
//main.js
import Vue from 'vue'

var vm = new Vue({
    el:'#app',
    data:{
        msg:'hello world!'
    }
})
```

webpack在编译后，浏览器会报如下错误：

```javascript
[Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
```

你可以通过阅读vue[官方文档](https://cn.vuejs.org/v2/guide/installation.html)，详细了解npm安装下的vue各版本区别。

**之所以有这样的设定**是`vue-loader`或`vueify`会将`*.vue`文件内部的模板在构建时预编译成javascript。所以在最终打好的包里实际上是不需要编译器的，而运行时版本相比完整版体积要小大约30%。

如果你想引用完整版，可以通过以下配置（该配置引入ES module）：

```javascript
//webpack.config.js
module.exports = {
  // ...
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
    }
  }
}
```

#### vue模块

webpack中可以在外部进行模块定义，文件名通常是以`*.vue`结尾。语句如下：

```vue
//login.vue
<template>
	<div>
        这是Vue定义的外部模块
    </div>
</template>
<script></script>
<style></style>
```

```javascript
import login from 'login' //引入的login模板已经经过vue-loader进行编译过

var vm = new Vue({
    el:'#app',
    render(createElements){
        return createElements(login)
    }
})
```

在这之前你还需要安装`vue-loader`，这是由于webpack内部无法解析以`.vue`结尾的文件，`vue-loader`模板本身依赖于`vue-template-compiler`。

安装：

```shell
npm i vue-loader vue-template-compiler
```

配置：

```javascript
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  module: {
    rules: [
      // ... other rules
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin()
  ]
}
```

至于更多配置，通过[官方文档](https://vue-loader.vuejs.org/guide/#manual-configuration) Vue Loader 了解更多具体步骤。