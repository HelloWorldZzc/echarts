//处理业务逻辑，读取某个json文件的数据
const path=require("path")
const {getFileJsonDate}=require("../utils/file_utils")
module.exports=async (ctx,next)=>{
    const url = ctx.request.url //获得发送网络请求的请求头
    // 根据规则，用户调用的时候需要加上API，但是实际上搜索的时候不需要加上API
    let filePath=url.replace("/api","")
    filePath = '../data' + filePath + '.json'
    // 最后filepath是文件的绝对路径
    filePath = path.join(__dirname, filePath)
    try{
        ctx.response.body=(await getFileJsonDate(filePath)).toString()
    }catch (error){
        const errorMessage={
            message:error.message,
            status:404
        }
        ctx.response.body=JSON.stringify(errorMessage)
    }
    await next()
}
