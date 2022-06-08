const path = require('path')
const fileUtils = require('../utils/file_utils')
const WebSocket = require('ws')
// 创建WebSocket服务端的对象, 绑定的端口号是9999
const wss = new WebSocket.Server({
    port: 9999
})
// 服务端开启了监听
module.exports.listen = () => {
    // 对客户端的连接事件进行监听
    wss.on('connection', client => {
        console.log('有客户端连接成功了...')
        // 对客户端的连接对象进行message事件的监听
        // msg: 由客户端发给服务端的数据
        client.on('message',async msg => {
            console.log('客户端发送数据给服务端了: ' + msg)
            // json数据格式的解析
            let payload = JSON.parse(msg)
            const action = payload.action
            // 得到其中的数据究竟是做什么的
            if (action === 'getData') {
                let filePath = '../data/' + payload.chartName + '.json'
                // payload.chartName // trend seller map rank hot stock
                filePath = path.join(__dirname, filePath)
                const ret = await fileUtils.getFileJsonData(filePath)
                // 需要在服务端获取到数据的基础之上, 增加一个data的字段
                // data所对应的值,就是某个json文件的内容
                payload.data = ret
                client.send(JSON.stringify(payload))
            } else {
                // 原封不动的将所接收到的数据转发给每一个处于连接状态的客户端
                // wss.clients // 所有客户端的连接，
                // 表示所有的链接都抽到一个其中一个链接发送到的请求
                wss.clients.forEach(client => {
                    client.send(msg)
                })
            }

        })
    })
}
