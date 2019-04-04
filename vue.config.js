// const path = require("path");
// function resolve(dir) {
//   return path.join(__dirname, dir);
// }

module.exports = {
  // 项目部署的基础路径
  publicPath: "./",
  // 输出文件目录。
  // "dist",
  outputDir: "../../cordova/webRTC/platforms/android/app/src/main/assets/www/",
  // 是否在保存的时候使用 `tslint-loader` 进行检查。
  // 有效的值：`true` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  lintOnSave: true,
  // webpack配置
  // 该对象将会被 webpack-merge 合并入最终的 webpack 配置。
  // configureWebpack: {
  //   // 主要作用就是，不处理应用的某些依赖库，使用externals配置后，依旧可以在代码中通过CMD、AMD或者window/global全局的方式访问。
  //   externals: { BaiduMap: "BMap", AMap: "AMap" } // 有效
  // },
  chainWebpack: config => {
    // config.resolve.alias
    //   .set("@$", resolve("src"))
    //   .set("src", resolve("src"))
    //   .set("assets", resolve("src/assets"))
    //   .set("components", resolve("src/components"))
    //   .set("layout", resolve("src/layout"))
    //   .set("base", resolve("src/base"))
    //   .set("static", resolve("src/static"));
  },
  // webpack-dev-server 相关配置
  devServer: {
    // open: process.platform === "darwin", // darwin苹果系统打开浏览器 Chrome
    host: "0.0.0.0",
    port: 3333,
    // https: true, // 启动https
    // hotOnly: false,
    proxy: {
      // 设置代理
      // proxy all requests starting with /api to jsonplaceholder
      "/rtsp": {
        // target: 'http://192.168.0.57:8081',  // 你接口的域名 设置你调用的接口域名和端口号 别忘了加http
        target: "rtsp://admin:abc12345@192.168.1.12:554/h264/ch1/main/", // tpl服务器IP
        // target: 'http://115.29.44.53:8080', // 阿里云服务器IP
        // secure: false,                       // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          // '^/fsy': ''
          "^/": "/" // 这里理解成用'/ledger'代替target里面的地址，后面组件中我们掉接口时直接用ledger代替
          // 比如我要调用'http://192.168.0.57:8081/ledger/add'，直接写'/ledger/add'即可
        }
        // 正式环境： 接口地址 /api/**                         前端页面地址
        // 开发环境： 接口地址 http://www.xxx.com/api/**       前端页面地址  http://localhost:8080
      },
      "/nodeSse": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        pathRewrite: {
          "^/nodeSse/": "/"
        }
      },
      "/pythonSse": {
        target: "http://192.168.11.47:8282",
        changeOrigin: true,
        pathRewrite: {
          "^/pythonSse/": "/"
        }
      }
    }
  }
};
