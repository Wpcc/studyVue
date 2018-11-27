

## webpack

自动化构建工具，准确来讲就是将相互依赖的包，或者浏览器无法支持的高版本写法，比如css中的scss和less，js中的jsx，TypeScript等解析、压缩成浏览器能够支持的低版本的js/css/html等。
该文档使用的webpack版本来源于webpack 4.26.0

### 安装
- 全局安装
  - 如果webpack是全局安装需要环境变量配置，通过命令`npm config get prefix `可以获取webpack安装的全局目录
```shell
npm install webpack webpack-cli -g
# cli(command-line interface)命令行界面
```
- 局部安装
```shell
npm install webpack webpack-cli
```

### 使用

https://www.webpackjs.com/api/cli/

在4.26.0版本中之前的命令语句已经做了修改，如果我们需要用命令行语句对文件进行打包的话，那么我们需要使用配置文件，如果不使用的话，命令语句如下：

```shell
npm <entry> -o <output>
```

### 配置文件

通过配置文件可以简化命令行操作，在配置文件中定义打包的出口以及入口，同时也可以定义打包之后的名字。webpack是基于nodejs，故webpack的打包文件也是用node语法定义的：

- webpack.config.js

```javascript
var path = require('path'); //引入node中的path模块

//定义该文件模块的导出接口
module.exports = {
    //入口文件路径
    entry:path.join(__filename,'./src/main.js'),
    //出口文件路径，分开为：文件路径、文件名。
    output:{
        path:path.join(__filename,'./dist'),
        filename:'bundle.js'
    }
}
```

直接输出webpack命令执行的时候，webpack会做以下几步：

- 首先，webpack发现并没有通过命令的形式给定指定入口和出口
- webpack会去项目的根目录中，查找一个叫webpack.config.js 的配置文件
- 然后解析该配置文件
- 通过解析后的入口和出口进行打包构建



### webpack-dev-server

**主要是针对javascript处理，默认会将`js`文件打包到根目录下，该文件存储在内存中**

通过命令行安装 `webpack-dev-server` 插件，可以在本地构建一个服务器，同时当我们修改页面中的内容，该服务器会将修改后的内容自动打包。

安装：`webpack-dev-server`依赖于`webpack`，故在安装之前，我们需要在本地安装`webpack`

```javascript
npm i webpack webpack-cli -D //将文件安装到devDependencies
/*
	这里说一下dependencies和devDependencies的区别：
	dependencies：当项目上线后还要使用的包
	devDependencies：项目下线后便不再使用
*/
npm i webpack-dev-server -D
```

安装之后通过npm中的script配置项，可以在命令行中运行`webpack-dev-server`，配置如下：

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server"
  }
```

通过命令行语句启动

```shell
npm run dev
```

需要注意地是默认情况下：

- `webpack-dev-server`会将文件打包保存到根目录，为了运行效率该文件保存在内存中

- 当启动`webpack-dev-server`后，命令行中会有该注意项提示

#### 常用参数

**devServer中的参数可以在命令行中定义（通过npm脚本），也可以在配置文件中配置。**

- devServer.open
  - 当启动open参数，运行`webpack-dev-server`会自动启动浏览器

```shell
webpack-dev-server --open
```

- devServer.port
  - port 参数能配置端口好

```shell
webpack-dev-server --port 3000
```

- devServer.contentBase
  - 浏览器显示内容的根路径

```shell
webpack-dev-server --content-base <path>
```

- devServer.hot
  - 模块的热替换功能，该功能可以实现以下几种效果
    - 不重新打包文件，只打包更改的部分文件

```shell
webpack-dev-server --hot
```

- devServer.publicPath
  - 默认`bundle.js`文件被打包到 `/`目录中，该选项可以更改打包路径

```javascript
//该配置项并没有CLI命令语句，只能在配置项中配置
devServer:{
    publicPath:'/dist/'
}
```

以上参数也可以在配置文件中进行配置，不过 `hot`的配置会显得稍微麻烦一些，这是因为`hot`会依赖于`webpack.HotModuleReplacementPlugin`。

- 第一步：在配置项中启动`hot`
- 第二步：引入`webpack`模块
- 第三步：引入`hot`依赖插件

```javascript
//第二步
var webpack = require('webpack');
devServer:{
	//第一步：
    hot:true
},
    plugins:[
        //第三步：
        new webpack.HotModuleReplacementPlugin()
    ]
