// 通过ES6语法导入模块
import $ from 'jquery'
// 导入css文件
import './css/index.css'
import './css/index.less'
import './css/index.scss'
// 导入bootstrap样式
import 'bootstrap/dist/css/bootstrap.css'

$(function(){
  $('li:odd').css('backgroundColor','#ccc');
  $('li:even').css('backgroundColor','red');
})
/*
ES6高级语法：
  webpack不支持，需要通过babel进行编译
*/
class Person{
  //等价于PersonType构造函数
  constructor(name){
    this.name = name
  }
  //等价于personType.prototype.sayName
  sayName(){
    console.log(this.name)
  }
}
let person = new Person('Nicholas')
person.sayName()
