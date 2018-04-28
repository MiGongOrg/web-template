/**
 * 如业务场景有多入口的需求，可通过修改以下文件配置，实现多入口多文件打包分离
 */


/**
 * 修改 webpack.variable.js 文件，入口文件路径配置
 */

// 配置多入口 type 使用 object

 VARIABLE.entry = {
  'main': VARIABLE.getPath(".."),
  'test': VARIABLE.getPath("..")
}

/**
 * 修改 webpack.config.js 文件，新增 new HtmlWebpackPlugin()
 * 注：chunks
 */

new HtmlWebpackPlugin({
  title: '..',
  filename: '..',
  template: '..',
  hash: true,
  chunks: ['main'],
  minify: {
    collapseWhitespace: true,
    removeComments: true
  }
})

new HtmlWebpackPlugin({
  title: '..',
  filename: '..',
  template: '..',
  hash: true,
  chunks: ['test'],
  minify: {
    collapseWhitespace: true,
    removeComments: true
  }
})

/**
 * 写在最后的温馨提示：
 * 问：配置多入口文件后热更新失效？
 * 答：使用 webpack-dev-server iframe 模式，在访问路径中添加 webpack-dev-server
 *
 * 例：http://localhost:9000/webpack-dev-server/test.html
 */