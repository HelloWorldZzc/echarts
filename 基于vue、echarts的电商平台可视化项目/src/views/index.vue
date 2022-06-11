<template>
  <div class="screen-container">
    <header class="screen-header">
      <span class="logo">
        <!-- 给logo预留一个空间 -->
      </span>
      <span class="title">电商平台实时监控系统</span>
      <div class="title-right">
      <!--  给电话号码预留一个空间<span class="datetime">2049-01-01 00:00:00</span>-->
      </div>
    </header>
    <div class="screen-body">
      <section class="screen-left">
        <div id="left-top">
          <!-- 销量趋势图表 -->
          <Trend></Trend>
          <div class="resize">
            <!-- 右上角的小图标-->
            <router-link to="/trendPage"> <span class="iconfont icon-expand-alt"></span></router-link>
          </div>
        </div>
        <div id="left-bottom">
          <!-- 商家销售金额图表 -->
          <Seller></Seller>
          <div class="resize">
            <!-- icon-compress-alt -->
            <router-link to="/sellerPage"> <span class="iconfont icon-expand-alt"></span></router-link>
          </div>
        </div>
      </section>
      <section class="screen-middle">
        <div id="middle-top">
          <!-- 商家分布图表 -->
          <Map></Map>
          <div class="resize">
            <!-- icon-compress-alt -->
            <router-link to="/mapPage"><span class="iconfont icon-expand-alt"></span></router-link>
          </div>
        </div>
        <div id="middle-bottom">
          <!-- 地区销量排行图表 -->
          <Rank></Rank>
          <div class="resize">
            <!-- icon-compress-alt -->
            <router-link to="/rankPage"><span class="iconfont icon-expand-alt"></span></router-link>
          </div>
        </div>
      </section>
      <section class="screen-right">
        <div id="right-top">
          <!-- 热销商品占比图表 -->
          <Hot></Hot>
          <div class="resize">
            <!-- icon-compress-alt -->
            <router-link to="/hotPage"><span class="iconfont icon-expand-alt"></span></router-link>
          </div>
        </div>
        <div id="right-bottom">
          <!-- 库存销量分析图表 -->
          <Stock></Stock>
          <div class="resize">
            <!-- icon-compress-alt -->
            <router-link to="/stockPage"><span class="iconfont icon-expand-alt"></span></router-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Hot from '@/components/Hot.vue'
import Map from '@/components/Map.vue'
import Rank from '@/components/Rank.vue'
import Seller from '@/components/Seller.vue'
import Stock from '@/components/Stock.vue'
import Trend from '@/components/Trend.vue'
export default {
  components: {
    Hot,
    Map,
    Rank,
    Seller,
    Stock,
    Trend
  },

}
</script>
<style lang="less" scoped>
// 全屏样式的定义
.fullscreen {
  position: fixed!important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  z-index: 100;
}

.screen-container {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background-color: #161522;
  color: #fff;
  box-sizing: border-box;
}
.screen-header {
  width: 100%;
  height: 64px;
  font-size: 20px;
  position: relative;
  > div {
    img {
      width: 100%;
    }
  }
  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 20px;
    transform: translate(-50%, -50%);
  }
  .title-right {
    display: flex;
    align-items: center;
    position:absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-80%);
  }
  .qiehuan {
    width: 28px;
    height: 21px;
    cursor: pointer;
  }
  .datetime {
    font-size: 15px;
    margin-left: 10px;
  }
  .logo {
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-80%);
    img {
      height: 35px;
      width: 128px;
    }
  }
}
.screen-body {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 10px;
  .screen-left {
    height: 100%;
    width: 27.6%;
    #left-top {
      height: 53%;
      position: relative;
    }
    #left-bottom {
      height: 31%;
      margin-top: 25px;
      position: relative;
    }
  }
  .screen-middle {
    height: 100%;
    width: 41.5%;
    margin-left: 1.6%;
    margin-right: 1.6%;
    #middle-top {
      width: 100%;
      height: 56%;
      position: relative;
    }
    #middle-bottom {
      margin-top: 25px;
      width: 100%;
      height: 28%;
      position: relative;
    }
  }
  .screen-right {
    height: 100%;
    width: 27.6%;
    #right-top {
      height: 46%;
      position: relative;
    }
    #right-bottom {
      height: 38%;
      margin-top: 25px;
      position: relative;
    }
  }
}
.resize {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
</style>
