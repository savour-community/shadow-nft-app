<template>
  <div class="shadow-nft-score-container">
    <div class="title">What’s Shadow Score</div>
      <div class="main-container">
      <div class="left">
        <div ref="shadowTotalChart" style="height: 100%;"></div>
      </div>
      <div class="right">
        <div class="desc">描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释</div>
        <div class="sub-title">Safety</div>
        <div class="desc">描述解释描述解释描述解释描述解释描述解释</div>
        <div class="sub-title">Safety</div>
        <div class="desc">描述解释描述解释描述解释描述解释描述解释</div>
        <div class="sub-title">Safety</div>
        <div class="desc">描述解释描述解释描述解释描述解释描述解释</div>
      </div>

      </div>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
const shadowTotalChart = ref([]), { proxy } = getCurrentInstance(); // 获取全局配置项

const initMyChart = () => {

  const myChart = proxy.$echarts.init(shadowTotalChart.value),

    option = {
      // title: {
      //   text: 'Basic Radar Chart'
      // },
      // legend: {
      //   data: ['Allocated Budget', 'Actual Spending']
      // },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: 'Price', max: 6500 },
          { name: 'Whale Hold', max: 16000 },
          { name: 'TNXs', max: 30000 },
          { name: 'Volume', max: 38000 },
          { name: '？？', max: 52000 }
        ]
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: 'Allocated Budget',
              symbol: 'none',
              // itemStyle: {
              //   color: '#B3E4A1'
              // },
              areaStyle: {
                color: 'rgba(152,195,255,0.2)',
                border
              }
            },
            {
              value: [5000, 14000, 28000, 26000, 42000, 21000],
              name: 'Actual Spending',
              symbol: 'none',
              areaStyle: {
                color: 'rgba(132,120,255,0.55)'
              }
            }
          ]
        }
      ]
    };

  myChart.setOption(option);
};

onMounted(() => {
  initMyChart();
});

</script>

<style lang="scss" scoped>
    .shadow-nft-score-container{
        width: 1360px;
        padding: 32px 24px 40px;
        background: #FFFFFF;
        border-radius: 24px;
        margin: 0 auto 32px;
        .main-container{
          display: flex;
        }
        .left{
          width: 1088px;
          margin-right: 53px;
        }
        .title{
          font-size: 24px;
          font-weight: 600;
          color: #222222;
          line-height: 33px;
        }
        .desc{
          font-size: 14px;
          font-weight: 400;
          color: #999999;
          line-height: 20px;
        }
        .sub-title{
          font-size: 24px;
          font-weight: 600;
          color: #222222;
          line-height: 33px;
          margin: 7px 0 10px;
        }
    }
</style>