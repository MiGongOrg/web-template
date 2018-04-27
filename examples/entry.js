/**
 * 如业务场景有多入口的需求，可通过修改以下文件配置，可以实现多入口多文件打包分离
 */


/**
 * 修改 webpack.variable.js 文件，入口文件路径配置
 * @type {string | array | object}
 */

// is array

VARIABLE.entry = [
  VARIABLE.getPath(".."),
  VARIABLE.getPath("..")
]

// is object

 VARIABLE.entry = {
  '..': VARIABLE.getPath(".."),
  '..': VARIABLE.getPath("..")
}

/**
 * 修改 webpack.config.js 文件，新增 new HtmlWebpackPlugin()
 * 注：filename 的每个名字是不同的，
 */

new HtmlWebpackPlugin({
  title: '..',
  filename: '..',
  template: '..',
  hash: true,
  minify: {
    collapseWhitespace: true,
    removeComments: true
  }
})