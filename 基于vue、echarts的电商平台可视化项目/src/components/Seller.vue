<!--
商家销量统计的横向柱状图，在这个组件中真正展示相关的图标信息
-->
<template>
  <div class="com-container">
    <div class="com-chart" ref="seller_ref">
    </div>
  </div>
</template>
<script>
export default {
  name: "Seller",
  data() {
    return {
      //创建echarts的原型对象--->echarts的基础操作
      chartInstance: null,
      allData: null,//数据存储
      currentPage: 1,//当前页码
      totalPage: 0,//总共页码
      timeId: null//定时器标识
    }
  },
  methods: {
    initChart() {
      // 由于echarts已经被我们挂在在$vm的原型对象上了，直接使用即可--->使用相关的主题
      this.chartInstance = this.$echarts.init(this.$refs.seller_ref,"chalk")
      //利用option能多次提交的特性，在不同的函数中加载不同的option
      const InitOption = {
        title: {
          text: " ▎商家销售数据统计",
          left: 20,
          top: 30
        },
        grid: {
          top: "20%",
          left: "2%",
          right: "6%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value"
        },
        yAxis: {
          type: "category",
          scale: true
        },
        tooltip: {
          //  触碰的时候会有的线，在整个柱状图中
          trigger: "axis",
          axisPointer: {
            type: "line",
            z: 0,//Z轴的权值为0，不会挡住原有的柱状图
            lineStyle: {
              color: '#2D3443'
            }
          }

        },
        series: [
          {
            type: 'bar',
            label: {
              show: true,
              position: 'right',
              textStyle: {
                color: 'white'
              }
            },
            itemStyle: {
              // 指明颜色渐变的方向
              // 指明不同百分比之下颜色的值
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                // 百分之0状态之下的颜色值
                {
                  offset: 0,
                  color: '#5052EE'
                },
                // 百分之100状态之下的颜色值
                {
                  offset: 1,
                  color: '#AB6EE5'
                }
              ])
            }
          }
        ]
      }
      this.chartInstance.setOption(InitOption)
      //绑定鼠标移动的事件---点击图标的时候应该让用户查看，所以应该清楚定时器
      this.chartInstance.on('mouseover', () => {
        clearInterval(this.timeId)
      })
      this.chartInstance.on('mouseout', () => {
        this.startInterval()
      })
    },
    async getData() {
      const ret = await this.$http.get("seller")
      // 给获得的数据排序
      ret.data.sort((a, b) => {
        return a.value - b.value
      })
      this.allData = ret.data
      //每5个元素显示到一个页面中
      this.totalPage = Math.ceil(this.allData.length / 5)
      this.updateChart()
      //启动定时器，根据页面进行变化
      this.startInterval()
    },
    updateChart() {
      const start = (this.currentPage - 1) * 5
      const end = this.currentPage * 5
      const showData = this.allData.slice(start, end)

      const sellerName = showData.map((item) => {
        return item.name
      })
      const sellerValue = showData.map((item) => {
        return item.value
      })
      const option = {
        yAxis: {
          type: "category",
          data: sellerName
        },
        series: [
          {
            type: "bar",
            data: sellerValue
          }
        ]

      }
      this.chartInstance.setOption(option)
    },
    // 启动定时器
    startInterval() {
      if (this.timeId) {
        clearInterval(this.timeId)
      }
      this.timeId = setInterval(() => {
        this.currentPage++
        if (this.currentPage > this.totalPage) {
          this.currentPage = 1
        }
        //在更新完相关的数据之后，重新加载刷新图表的界面
        this.updateChart()
      }, 3000)
    },
  //  分辨率UI设计,当浏览器的大小发生改变的时候，会调用此方法，完成对屏幕的适配
    screenAdapter(){
      //根据桌面的情况 自定义相关的大小
      const titleFontSize = this.$refs.seller_ref.offsetWidth / 100 * 3.6
      const  adaptOption= {
        title: {
          textStyle: {
            fontSize: titleFontSize
          }
        },
        tooltip: {
          axisPointer: {
            lineStyle: {
              width: titleFontSize
            }
          }
        },
        series: [
          {
            barWidth: titleFontSize,
            itemStyle: {
              barBorderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0]
            }
          }
        ]


      }
      this.chartInstance.setOption(adaptOption)
      this.chartInstance.resize()
    }
  },
  mounted() {
    this.initChart()
    this.getData()
    window.addEventListener("resize",this.screenAdapter)
    this.screenAdapter()
  },
  destroyed() {
    // 清除定时器
    clearInterval(this.timeId)
    window.removeEventListener("resize",this.screenAdapter)
  }

}
</script>

<style scoped>

</style>