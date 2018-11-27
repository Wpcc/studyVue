const path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode:'none',
  entry:path.join(__dirname,'src/main.js'),
  output:{
    path:path.join(__dirname,'dist'),
    filename:'bundle.js'
  },
  devServer:{
    // publicPath:'/dist/',
    open:true,
    contentBase:path.join(__dirname,'src'),
    hot:true
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(), //引入hot依赖插件
    new htmlWebpackPlugin({ //在引入插件的时候，传入相应配置项
      template:path.join(__dirname,'src/index.html'),
      filename:'index.html'
    })
  ],
  module:{
    rules:[
      // 处理css
      {test : /\.css$/, use : ['style-loader','css-loader']},
      // 处理less
      {test : /\.less$/, use : ['style-loader','css-loader','less-loader']},
      // 处理scss
      {test : /\.scss$/, use : ['style-loader','css-loader','sass-loader']},
      //处理css中的图片路径
      {test : /\.(jpe?g|png|gif|svg)$/, use : [{
        loader:'url-loader',
        options:{
          limit:35190,
          name:'[path][name].[ext]'
        }
      }]},
      //处理ES6高级语法
      //该配置项基于webpack 4.x|babel-loader 8.X|babel 7.X
      {
        test : /\.js$/,
        exclude:/(node_modules|bower_components)/,//将node_modules和bower文件夹下的文件排除之外
        use:{
          loader:'babel-loader',
          options:{
            presets:['@babel/preset-env'], //babel配置项的转换方法配置
            plugins:['@babel/transform-runtime']//定义babel的辅助代码--减小转换体积
          }
        }
      }
    ]
  }
}
