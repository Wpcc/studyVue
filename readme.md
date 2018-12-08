# vue.js的系列学习

### 1.0. 模块

简而言之就是把一个文件中的内容按功能拆分成多个文件。

模块化一般具有两种特性：

- 文件作用域
- 通信规则
  - 加载
  - 导出

---

**CommonJS:**

node 的模块加载规范，是为后端JavaScript制定的规范。

加载：

- 语法：

```javascript
var 自定义变量名称 = require('模块')；
```

- 作用：
  - 执行被加载模块中的代码
  - 得到被加载模块中的exports（模块导出的对象）

导出：

 - 概念：
    - node中有模块作用域，默认文件中的所有成员只在当前文件模块有效
    - 对于希望可以被其它模块访问的成员，往往需要将其挂载到exports对象上。

- 语法：

```javascript
exports.a = 123;
```

详细内容参考node中的require模块章节：https://github.com/Wpcc/node

---

**AMD规范：**

由于后端的模块加载并不依赖于带宽，所以CommonJS为Node制定的模块引入几乎都是同步，这样的规范并不完事适应前端的应用场景。故诞生了AMD规范，全称为：Asynchronous Modules Definition，即“异步模块定义”。

定义（导出）：

```javascript
define(function(){
    var exports = {};
    exports.sayHello = function(){
        console.log('Hello form module:' + module.id);
    };
    return exports;
})
```

详情参考：http://javascript.ruanyifeng.com/tool/requirejs.html

---

**CMD规范：**

CMD规范由国内的玉伯提出，与AMD规范的主要区别在于定义模块和依赖引入的部分。

主要内容参考《深入浅出Node.js》。

---

**ES6规范：**

在ES6中明确对javascript语言定义了包的概念，包括包的引入import，以及包的导入export，不同于以上三者，export导出的是一个标识符，这样做的好处在于，编译器处于预处理阶段能够阶段导入的模块，以及模块的内容是动态的。

```javascript
//a.js  导出
export var a = 15;
//b.js  导入
import {a} from './a.js'
```

具体解析：查看《深入理解ES6》中的模块封装代码章节。

### 2.0.前端的演变

#### 2.1.没有ajax的时代

在没有ajax的时代，前端一般叫美工又称切图仔。主要的职责是将设计页面转换成html页面，然后交给后端，后端在mvc的设计模式下进行页面与数据的处理，这个时候准确来讲是没有前端的概念，后端统筹一切与用户相关的操作，包括视图、数据以及业务处理。

这种模式的缺点在于高度依赖服务器，从而给服务器带来巨大负荷，而页面的内容也会冗杂在一起产生耦合。这种情况伴随着ajax的出现而得到改善。

#### 2.2.ajax的时代

随着ajax的出现，前端可以很容易在不刷新页面的情况下与后端产生交互拿到数据。这直接促使前后端的分离。

什么是前后端分离？

后端只负责提供数据，前端负责页面渲染和大部分业务逻辑。当前端负责页面渲染便出现了字符串拼接，然后操作DOM将拼接字符串渲染到页面当中。

```javascript
//具体代码参考example中的ajax-string
```

由于javascript中的字符串内部不允许换行，当进行大量的数据渲染，创建的整个html页面放在一行就显得无比冗杂。

#### 2.3.模板引擎

随之而来的便是利用模板引擎来解决字符串拼接问题。以下是用art-template模板引擎作为事例。

```javascript
//具体代码参考example中的art-template
```

#### 2.4.三大框架

在模板引擎的基础上，进一步对数据和视图进行抽象，从而便诞生了前端的mvvm的模式。具体就是将数据和视图进行分割，而vm层则是对两者之间的操作进行封装，类似于一个中间件，开发者只需要关系视图和数据之间的业务逻辑即可。

目前流行的mvvm三大框架分别是：vue/angular/react

明白了前端发展的变化，接下来我们学习vue便显得有些轻松。

### 3.0.扩展

#### 3.1.vue扩展插件

- vue-cli：vue 脚手架
- vue-resource（axios）：ajax 请求
- vue-router：路由
- vuex：状态管理
- vue-lazyload：图片懒加载
- vue-scroller：页面滑动相关
- mint-ui：基于 vue 的 UI 组件库（移动端）
- element-ui：基于 vue 的 UI 组件库（PC 端）

#### 3.2.vue扩展知识

##### 3.2.1.ES6中的字符串填充

PadStart和PadEnd:

该函数接受两个参数，第一个参数用来指定字符串的目标长度，第二个参数是用来不全的字符串。