```

其它配置参数项：

```javascript
devServer:{
    publicPath:'/dist/',
    open:true,
    contentBase:path.join(__dirname,'src'),
    hot:true,
}
```

### webpack-html-plugin

**主要是针对html进行处理，默认会将`html`文件打包到根目录下，该文件存储在内存中**

- 在内存中生成html页面
- 该页面会自动引用`webpack-dev-server`生成在内存中的`bundle.js`
- 需要注意地是`webpack-dev-server`生成的`bundle.js`与`webpack-html-pugin`生成虚拟html应该在同一个目录：即`publicPath`与`filename`目录应该一致。

```shell
#安装webpack-html-plugin插件
npm i webpack-html-plugin -D
```

```javascript
var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
plugins:[
    new htmlWebpackPlugin({
        template:path.join(__dirname,'src/index.html'),
        filename:'index.html'  //该配置项可以带上路径，如没有路径默认为根目录
    })
]
```

如果，该配置项生效并与`webpack-dev-server`配置生成的内存目录一致，在显示页面的时候会显示虚拟html，虚拟html最自动引入虚拟打包文件。

### loader

webpack本身只能处理javascript模块，如果要处理其他类型的文件，就需要使用loader进行预处理。

对于css文件，需要使用`css-loader`和`style-loader`，它们做两种不同的事情，`css-loader`会遍历css文件，然后处理它们，`style-loader`会把原来的css代码插入页面中的一个style标签中。

**loader的加载是从右到左，`style-loader`与`css-loader `加载顺序不能错位，必须是先css后style**

```shell
#安装预处理文件
npm i css-loader style-loader -D			

```

```javascript
//main.js 需要打包的文件
import './src/index.css'
```

```javascript
//webpack.config.js
module.exports = {
    module:{
        rules:[
            {test:/\.css$/,use:['style.loader','css-loader']}
        ]
    }
}
```

#### less

需要安装`less-loader`，不过`less-loader`依赖于`less`，故同时也需要安装`less`。

```shell
npm i less less-loader -D
```

```javascript
//main.js
import './css/index.less'
```

```javascript
module.exports = {
    module:{
        rules:[
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']}
        ]
    }
}
```

#### sass

基本和less一样，需要安装`sass-loader`，不过`sass-loader`依赖的文件为`node-sass`，安装使用步骤如下：

- `node-sass`的下载需要加载一个包，这个包由于网络的问题常常导致下载失败。故需要配置一下npm的下载项，让其指向国内的下载地址。
- http://lzw.me/a/node-sass-install-helper.html 通过访问该地址了解更加详情的解决方案

```shell
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
#在这之前需要更改一下npm的下载项
npm i node-sass sass-loader -D
```

```javascript
//main.js
import './css/index.scss'  //sass的另一种用法，sass最原始的用法太麻烦，故语法后来改为scss
```

```javascript
module.exports = {
    module:{
        rules:[
            {test:/\.less$/,use:['style-loader','css-loader','sass-loader']}
        ]
    }
}
```

#### 图片处理

当css背景中加入背景图片，webpack往往无法解析，这个时候便需要通过`url-loader`预处理器进行url解析，通常情况下`url-loader`都是配合`file-loader`使用，在`url-loader`内部有对`file-loader`的依赖，这取决于对图片的处理。

- `url-loader`默认会将图片处理成base64格式编码的图片
- 并将该图片存储在内存中的根目录下（内存和磁盘的区别在于文件是否存在于文件夹上）



**安装：**

```shell
npm i url-loader file-loader -D
```



**使用：**

```javascript
//在webpack.config.js配置文件中
const path = require('path');
module.exports = {
    entry:'',
    output:'',
    //以上其它配置项省略
    module:{
        rules:[
            {
                test : /\.(jpe?g|png|gif|svg)$/ ,
                use : [
                    loader:'url-loader',
                    options:[
                   	 	{
                    		limit:123456 //该参数为图片文件的字节数
                    	}
                	]
                ]
            }
        ]
    }
}
```

关于`url-loader`中limit字节数说明，当limit字节数大于图片或默认不填写，`url-loader`会将图片转码成base64格式文件，当limit字节数等于图片大小，这个时候便会选择读取文件的方法。

**具体表现在：**

打包前的css样式：

```css
div{
  width:200px;
  height: 110px;
  background: url('../imgs/timg.jpg');
  background-size: cover;
}
```

打包后的css样式：

```css
/*当limit字节大于图片字节*/
div{
  width:200px;
  height: 110px;
  background: url(data:image/jpeg;base64,/9j/4AAQS……);/*以base64格式读取显示*/
  background-size: cover;
}

