const webpack = require('webpack')
    , VARIABLE = require("./webpack.variable")
    , HtmlWebpackPlugin = require('html-webpack-plugin')
    , ExtractTextPlugin = require("extract-text-webpack-plugin")
    , CleanWebpackPlugin = require('clean-webpack-plugin')
    , DashboardPlugin = require('webpack-dashboard/plugin')

module.exports = {
  // 入口文件配置项
  entry: VARIABLE.entry,

  // 输出文件配置项
  output: {
    path: VARIABLE.output.path,
    filename: VARIABLE.output.filename,
    publicPath: VARIABLE.output.publicPath
  },

  // web server
  devServer: {
    port: VARIABLE.server.port,
    open: VARIABLE.server.open,
    hot: VARIABLE.server.hot
  },

  // 插件配置项
  plugins: [
    // HTML 优化插件
    new HtmlWebpackPlugin({
      title: VARIABLE.htmlPlugin.title,
      filename: VARIABLE.htmlPlugin.filename,
      template: VARIABLE.htmlPlugin.template,
      hash: true,
      minify: {
        // 去除空格
        collapseWhitespace: true
        // 删除注释
        removeComments: true
      }
    }),
    // 提取公共代码
    new webpack.optimize.CommonsChunkPlugin({
      name: VARIABLE.CommonsChunkPlugin.name,
      filename: VARIABLE.CommonsChunkPlugin.filename,
      minChunks: VARIABLE.CommonsChunkPlugin.minChunks,
    }),
    // 清空构建目录 ./build 文件夹下的所有文件
    new CleanWebpackPlugin(VARIABLE.buildDir)
  ],

  // 加载器配置项
  module: {
    rules: [
      {
        // JS依赖配置项
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }

      }, {

        // 字体图标
        test: /\.(woff|woff2|svg|eot|ttf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: VARIABLE.output.fonts,
          },
        }],

      }, {

        // 文件依赖配置项（音频）
        test: /\.(wav|mp3|ogg)?$/,
        use: [{
          loader: 'file-loader',
          options: {
              name: VARIABLE.output.media,
          },
        }],

      }, {

        // 文件依赖配置项（视频）
        test: /\.(ogg|mpeg4|webm)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: VARIABLE.output.media,
          },
        }],

      }, {

        // 文件依赖配置项（图片）
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: VARIABLE.output.img,
            limit: 8192,
            publicPath: '../..'
          },
        }],

      },
    ]
  }
}

// 不同环境下的操作
if (VARIABLE.isProduction) {

  // 生产环境下的配置
  module.exports.module.rules.push({
    // CSS 依赖配置项
    test: /\.(scss|sass|css)$/,
    use: ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: [
        { loader: "css-loader", }, 
        { loader: "postcss-loader", options: { plugins: loader => [ require('autoprefixer')() ] } },
        { loader: "sass-loader", }
      ]
    })

  });

  module.exports.plugins = (module.exports.plugins || []).concat([
    // 提取 CSS 文件
    new ExtractTextPlugin(VARIABLE.output.css)
  ]);

} else {

  // 开发环境下的配置
  module.exports.module.rules.push({
    // CSS 依赖配置项
    test: /\.(scss|sass|css)$/,
    use: [
      { loader: "style-loader" },
      { loader: "css-loader", options: { sourceMap: true } },
      { loader: "sass-loader", options: { sourceMap: true } }
    ]

  });

  module.exports.plugins = (module.exports.plugins || []).concat([
    // 终端面板
    new DashboardPlugin(),
    // 热更新 HMR
    new webpack.HotModuleReplacementPlugin(),
    // 当开启 HMR 的时候使用该插件会显示模块的相对路径
    new webpack.NamedModulesPlugin(),
    // 错误重启，不终止建构，但会在命令行中输出报错信息
    new webpack.NoEmitOnErrorsPlugin()
  ]);

  // devtool: cheap-module-source-map
  module.exports.devtool = "source-map";

}
