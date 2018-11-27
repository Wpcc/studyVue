var mongoose = require('mongoose');
// 1.0 连接数据库
mongoose.connect('mongodb://localhost/test',{useNewUrlParser:true});
// 2.建立数据结构
var Schema = mongoose.Schema;
var carSchema = new Schema({
  license:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  Ctime:{
    type:Date,
    required:true
  },
  operation:{
    type:String,
    required:true
  }
})

module.exports = mongoose.model('Car',carSchema);
