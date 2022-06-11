import VueRouter from "vue-router";
import SellerPage from "@/views/SellerPage";
import TrendPage from "@/views/TrendPage";
import MapPage from "@/views/MapPage";
import RankPage from "@/views/RankPage";
import HotPage from "@/views/HotPage";
import StockPage from "@/views/StockPage";
import index from  "@/views/index"
//路由规则的配置
export default new VueRouter({
    routes:[
        {
            path: '/SellerPage',
            component:SellerPage
        },{
        path:"/TrendPage",
            component:TrendPage
        },
        {
            path:"/MapPage",
            component:MapPage
        },{
        path:"/RankPage",
            component:RankPage
        },{
        path:"/HotPage",
            component:HotPage
        },{
        path:"/StockPage",
            component:StockPage
        },{
        path:"/",
            component:index
        }
    ]
})