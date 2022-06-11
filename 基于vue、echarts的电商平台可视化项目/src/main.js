import Vue from 'vue'
import App from './App.vue'
import axios from "axios";
import VueRouter from "vue-router"
import "../src/assets/font/iconfont.css"
import router from "./router/index"
// import SocketService from "@/utils/socket_service";
import "./assets/css/global.less"


Vue.use(VueRouter)
// 对服务器进行连接
// SocketService.Instance.connect()
// 将区局的echarts对象挂在在vm上，方便使用(this.$echarts)
Vue.prototype.$echarts=window.echarts
// 对吧socket对象交给wm
// Vue.prototype.$socket=SocketService.instance
Vue.config.productionTip = false

//axios请求基准路径,在别的组件中使用this.$http能使用该封装的组件
axios.defaults.baseURL="http://127.0.0.1:3000/api/"
Vue.prototype.$http=axios

new Vue({
  router:router,
  render: h => h(App),
}).$mount('#app')
