const path = require("path")
    , VARIABLE = {}


/**
 * 是否为生产环境
 * @type    {boolean}
 * @default false
 */

VARIABLE.isProduction = process.env.NODE_ENV === 'production' ? true : false

/**
 * 获取path函数
 * @param src 根目录下的子文件路径
 */

VARIABLE.getPath = (src = "") => path.resolve(__dirname, src)

/**
 * 构建文件目录
 * @type {string}
 */

VARIABLE.buildDir = "./build"

/**
 * 入口文件路径配置
 * @type {string | array | object}
 */

VARIABLE.entry = [
  VARIABLE.getPath("src/js/main")
]

/**
 * 输出文件路径配置
 * @type {{path, publicPath: string, css: string, filename: string, fonts: string, media: string}}
 * @prop path         构建的文件目录规则
 * @prop publicPath   资源引用的公共路径规则
 * @prop filename     构建后生成文件规则
 * @prop css          构建后的样式文件规则
 * @prop fonts        构建后的字体图标文件规则
 * @prop media        构建后成的媒体文件(视频/音频)规则
 */

VARIABLE.output = {
  path: VARIABLE.getPath(VARIABLE.buildDir),
  filename: `dist/js/[name].js`,
  media: `dist/media/[name].[ext]`,
  fonts: `dist/fonts/[name].[ext]`,
  css: `dist/css/[name].css`,
  img: `dist/images/[name].[ext]`,
  publicPath: VARIABLE.isProduction ? "./" : "/",
}

/**
 * html插件配置
 * @type {{title: string, filename, template: string}}
 * @prop title      html中的title标签内容
 * @prop filename   构建后生成文件规则
 * @prop template   html模版文件
 */

VARIABLE.htmlPlugin = {
  title: "Hello World",
  filename: VARIABLE.getPath(VARIABLE.buildDir + "/index.html"),
  template: VARIABLE.getPath("src/index.html"),
}


/**
 * 选择要提取公共代码 filename 可以是个数组，提取多个文件中的公用代码
 * @type {{name: string, filename: string, minChunks: number}}
 * @prop name           公共代码的chunk命名
 * @prop filename       打包后生产的js文件
 * @prop minChunks      最少共用几次将会被提取
 */

VARIABLE.CommonsChunkPlugin = {
  name: 'commons',
  filename: VARIABLE.output.filename,
  minChunks: 2,
};


/**
 * devServer 配置
 * @prop port 端口
 * @prop open 是否浏览器中打开 http://localhost:port
 * @prop hot  是否开启模块热替换
 */

VARIABLE.server = {
  port: 9000,
  open: true,
  hot: true
}

module.exports = VARIABLE
