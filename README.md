# Web Template

Web Template 使用 Webpack 构建，它并没有集成任何框架或 JavaScript 库，一切 Dependencies 由开发者根据项目需求自定义，所以它并不适用于复杂项目。

> 应用场景：SPA、官网、活动展示页等不需要大量数据交互与长期迭代的移动端或PC端项目

## Run

```bash
# install
npm install

# dev
npm run dev

# build
npm run build
```

## 模板引擎

默认使用 [doT.js](http://olado.github.io/doT/)

##### 如何使用？

```javascript
// xxx.js
import test from './template/test.dot'
let data = { name: 'Ming', age: '18' }
  , template = test(data)

console.log(template)
```
```html
<!-- test.dot -->
<div>Name: {{= it.name }} Age: {{= it.age }}</div>
```

> 如使用 `ejs` 或其它模板引擎，请自行配置 `webpack.config.js` 中的 loader

## 可选配置

##### 自定义多个入口文件，多文件打包分离

> 在使用之前需要移除 `webpack.optimize.CommonsChunkPlugin`

- 修改 `webpack.variable.js` 中的 `VARIABLE.entry` 入口路径
- 修改 `webpage.config.js` 添加多个 `new HtmlWebpackPlugin()`

> 多个入口对应多个 `HtmlWebpackPlugin` 具体实例 `examples/entry.js`

##### 全局变量配置，自动加载模块

如果你的项目中需要使用 `jQuery` `Underscore` 等第三方库，可以使用 `ProvidePlugin` 自动加载模块来实现，全局变量配置

```javascript
// 提供全局的变量，在模块中使用无需用 require 或 inport 引入
new webpack.ProvidePlugin({
  $: "jquery",
  jQuery: 'jquery'
})
```