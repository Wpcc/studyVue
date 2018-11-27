var express = require('express');
var path = require('path');
var Car = require('../models/car');
var router = express.Router();



router.get('/',function(req,res){
  res.sendFile(path.dirname(__dirname)+'/views/index.html');
})
// 数据库操作
router.get('/retCars',function(req,res){
  // 查询数据库，显示所有数据
  Car.find(function(err,ret){
    if(err){
      console.log('查询失败');
    }else{
      res.send(ret);
    }
  })
})
router.post('/addCars',function(req,res){
  var body = req.body;
  var newCar = new Car(body);
  newCar.save(function(err,ret){
    if(err){
      console.log('保存失败');
      return;
    }
    res.send({status:"ok"});
  })
})
router.post('/delCars',function(req,res){
  var body = req.body;
  console.log(body);
  Car.findByIdAndRemove({
    _id:body.id
  },function(err,ret){
    if(err){
      console.log('删除失败')
      return
    }else{
      res.send({status:'ok'})
    }
  })
})
module.exports = router;
