<template>
  <div class="com-container">
    <div class="com-chart" ref="map_ref" @dblclick="revertMap"></div>
  </div>
</template>

<script>
import axios from "axios";
import {getProvinceMapInfo} from "@/utils/map_utils";
export default {
  name: "Map",
  data() {
    return {
      chartInstance: null,
      allData: null,
      mapData: {}
    }
  },
  methods: {
    async initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.map_ref, "chalk")
      const ret = (await axios.get("http://localhost:8080/static/map/china.json")).data
      this.$echarts.registerMap("china", ret)
      const initOption = {
        title: {
          text: "商家分布",
          left: 20,
          top: 20
        },
        geo: {
          type: 'map',
          map: 'china',
          top: '5%',
          bottom: '5%',
          itemStyle: {
            areaColor: '#2E72BF',
            borderColor: '#333'
          }
        },
        legend: {
          left: '5%',
          bottom: '5%',
          orient: 'vertical'//图标的排序
        }
      }
      this.chartInstance.setOption(initOption)
      // 使用箭头函数 不然this不能指向VM
      this.chartInstance.on("click", async (arg) => {
        const provinceInfo = getProvinceMapInfo(arg.name)
        //缓存 省的一直发送请求
        if (!this.mapData[provinceInfo.key]) {
          const ret = await axios.get("http://localhost:8080" + provinceInfo.path)
          this.mapData[provinceInfo.key] = ret.data
          this.$echarts.registerMap(provinceInfo.key, ret.data)
        }
        const changeOption = {
          geo: {
            map: provinceInfo.key
          }
        }
        this.chartInstance.setOption(changeOption)
        //在省级地图内没有其他的地图了，因此要取消点击事件
        // this.chartInstance.off("click")
      })

    },
    // 用于获取用户的信息
    async getData() {
      // 获取服务器的数据, 对this.allData进行赋值之后, 调用updateChart方法更新图表
      this.allData = (await this.$http.get('map')).data
      this.updateChart()
    },
    // 更新图表
    updateChart() {
      const legendArr = this.allData.map(item => {
        return item.name
      })
      const seriesArr = this.allData.map(item => {
        // return的这个对象就代表的是一个类别下的所有散点数据
        // 如果想在地图中显示散点的数据, 我们需要给散点的图表增加一个配置, coordinateSystem:geo
        return {
          type: 'effectScatter',
          rippleEffect: {
            scale: 5,
            brushType: 'stroke'
          },
          name: item.name,
          data: item.children,
          coordinateSystem: 'geo' // 在地图中显示散点的数据
        }
      })
      const dataOption = {
        legend: {
          data: legendArr
        },
        series: seriesArr
      }
      this.chartInstance.setOption(dataOption)
    },
    // 回到中国地图
    revertMap() {
      const revertOption = {
        geo: {
          map: 'china'
        }
      }
      this.chartInstance.setOption(revertOption)
    },
    // 屏幕分辨率调整
    screenAdapter() {
      const titleFontSize = this.$refs.map_ref.offsetWidth / 100 * 3.6
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize
          }
        },
        legend: {
          itemWidth: titleFontSize / 2,
          itemHeight: titleFontSize / 2,
          itemGap: titleFontSize / 2,
          textStyle: {
            fontSize: titleFontSize / 2
          }
        }
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    }
  },
  mounted() {
    this.initChart()
    this.getData(),
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed() {
    window.removeEventListener('resize', this.screenAdapter)
  }
}

</script>

<style scoped>

</style>