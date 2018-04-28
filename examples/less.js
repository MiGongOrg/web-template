/**
 * 默认使用 Scss
 * 如果需要使用 Less 请修改 webpage.config.js 配置
 * 安装依赖：npm i -D less less-loader
 */

// 开发环境下的 Less 配置

module.exports.module.rules.push({

  test: /\.(less|css)$/,
  use: [
    { loader: "style-loader" },
    { loader: "css-loader", options: { sourceMap: true } },
    { loader: "less-loader", options: { sourceMap: true } }
  ]

})

// 生成环境下的 Less 配置

module.exports.module.rules.push({

  test: /\.(less|css)$/,
  use: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: [
      { loader: "css-loader", }, 
      { loader: "postcss-loader", options: { plugins: loader => [ require('autoprefixer')() ] } },
      { loader: "less-loader", }
    ]
  })

})