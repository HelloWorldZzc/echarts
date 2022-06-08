// 读取文件的工具方法
// 使用promise的形式 解决回调地狱的问题
const fs=require("fs")
exports.getFileJsonDate=(filePath)=>{
    return new Promise((resolve,reject)=>{
        fs.readFile(filePath,(err,data)=>{
            if (err){
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}