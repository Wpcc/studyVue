var express = require('express');
var router = require('./routers/route');
var path = require('path');
var bodyParser = require('body-Parser');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/node_modules',express.static(path.join(__dirname,'node_modules')));
app.use(router);
app.listen(5000,function(){
  console.log('app is running');
})
