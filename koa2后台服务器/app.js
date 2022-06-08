const koa=require('koa');
const app=new koa();

//使用中间件---1 计算时间的中间件
const {duration}=require("./middleware/koa_response_duration")
app.use(duration)
//使用中间件---2 读取数据的文件
const koa_response_data=require("./middleware/koa_response_data")
app.use(koa_response_data)
//使用中间插件---3 结缘跨域问题
const set_Header=require("./middleware/koa_response_header")
app.use(set_Header)
app.listen(3000,()=>{
    console.log("服务器启动3000启动")
})

const webSocketService=require("./service/web-socket-service")
// 开启服务器的监听
webSocketService.listen()

/**
 * 可能做了这么久我才知道，这不就是一个josn-server的服务框架吗，从本地获取数据 ，通过网络进行展示
 * 使用到了洋葱模型
 * 运用了点击读取文件，拼接绝对路径的方式
 * 完成
 */