/*当limit字节等于图片字节*/
div{
  width:200px;
  height: 110px;
  background: url(1ff5fa11c1d0f399a42845ff08e9f00c.jpg);/*以图片路径读取显示*/
  background-size: cover;
}
```

**为什么打包后的文件名称是一串看不懂的字符串？**

这是由于打包后的文件都存放在根目录下的内存中，原本两个相同命名却存储在不同路径的图片此刻会放置在一起从而发生覆盖现象，为了避免该现象统一用图片的哈希值（32位）进行命令，以保证文件的唯一性。

通过配置参数也可以修改文件名称：

```javascript
use : [
    loader:'url-loader',
    options:[
    	{
    		limit:123456 //该参数为图片文件的字节数
    		name:'[path][name].[ext]' //显示文件路径保证唯一性
    	//  name:'[hash:8]-[name].[ext]'//截取hash前八位以及文件名保证唯一性
    	}
    ]
]
```

**另一种配置方法：**

```javascript
//通过类似于url传参的方式也可以更改loader的配置项
loader:'url-loader?limit=123456&name=[path][name].[ext]'
```

#### 字体文件处理

同样适用`url-loader`预处理工具，具体配置如下。由于npm安装的bootstrap不包含字体文件，故不做过多演示。

```javascript
//webpack.config.js配置文件
{test:/\.(eot|svg|ttf|woff|woff2)$/,use:'url-loader'}
```

#### ES6语法处理

webpack只能处理少部分的ES6语法，当涉及到ES6语法的时候需要借助`babel`这个loader进行预处理翻译工作。

关于babel主要模块有三个：

- babel-loader
  - 作用和其它loader一样，实现对特定文件类型的处理。将文件类型转换成webpack能够处理的有效模块。
- babel-core
  - 实际是提供一系列的api。当`babel-loader`在处理文件的时候会调用`babel-core`的api。
- babel-preset-env
  - babel使用哪种转码规则进行文件处理。除此之外还有`babel-preset-es2015`、`bable-preset-latest`。

除了以上三个核心主要为了让babel插入的辅助代码避免重复，我们还需要引入另一个包：

- babel-plugin-transformm-runtime
- 这个包依赖于babel-runtime

##### babel版本说明

babel7.0之后对于包名已经有了很大的变化。除了`babel-loader`之外以上所有模块都更新为`@babel/core`、`@babel/preset-env`、`@babel/plugin-transform-runtime`、`@babel/runtime`。

**故以下安装使用的版本基于：webpack4.0+babel7.0**

你可以读取官方文档对webpack中的babel做进一步配置：

babel : https://babel.docschina.org/setup#installation

webpack : https://www.webpackjs.com/loaders/babel-loader/

##### 安装

```shell
npm i babel-loader @babel/core @babel/preset-env @babel/plugin-transfrom-runtime @babel/runtime -D
```

##### 配置

webpack中babel的配置有两种方法。

- 第一种直接在webpack.config.js中配置：

```javascript
{
    test:/\.js$/,
    exclude:/(node_modules|bower_components)/,
    use:{
		loader:'babel-loader',
        options:{
             presets:['@babel/preset-env'] ,
             plugins:['@babel/transform-runtime']
        }
    }
}
```

第二种，将babel其中的配置项分开配置，即新建一个`.babelrc`的配置文件。将babel的配置项置入其中。该配置文件为json文件，故不能写注释，需要双引号。

```javascript
//webpack.config.js
{
    test:/\.js$/,
    exclude:/(node_modules|bower_components)/,
    use:{
        loader:'babel-loader'
    }
}
```

`.babelrc`文件配置

```json
{
    "presets":["@babel/preset-env"],
    "plugins":["@babel/transform-runtime"]
}
```

### webpack基础配置项

```javascript
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

```





