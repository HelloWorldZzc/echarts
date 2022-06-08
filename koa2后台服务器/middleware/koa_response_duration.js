//计算服务器消耗时长的中间件
exports.duration=async (ctx,next)=>{
    //由于koa2支持洋葱模型，因此必须要写在第一个，才能获取完整的项目运行时间
    const start =Date.now()
    await next()
    const end=Date.now()
    //设置响应头
    ctx.response.set('X-Response-Time', (end-start) + 'ms')
}