```
'xxx'.padStart(5,'ab'); //abxxx
'xxx'.padStart(5,'ab'); //xxxab
```

##### 3.2.2.按键修饰符

给键盘提供系列事件：

- v-on:keyup
  - .enter
  - .tab
  - 等等

```
//自定义:按键码
Vue.config.keyCodes.f1 = 112
```

##### 3.2.3.自定义指令和钩子函数

有些和DOM相关的函数，Vue中并没有定义，比如input的focus事件，当页面打开时文本框获得焦点。这个时候就需要我们自定义元素的指令。

**需要注意地是自定义指令为一个对象，并不是函数，这点区别于过滤器。**

自定义元素指令：

- 全局定义

```javascript
Vue.directive（'focus',{
    /*
    	定义钩子函数：即什么时候触发。
    	常见的有三种：bind/inserted/updated
    	由于Vue最开始创建的几点是虚拟节点，故在bind期间，元素是无法触发focus事件。
    */
    inserted:function(el){
        el.focus();
    }
}）
```

- 局部定义

```javascript
.directives : function(){
    //定义一个指令,该指令为对象
    color:{
        bind（el,binding）{
            el.style.color = 'red'
        },
        inserted(el,binding){

        }
    }
}
```

需要注意地是，元素的样式在bind中可以执行，而元素的操作是无法在bind中执行如focus如果在bind中执行则无效。这和原生JS一样，样式需要在前面引入，而js获取节点则必须要等到DOM节点完全渲染到页面当中才能执行。

### 4.0.vue的使用

在 vue 中，我们只需要关注视图以及数据，关于DOM的操作是有Vue实例完成的。这也就造就了 vue 的语法：

- 在页面中插入vm（vue事例）解析的内容
- 在vm之内传递数据，和调用相应的 api 进行操作

```html
// html 页面
<div id="app">
    {{ msg }}
</div>
<script>
    var vm = new Vue({   //配置对象
        el:'#app',
        data:{
            msg:'hello world'
        }
    })
</script>
```



### 5.0.vue中的指令

- v-cloak
  - 直到vue编译结束才显示，和[v-cloak] {display:none}一起使用
  - 内部的原理首先css会隐藏该元素，当元素通过vue渲染完成后，动态的改变display的值

```javascript
//比如我们在尾部才引入vue，那么在vue编译之前，页面的内容已经渲染出去了
```

- v-text
  - 将数据通过属性（指令）渲染到页面
- v-html
  - 将带有html元素的数据渲染到页面
- v-bind
  - 将数据渲染到DOM节点中的属性当中

```html
<!-- html页面 -->
<div id='app'>
    <span v-bind:title="message">
        鼠标悬停几秒查看此处动态绑定的提示信息！
    </span>
</div>
```

```javascript
//js页面
var app2 = new Vue({
  el: '#app',
  data: {
    message: '页面加载于 ' + new Date().toLocaleString()
  }
})
```

- v-on

  - 用来绑定事件方法

- v-bind:class / v-bind:style

  - 用来给DOM节点添加样式
  - 需要注意地是，当绑定的语法涉及到表达式的时候通常需要传递一个对象，而如果直接使用的是`vue`实例上的值，则只需要写上对应data中的值即可。
  - v-bind:class

  ```html
  <!-- html页面 -->
  <style>
      .red{
          color:red;
      }
      .blue{
          color:blue;
      }
  </style>
  <div id="app">
      <!-- 表达式的写法 -->
      <div :class={red:isActive}>hello</div>
      <!-- 直接写对应的值 -->
  </div>
  ```

  ```javascript
  //js页面
  var vm = new Vue({
      el:'#app',
      data:{
          isActive:true,
          classObj:{
              blue:true
          }
      }
  })
  ```

  - v-bind:style

  ```html
  <!-- html页面 -->
  <div id="app">
      <div :style="styleObj">
      	hello world
      </div>
  </div>
  ```

  ```javascript
  // js页面
  var vm = new Vue({
      el:'#app',
      data:{
          styleObj:{
              color:red,
              'font-size':16px
          }
      }
  })
  ```

- v-if / v-for
  - v-if：主要基础条件判断从而决定是否显示DOM节点
  - v-for：重要在于，如果你需要做排序那么尽量给数组绑定一个唯一的key值，这样可以避免在排序时选中对象的唯一性。

### 6.0.数据操作

#### 6.1计算属性



有时候我们需要对数据进行操作，之后才输出到页面。这种情况本来通过调用事件方法可以达到相应目的，但是总归是需要调用事件，如果不通过事件而仅对数据进行处理呢？

vue 提供一个计算属性。

代码如下：

