## 文件说明
### 01-code.html
vue起步：准备来讲vue是对dom节点做了一个封装，提供对应的api让开发者能够更加专注于数据与视图的业务逻辑
### 02-v.html
vue提供的指令或者属性，与之前的嵌入式存在一定的区别
### 03-v-on.html
vue提供的事件机制，同时在该事件机制下也提供相应的api接口，用于一些事件的细微操作：
- .stop:（stopPropagation）阻止事件冒泡
- .prevent：（preventDefalut）阻止默认事件
- .self：（）将事件触发程序绑定在自己身上
- .capture： （）将事件的触发从冒泡改为捕获
- .once: ()该事件只触发一次
### 04-v-model
vue提供的事件绑定
### 05-v-class
vue中的class
### 06-v-for
vue中for循环有key没key的区别：
- 如果没有key，渲染绑定是基于索引。这样的弊端在于，当选定指定元素的时候在该元素插入其它元素，默认选定的元素会出现变化。
- 如果有key，渲染的节点会基于key进行绑定，由于key的唯一性，当对dom进行操作的时候，页面并不会发生变化。
