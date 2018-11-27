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

#### 一、没有ajax的时代

在没有ajax的时代，前端一般叫美工又称切图仔。主要的职责是将设计页面转换成html页面，然后交给后端，后端在mvc的设计模式下进行页面与数据的处理，这个时候准确来讲是没有前端的概念，后端统筹一切与用户相关的操作，包括视图、数据以及业务处理。

这种模式的缺点在于高度依赖服务器，从而给服务器带来巨大负荷，而页面的内容也会冗杂在一起产生耦合。这种情况伴随着ajax的出现而得到改善。

#### 二、ajax的时代

随着ajax的出现，前端可以很容易在不刷新页面的情况下与后端产生交互拿到数据。这直接促使前后端的分离。

什么是前后端分离？

后端只负责提供数据，前端负责页面渲染和大部分业务逻辑。当前端负责页面渲染便出现了字符串拼接，然后操作DOM将拼接字符串渲染到页面当中。

```javascript
//具体代码参考example中的ajax-string
```

由于javascript中的字符串内部不允许换行，当进行大量的数据渲染，创建的整个html页面放在一行就显得无比冗杂。

#### 三、模板引擎

随之而来的便是利用模板引擎来解决字符串拼接问题。以下是用art-template模板引擎作为事例。

```javascript
//具体代码参考example中的art-template
```

#### 四、三大框架

在模板引擎的基础上，进一步对数据和视图进行抽象，从而便诞生了前端的mvvm的模式。具体就是将数据和视图进行分割，而vm层则是对两者之间的操作进行封装，类似于一个中间件，开发者只需要关系视图和数据之间的业务逻辑即可。

目前流行的mvvm三大框架分别是：vue/angular/react

明白了前端发展的变化，接下来我们学习vue便显得有些轻松。

### 3.0.vue中的指令

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
<div id='app'>
    <span v-bind:title="message">
        鼠标悬停几秒查看此处动态绑定的提示信息！
    </span>
</div>
```

```javascript
var app2 = new Vue({
  el: '#app',
  data: {
    message: '页面加载于 ' + new Date().toLocaleString()
  }
})
```

- v-on
  - 用来绑定事件方法
  -

### 4.0.vue中的过滤器
主要针对数据，如果数据在渲染到View层还需要处理的话，处理的函数便被同意归纳到过滤器当中：
- 全局过滤器：
  + 定义在Vue构造函数上，所有的实例都能够访问该过滤器
  + 值得注意地是过滤器在调用的时候，会自动将前面的数据作为参数传入到过滤器函数当中
```javascript
Vue.fileter('dateFormat',function(dateStr,dateTemplate){
  //具体代码逻辑
})
//嵌入式调用
{{ date | dateFormat(dateTemplate)}}
```
- 私有过滤器：
  + 定义在实例内部，具体使用和methods等一样
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
#### 4.0.1.ES6中的字符串填充

PadStart和PadEnd:

该函数接受两个参数，第一个参数用来指定字符串的目标长度，第二个参数是用来不全的字符串。

```
'xxx'.padStart(5,'ab'); //abxxx
'xxx'.padStart(5,'ab'); //xxxab
```



#### 4.0.2.按键修饰符

给键盘提供系列事件：

- v-on:keyup
  - .enter
  - .tab
  - 等等

```
//自定义:按键码
Vue.config.keyCodes.f1 = 112
```

#### 4.0.3.自定义指令和钩子函数

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

### 5.0.Vue生命周期

什么是生命周期：

- 从Vue实例创建、运行、到销毁期间，随着不同的状态可以产生不同的事件，这些事件统称为生命周期。

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


  ![v2-1ba4b0740e7d9f26e817e381906b8700_b](C:\Users\Administrator\Desktop\v2-1ba4b0740e7d9f26e817e381906b8700_b.jpg)

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