```html
<div id="#app">
    {{ uppperMsg }}
</div>
<script>
    var vm = new Vue({
        el:'#app',
        data:{
            msg:'hello'
        },
        computed:{
            upperMsg(){
              return  this.msg.toUpperCase();
            }
        }
    })
</script>
```

计算属性的特点，在于缓存。也就是 vm 实例如果不注销的话，那么当刷新页面会从

#### 6.2.监视

在很多情况下，监视功能和计算属性功能是重复的，但是两者其实是有很大区别的。计算属性的功能是对数据进行操作然后输出，而监视功能是数据发生改变触发的。

如以下代码：两个文本框用于输入姓以及名，下面会将文本框内容合并输出全名。

```html
<div id="app">
    <input type="text" placehodle="输入姓" v-model="firstName" />
    <input type="text" placehodle="输入名" v-model="lastName" />
    <h4>
        {{ fullName }}
    </h4>
</div>
<script>
    var vm = new Vue({
        el:'#app',
        data:{
            firstName:'',
            lastName:'',
            fullName:''
        },
        watch:{
            firstName(val){
                this.fullName = val + this.lastName
            },
            lastName(val){
                this.fullName = this.firstName + val
            }
        }
    })
</script>
```

监听的回调函数有两个参数，分别是`newVal`和`oldVal`代表监听数据的改变前后。

当然，以上案例其实用 computed 改写会更加方便。

```html
<div id="app">
    <input type="text" placehoder="输入姓" v-model="firstName" />
    <input type="text" placehoder="输入名" v-model="lastName" />
    <h4>
        {{ fullName }}
    </h4>
</div>
<script>
    var vm = new Vue({
        el:'#app',
        data:{
            firstName:'',
            lastName:''
        },
        computed:{
            fullName(){
                return this.firstName + this.lastName
            }
        }
    })
</script>
```



##### 6.2.1.深度监听

当对一个对象，数组等具有嵌套数据结构进行监听的时候，当数据发生变化，往往是无法触发监听事件，这是因为监听的涉及只停留在表层。

故此时的监听，就需要用到深入监听。

```javascript
watch: {
    // 深度 watcher
    c: {
      handler: function (val, oldVal) { /* ... */ },
      deep: true
    },
  }
```







#### 6.3 过滤器

在功能上其实和计算属性差不多。区别在于计算属性中的函数其实算是 vm 实例上的一个方法，而 filter 定义的过滤器则不是，只能通过 vm 上的 options 才能访问，并没有定义在 vm 实例上。

同时抽象一点理解：过滤器是一个数据的方法，通过对方法的传参可以对数据进行不同意义上的处理。而计算属性则只对数据进行单一处理，通过访问 vm 实例，其实可以看出计算属性仅仅为一个处理后的值。

过滤器的定义如下：

- 全局过滤器：
  + 定义在Vue构造函数上，所有的实例都能够访问该过滤器
  + 过滤器在调用的时候，会自动将前面的数据作为参数传入到过滤器函数当中
```html
<div id="app">
{{ date | dateFormat(dateTemplate)}}  
<!-- 实际上该过滤器等于：dateFormat(dateTemplate) -->
</div>
<script>
Vue.fileter('dateFormat',function(dateStr,dateTemplate){
  //具体代码逻辑
})
</script>
```
- 私有过滤器：
  + 定义在实例内部，具体使用和conponents等一样
  + 该定义的函数只属于定义实例所有，当和全局过滤器冲突的时候，会调用内部定义过滤器。
  + 特征和变量一样
```javascript
var vm = new Vue({
  el:'app',
  date:{
    td:new Date()
  },
  filters:{
    dateFormat(dateStr,dateTemplate){
      //具体代码
    }
  }
})
//嵌入式调用
{{ date | dateFormat(dateTemplate)}}
```
### 7.0.Vue生命周期

什么是生命周期：

- 从Vue实例创建、运行、到销毁，这个时间段其实和人的出生、成长到死亡是一样的，统称为一个生命周期。

生命周期钩子：

- 就是生命事件的别名。

生命周期函数分类：

- 创建期间的生命周期函数：

  - beforeCreate：实例刚在内存中被创建出来。此时，还没有初始化好data和methods属性。
  - created：实例已经在内存中创建OK，此时 data 和 methods 已经创建好了。还没有开始编译模板。
  - beforeMount：完成模板编译，但没有挂载到页面当中。
  - mounted：已经将编译好的模板挂载到页面指定的容器中显示。

