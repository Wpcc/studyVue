## 过渡和动画
### 过渡
Vue过渡是为了使加入和删除DOM节点的时候不显得那么突兀，以这个点出发去理解Vue过渡便非常自然。

- 第一个阶段，主要是DOM节点插入到页面的时间段，用v-enter-active表示：
  - DOM节点还没插入到页面时的className：v-enter
  - DOM节点插入页面时的className：v-enter-to
  - 这一阶段过渡动画的className：v-enter-active

- 第二个阶段，便是离开过渡阶段，这一阶段主要是还原第一个阶段，用v-leave-active：
  - 在还原之前时候的className：v-leave

  - 在还原之后时候的className：v-leave-to


### 过渡过程详解
当DOM节点插入到页面：
```css
/*opacity的默认值为1*/
.v-enter{
  opacity:0
}
.v-enter-to{
  opacity:1;
}
.v-enter-active{
  transition: opacity 5s;
}
```
当DOM节点移除页面：
```css
/*opacity的默认值为1*/
.v-leave{
  opacity:1
}
.v-leave-to{
  opacity:;
}
.v-leave-active{
  transition: opacity 5s;
}
```


### 过渡的钩子函数（生命周期）

当涉及到半场动画的时候，仅仅通过动画过渡是无法实现的，这是因为过渡的周期随着元素被插入页面和删除分为两个阶段，而半场动画需要在一个阶段完成页面的插入和删除。这个时候就涉及到过渡的钩子函数了。

**特别需要注意地是在用过渡的钩子函数时，一定需要在动画中使用el.offsetWidth来刷新动画**。

```javascript
//该案例为控制小球移动
beforeEnter:function(el){
    el.style.transform = 'translate(0,0)';
},
enter:function(el){
    el.offsetWidth;
    el.style.transform = 'translate(100px,100px)';
    el.style.transition = 'all 10s';
}
```

**进入：**

- before-enter:
  - 执行动画之前的阶段：用来固定元素进行动画之前的状态
- enter：
  - 执行动画时的阶段：用来固定元素进行动画之后的状态
- after-enter：
  - 执行完动画之后的阶段：当动画结束后的一些操作
- enter-cancelled：
  - 动画取消：一般不常用

**离开：**

- before-leave

- leave

- after-leave

- leave-cancelled


如果给transition加上:css="false",给该元素定义的样式则无效。

```tex
推荐对于仅使用 JavaScript 过渡的元素添加 v-bind:css="false"，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响。
```



### 目录说明

#### 01-动画-过渡.html

如果没有给transition定义名字的话，动画阶段的命名便是以v开头

#### 02-动画-过渡.html

如果给transition定义名字的话，那么动画阶段的命名便是以name为开头

#### 05-动画-列表.html

在这之前动画主要集中于元素的v-if指令，当涉及表格的时候，指令是以v-for为导向的，这个时候模块`transition`便无效。

`transition-group`组件：

主要和v-for指令搭配使用，从而控制元素的进入和离开动画，该组件新增的v-move特性，会在元素改变定位的时候使用。

**需要注意地是给列表添加移动动画的时候，除了给`v-move`添加过渡样式的时候，还需要给v-leave-active添加样式，如下:**

```javascript
.v-move{
    transition:all 1s;
}
.v-leave-active{
   	position:absolute;
}
```

#### 06-动画-appear-tag.html

`<transition-group>`会默认渲染一个span标签，通过tag属性可以更改渲染的标签类型。



## 组件

Vue中组件是相对于View层来说，主要是用来拆分html页面。

### 组件的创建

在创建组件的时候需要注意组件的命名，如果组件是用驼峰法命令，会自动转换为以-为连接的字符。除此之外还需要注意的是组件中的数据需要用函数，这是因为对象的值存在连接性。

- 字面量

```javascript
Vue.component('my-com',{
    template:'<h1>hello world</h1>'
})
```

- 模板

```javascript
//javascript
Vue.component('my-com',{
    template:'#template'
})
```

```html
//html
<template id="template">
	<h3>
        hello world
    </h3>
</template>
```

定义私有模板的时候**不能使用-作为连接符**，具体使用如下;

```javascript
new Vue({
    components:{
        myCom:{
            template:'<h1>hello world</h1>'
        }
    }
})
```

### 方法传参

方法传参的时候，父元素接受数据的形参必须是指定的data。
通过ref父组件能够拿到子组件的任何属性。


### 组件实例

用组件构建一个简易的留言板。

- 主要架构：vue+bootstrap
- 内容：form+ul
- 后台数据模拟：webStorage
- 业务逻辑：
  - 提交：
    - 当表单提交的时候，需要将表单数据转换成一个对象存储在localStorage中，在存储时需要查看存储的key值是否存在，如果存在在该基础上存储，如果不存在直接存储（）。
  - 显示：
    - 如果列表需要显示storage中的数据，在created阶段需要读取storage中的数据，并赋值给自己实例中的数据。
    - 当表单更改storage中的数据，也需要更改父组件中的数据。
