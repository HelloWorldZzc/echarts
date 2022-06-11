<template>
  <div class="com-container">
    <div class="title" :style="comStyle">
      <span>{{"▎"+showTitle}}</span>
      <span class="iconfont icon-arrow-down" :style="comStyle" @click="showChoice=!showChoice"></span>
      <div class="select-con" v-show="showChoice" :style="marginStyle">
          <div class="select-item" v-for="item in selectType":key="item.key"  @click="handleSelect(item.key)">
            {{ item.text }}
          </div>
      </div>
    </div>
    <div class="com-chart" ref="trend_ref"></div>
  </div>
</template>
<script>
export default {
  name: "Trend",
  data() {
    return {
      chartInstance: null,//echarts创建的实例对象
      allData: null,//从服务器中获得的数据
      showChoice: false,//是否显示可选按钮
      choiceType: "map",//显示的数据类型
      titleFontSize: 0//指明标题的字体的大小
    }
  },
  // created () {
  //   // 在组件创建完成之后 进行回调函数的注册
  //   this.$socket.registerCallBack('trendData', this.getData)
  // },
  mounted() {
    this.initChart()
    this.getData()
    // this.$socket.send({
    //   action:"getData",
    //   socketType:"trendData",
    //   chartName:"trend",
    //   value:""
    // })
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed() {
    window.removeEventListener("resize",this.screenAdapter)
    // this.$socket.unRegisterCallBack('trendData')
  },
  computed: {
    //下拉菜单中，能够选择的类别--->不能选择和所展示一样的类别
    selectType(){
      if(!this.allData){
        return []
      }
      else{
        return this.allData.type.filter(item=>{
          return item.key!==this.choiceType
        })
      }
    },
    // 所展示的标题
    showTitle(){
      if (!this.allData){
        return ""
      }
      else {
        return this.allData[this.choiceType].title
      }
    },
    // 标题的一些样式属性
    marginStyle(){
      return{
        marginLeft:this.titleFontSize+"px"
      }
    },
    comStyle() {
      return {
        fontSize: this.titleFontSize + "px"
      }
    }



  },

  //实例方法
  methods: {
    //初始化界面
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.trend_ref, "chalk")
      const initOption={
        grid:{
          left: '3%',
          top: '35%',
          right: '4%',
          bottom: '1%',
          containLabel: true//是否包含字体的距离
        },
        tooltip:{
          trigger:"axis"
        },
        legend:{
          left: 20,
          top:"15%",
          icon:"circle"
        },
        xAxis: {
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          type: 'value'
        }
      }
      this.chartInstance.setOption(initOption)
    },
    async getData () {
      /*
      *  const { data: ret } = await this.$http.get('stock')
      this.allData = ret
      // console.log(this.allData)
      this.updateChart()
      this.startInterval()
      * */

      // 获取从服务器端得到的数据
      this.allData=(await this.$http("trend")).data
      this.updateChart()
    },
    updateChart () {
      //两组颜色的值
      const colorArr1 = [
        'rgba(11, 168, 44, 0.5)',
        'rgba(44, 110, 255, 0.5)',
        'rgba(22, 242, 217, 0.5)',
        'rgba(254, 33, 30, 0.5)',
        'rgba(250, 105, 0, 0.5)'
      ]
      const colorArr2 = [
        'rgba(11, 168, 44, 0)',
        'rgba(44, 110, 255, 0)',
        'rgba(22, 242, 217, 0)',
        'rgba(254, 33, 30, 0)',
        'rgba(250, 105, 0, 0)'
      ]
      //处理数据--->类目数据
      const timeArr=this.allData.common.month
      //Y轴的数据series下的数据---根据用户选择的不同，展示的也不同
      const valueArr=this.allData[this.choiceType].data
      // 配置好的series数据，直接能够使用
      const seriesArr=valueArr.map((item,index)=>{
        return{
          name:item.name,
          type:"line",
          data:item.data,
          stack:this.choiceType,//相同的类名具有堆叠效果
          // 颜色的渐变效果
          areaStyle:{
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: colorArr1[index]
              }, // %0的颜色值
              {
                offset: 1,
                color: colorArr2[index]
              }
              ]) // 100%的颜色值
          },
        }
      })
      //图例的数据
      const legendArr=valueArr.map(item=>{
        return item.name
      })
      //option
      const dataOption={
        xAxis: {
          data: timeArr
        },
        legend: {
          data:legendArr
        },
        series:seriesArr
      }
      this.chartInstance.setOption(dataOption)
    },
    //当窗口变化的时候，自适应窗口
    screenAdapter () {
      //根据窗口的大小自适应标题的大小
      this.titleFontSize=this.$refs.trend_ref.offsetWidth/100*3.6
      const adaptOption={
        legend:{
          itemWidth: this.titleFontSize,
          itemHeight: this.titleFontSize,
          itemGap: this.titleFontSize,
          textStyle: {
            fontSize: this.titleFontSize
          }
        }
      }
      this.chartInstance.setOption(adaptOption)
      this.chartInstance.resize()
    },
    handleSelect (currentType) {
      this.choiceType=currentType
      this.updateChart()
      this.showChoice=false
    }
  }


}
</script>
<style lang="less" scoped>
.title {
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 10;
  color: white;

  .title-icon {
    margin-left: 10px;
    cursor: pointer;
  }

  .select-con {
    background-color: #222733;
  }
}
</style>