- 运行期间的生命周期函数：

  - beforeUpdate ： 状态更新之前执行此函数，此时data中的状态值是最新的，但是界面上显示的数据还是旧的，因为此时还没有开始重新渲染DOM节点。
  - updated：实例更新完毕后调用次函数，此时data中的状态值和界面上显示的数据都已经完成了更新，界面已经被重新渲染好了。

- 销毁期间的生命周期函数：

  - beforeDestroy：实例销毁之前调用。这一步，实例仍然完全可用。

  - destroyed：Vue实例销毁后调用，调用后，Vue实例指示的所有东西都会解绑，所有的事件监听器会被移除，所有的子实例也会被销毁。


![lifecycle](C:\Users\Administrator\Desktop\studyVue\readme\lifecycle.png)

个人解析：

- vue本身代码最初应该对html控制区域做了一个隐藏操作，类似于`display:none`，然后
- 在create层面是对data和methods的创建
  - beforeCreate：表示创建之前
  - created：表示创建完毕
- 在mount层面是对创建完毕的模板是否渲染到页面的操作
  - beforeMount：表示在将模板挂载到页面之前，这个时候虚拟DOM已经准备完毕。
  - mounted：表示已经将模板挂载到页面上去
- 在update层面是对改变后数据是否更新到页面的操作
  - beforeUpdate：表示数据发生变化，但vue实例并没有进行下一步操作。
  - updated：更新虚拟DOM，并将内容重新挂载到页面当中，但不会重新出发mounted等事件。
- 在destroy层面，就是对本身的操作
  - beforeDestroy：销毁之前
  - destroyed：销毁之后

### 8.0.模块

#### 8.1.浏览器中的组件

整个视图页面其实是一整块的`html`+`css`+`js`。如果整个页面中有部分页面在其它页面中大量的复用，显然这样会造成工作效率的低下。将局部公用部分的`html`+`css`+`js`抽离出来，于是便是所谓的组件。

vue 中一个基本的组件定义如下：

- 全局组件 + 字面量方式

```html
<div id="app">
    <my-com></my-com>
</div>
<script>
    Vue.component('my-com',{
        template:'<h1>hello world</h1>'
    })
    var vm = new Vue({
        el:'#app'
    })
</script>
<!-- 将组件定义在Vue构造函数上，实际通过构造函数方法，会将该组件定义在实例原型上，这样 vm 控制的DOM节点中便能使用该组件 -->
```

- 局部组件 + 模板方式

```html
<div id="app">
    <my-com></my-com>
</div>
<template id='my-template'>
	<h1>
        hello world
    </h1>
</template>
<script>
    var vm = new Vue({
        el:'#app',
        components:{
            'my-com':{
                template:'#my-template'
            }
        }
    })
</script>
```

回顾时间：

过滤器同样可以通过 Vue 构造函数的方法生成，写法也和 component 构造一样。一样么？

```javascript
Vue.filter('my-filter',function(value){})  // 函数
Vue.component('my-com',{})  // 对象
```

##### 8.1.1.组件传参

既然是一个组件，那么就是一个独立空间，也就是说在这个组件内部可以有自己的数据、有自己方法，有所有 vue 实例有的。

```javascript
Vue.component({
    data:function(){
        return {
            msg:'hello'
        }
    },
    template:'<h1>{{ msg }}</h1>'
})
```

也正是由于组件是一个独立空间，也就是说他无法获取到注册 vm 对象上的任何属性、方法，必须通过传递的形式进行数据交流。

- 父传子

```html
<!--
	这里的组件传参很有说明性：
	比如 v-bind:msg = "fatherMsg" 
	表达式中的右值由于属性绑定的原因会在 vm 实例上进行数据查找，将查找到的数据赋值给msg，而msg在html中其实是一个属性的存在
	比如 props:['msg']
	组件内部中通过props（properties），也就是属性的意思，拿到传递过来的数据。
-->
<div id="app">
	<my-com :msg="fatherMsg"></my-com>
</div>
<script>
    var vm = new Vue({
        el:'#app',
        data:{
            fatherMsg:'father data'
        },
        components:{
            'my-com':{
                props:['msg'],
                template:'<h1>{{ msg }}</h1>'
            }
        }
    })
</script>
```

- 子传父

在异步操作环境下，很多情况都可以利用回调函数进行值的套取。

回顾一下**回调函数**，在回顾回调函数之前先说明一下最简单的函数定义、使用。

```javascript
// 函数的定义
function say(val){
    console.log('i hava a ' + val)
}
// 函数的使用
say('pen')
```

接下来就是js语言牛逼的时候了，由于js语言中函数可以进行传参，那么当把函数作为参数传值给其它，比如说异步操作的函数里。当该异步操作完成后，触发该函数便通过函数体拿到传值过来的参数。

