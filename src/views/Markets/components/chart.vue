<template>
   <div class="mint-chart" ref="mintChart"></div>
</template>

<script setup>
import { ref, getCurrentInstance, watchEffect } from 'vue';
import * as echarts from 'echarts';
const mintChart = ref(null),
  props = defineProps({
    data: Object
  }),
  { proxy } = getCurrentInstance(), // 获取全局配置项
  initMyChart = ()=> {
    const myChart = proxy.$echarts.init(mintChart.value),
      option = {
        xAxis: {
          show: false,
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          show: false
        },
        // color: ['#20B26C'],
        series: [
          {
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{
                  offset: 0, color: 'rgba(36, 174, 100, 1)'
                }, {
                  offset: 0.5, color: 'rgba(255, 255, 255, 0)'
                },
                {
                  offset: 1, color: 'rgba(32, 178, 108, 1)'
                }
                ]
                ),
                lineStyle: {
                  width: 2,
                  type: 'solid',
                  color: 'rgba(32, 178, 108, 1)'
                }
              }
            },
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line',
            symbol: 'none'
          }
        ],
        grid: {
        // 让图表占满容器
          top: '0px',
          left: '0px',
          right: '0px',
          bottom: '0px'
        }
      };

    myChart.setOption(option);
  };

watchEffect(()=>{
  if(props.data){
    setTimeout(()=>{
      initMyChart();
    },100);
  }
});
</script>

<style lang="scss" scoped>
</style>