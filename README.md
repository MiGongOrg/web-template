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

#### 自定义多个入口文件，多文件打包分离

> 在使用之前需要移除 `webpack.optimize.CommonsChunkPlugin`

- 修改 `webpack.variable.js` 中的 `VARIABLE.entry` 入口路径
- 修改 `webpage.config.js` 添加多个 `new HtmlWebpackPlugin()`

> 多个入口对应多个 `HtmlWebpackPlugin` 具体实例 `examples/entry.js`

#### 全局变量配置，自动加载模块

如果你的项目中需要使用 `jQuery` `Underscore` 等第三方库，可以使用 `ProvidePlugin` 自动加载模块来实现，全局变量配置

```javascript
// 提供全局的变量，在模块中使用无需用 require 或 inport 引入
new webpack.ProvidePlugin({
  $: "jquery",
  jQuery: 'jquery'
})
```

#### 使用 [Less](http://lesscss.org)

默认使用 `Sass` 如果使用 `Less` 需要安装依赖并修改配置项

```bash
# 安装 less、less-loader
npm i -D less less-loader
```

> 修改 `webpage.config.js` 配置文件，具体实例 `examples/less.js`

#### 使用 [Pug](https://pugjs.org)

```bash
# 安装 pug、pug-html-loader、raw-loader
npm i -D pug pug-html-loader raw-loader
```

> 修改 `webpage.config.js` 配置文件，添加 Pug loader

```javascript
// pug loader 处理 pug 文件，转换成 html
{ test: /\.pug/, loader: ['raw-loader', 'pug-html-loader'] }
```

#### 使用 [CoffeeScript](http://coffeescript.org)

```bash
# 安装 coffeescript coffee-loader
npm i -D coffeescript coffee-loader
```

> 修改 `webpage.config.js` 配置文件，添加 CoffeeScript loader

```javascript
// CoffeeScript loader
{
  test: /\.coffee$/, 
  use: [{
    loader: 'coffee-loader',
    options: { 
      transpile: {
        presets: ['env'] 
      }
    }
  }]
}
```

> 如何使用 CoffeeScript ? 查看具体实例 `examples/test.coffee`

#### 使用 [TypeScript](http://www.typescriptlang.org/)

```bash
# 安装 typescript ts-loader@3.x
# ts-loader 选择 3.x 版本是因为该项目使用 webpack 3)
npm i -D typescript ts-loader@3.x
```

> 新建 `tsconfig.json` 文件，这是 TypeScript 编译配置

```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "commonjs",
    "target": "es5",
    "allowJs": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

> 修改 `webpage.config.js` 配置文件，添加 TypeScript loader

```javascript
{
  test: /\.tsx?$/,
  use: [{
    loader: 'ts-loader'
  }]
}
```

> 如何使用 TypeScript ? 查看具体实例 `examples/test.ts`