也就是说回调函数，本身是函数定义和使用，反向的灵活运用。

同理，在组件中同样可以通过回调的形式，将子组件的值传递给父组件。

```html
<div id="app">
    <my-com @myEvent='callback'></my-com>
</div>
<script>
    var vm = new Vue({
        el:'#app',
        data:{
            msg:''
        },
        methods:{
            callback(val){
                this.msg = val
            }
        },
        components:{
            data(){
                return {
                    msg:'childern data'
                }
            },
            mounted(){
                this.$emit('myEvent',this.msg)
            }
        }
    })
</script>
```

所以父组件获取子组件的本质：

- 在子组件上定义一个方法
- 将父组件中的函数传递给该方法
- 然后通过子组件中的`$this.emit`分发机制触发该方法

##### 8.1.2.内容的传参

`slot`插槽的意思，在组件中通过`slot`可以将父组件中的内容传递给子组件，具体语法如下：

```html
<my-com>hello world</my-com>

//定义的子组件模块
<template id="myTemplate">
	<h1>
        <slot></slot>
    </h1>
</template>
```

更详细内容可以参考[官方文档](https://cn.vuejs.org/v2/guide/components-slots.html)。

#### 8.2.模块中的组件

这一章节需要 webpack + node + ES6 基础知识。

在项目中，一般都不使用浏览器中的组件定义，而是将组件看成一个模块，在外部定义一个以`.vue`结尾的文件，如 app.vue 文件。

- 浏览器中的组件

```html
<div id="#app">
	<my-com></my-com>
</div>
<template id="myTemplate">
    <h1>
        {{ this.msg }}
    </h1>
</template>
<script>
    var vm = new Vue({
        el:'#app',
        components:{
            'my-com':{
                data(){
                    msg:'son'
                },
                template:'#myTemplate'
            }
        }
    })
</script>
```

- 模板中的组件

```vue
<!-- my-com.vue -->
<template>
{{ this.msg }}
</template>
<script>
    export default {
        data(){
            return {
                msg : '我是一个组件'
            }
        }
    }
</script>
<!-- 
模块中的组件如果转换成浏览器中的组件，是会相互对应的，如果模块中 script 代码没有内容，大可不必用ES6的模块语法将其导出。
也就是模块中的 template 会自动转换成浏览器中的 template
大体的对应，我想应该是这样的
Vue.component('my-com',{
	template：<template></template> 内容
	data：import son from './son.vue'导出的 son.data
	等等
})
-->
```



```html
<!-- index.html -->
<div id="#app">
    
</div>
```

```vue
<!-- app.vue -->
<template>
	
</template>
<script>
    import myCom from './my-com.vue'
    export default {
        components:{
            myCom
        }
    }
    
</script>
```

```javascript
// main.js  === 其实也就是index.html中 script 标签里的 js 代码
import Vue from 'vue'
import app from './app.vue'

var vm = new Vue({
  el:'#app',
    render:function(createElement){
        createElement(app)
    }
})
/* 
之所以出现这样的语法,原因在于浏览器中引用的完整版的Vue，而模块中引入的是	
剪切版的Vue，只能通过底层render方法，将管理的DOM区域取代掉
*/
```

故模块中的组件分两部分：

- 第一部分即组件本身，也就是上述的 my-com.vue
- 第二部分浏览器页面的切割，也就是上述的 index.html main.js app.vue

#### 8.3.传参方法综合

- props
- vue的自定义事件
- 消息订阅与发布（如：pubsub库） => 该方法在下一章演示
- slot
- vuex

### 9.0.路由

在vue中路由是将url与组件对应起来的工具，也就是通过路由可以实现页面的跳转，即组件的切换。

通常一个路由的创立需要四个步骤

- 创建一个组件
- 将url路径和显示组件对应起来
- 创建一个路由实例
- 将路由实例挂载到vue实例上

```html
<div id="app">
    <router-link to='/foo'>Go to Foo</router-link>
    <router-link to='/bar'>Go to Bar</router-link>
</div>
<script>
    // 1.创建组件
    var Foo = {
        template:'this is Foo'
    }
    var Bar = {
        template:'this is Bar'
    }
    // 2.对应组件
    var routes = [
        {path:'/foo',component:Foo},
        {path:'/bar',component:Bar},
    ]
    // 3.创建VueRouter实例
    var router = new VueRouter({
        routes
    })
    // 4.将VueRouter挂载到vm实例上
    var vm = new Vue({
        router
    }).$mount('#app')
</script>
```

