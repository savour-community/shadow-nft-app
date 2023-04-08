<template>
    <div class="overview-shadow">
        <div class="overview-shadow-score-box">
        <div class="overview-shadow-score-box-main">
            <div class="what-shadow-score-left-box">
            <h6 class="score-title">Shadow Score</h6>
            <div class="score-chart" ref="scoreChart"></div>
            </div>
            <div class="what-shadow-score-right-box">
            <p class="shadow-score-desc-title">概要{{collectionDetail.chain}}</p>
            <p class="shadow-score-desc">1. Price异常降低，请注意风险</p>
            <p class="shadow-score-desc">2. Whale Hold大幅，</p>
            <p class="shadow-score-desc">3. 近一天TXNs升高，？？？</p>
            </div>
        </div>
        <div class="flex justify-center">
            <el-icon><Warning /></el-icon>  <span class="c-81858C">推荐指数仅供参考，请注意投资风险</span>
        </div>
        </div>
        <div class="flex justify-between mb-46">
          <div class="flex">
              <div class="mr-32 holders-type">
                  <div :class="holdersType === 'total' ? 'holders-type-item active': 'holders-type-item'">Total</div>
                  <div :class="holdersType === 'average' ? 'holders-type-item active': 'holders-type-item'">Average</div>
              </div>
              <el-select v-model="holdersTime" class="search-select"  placeholder="Select">
              <el-option
                  v-for="item in hourRange"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
              </el-select>
          </div>
          <el-input :prefix-icon="Search" class="search-input" v-model="holdersStr" placeholder="Please input" />
        </div>
        <price-card :list="priceCardList" class="mb-32"/>
        <div class="sub-title mb-32">Trading</div>
        <div class="card-container mb-32">
          <div class="card">
            <div class="title">成交价格</div>
            <div class="chart-container" ref="priceChart"></div>
          </div>
          <div class="card">
            <div class="title">Volume</div>
            <div class="chart-container" ref="volumeChart"></div>
          </div>
          <div class="card">
            <div class="title">List</div>
            <div class="chart-container" ref="listChart"></div>
          </div>
          <div class="card">
            <div class="title">Floor Price</div>
            <div class="chart-container" ref="floorChart"></div>
          </div>
        </div>
        <div class="sub-title mb-32">Holders</div>
        <whale-holder/>
        <div class="sub-title mb-32">Social Trends</div>
        <div class="card-container mb-32">
          <div class="card">
            <div class="title">Twitter Explore</div>
            <div class="chart-container" ref="exploreChart"></div>
          </div>
          <div class="card">
            <div class="title">搜索热度指数</div>
          </div>
        </div>
    </div>
</template>

<script setup>
import WhaleHolder from './whaleHolder.vue';
import PriceCard from './priceCard.vue';

import { ref, onMounted, getCurrentInstance, watchEffect } from 'vue';
import { Search, Warning } from '@element-plus/icons-vue';

const props = defineProps({
    collectionDetail: {
      type: Object,
      required: true
    }
  }),

  holdersType = ref('total'),
  holdersTime = ref('lastHour'),
  holdersStr= ref(''),
  hourRange = [
    {
      value: 'lastHour',
      label: 'Last Hour'
    },
    {
      value: 'last24Hour',
      label: 'Last 24 Hour'
    },
    {
      value: 'lastDay',
      label: 'Last Day'
    },
    {
      value: 'last7Days',
      label: 'Last 7 Days'
    },
    {
      value: 'last30Days',
      label: 'Last 30 Days'
    }
  ],
  scoreChart = ref(null),
  priceChart = ref(null),
  volumeChart = ref(null),
  listChart = ref(null),
  floorChart = ref(null),
  exploreChart = ref(null),

  priceCardList = ref([{
    title: 'Total Price',
    price: '1000',
    percent: '2.48%'
  },{
    title: 'Total Holders',
    price: '12,121',
    percent: '2.48%'
  },{
    title: 'Total Whale Holders',
    price: '12,121',
    percent: '2.48%'
  },{
    title: 'Total TXNs',
    price: '2.68',
    percent: '2.48%'
  }
  ]),

  { proxy } = getCurrentInstance();

let data = [0,0,0,0,0,0],
  indicatorname = ['蓝筹度', '潜在收益', '热度', '社区活跃','可靠度', '流动性'],
  maxdata = [100, 100, 100, 100, 100, 100],
  optionData = null,
  indicator = [];

watchEffect(()=>{
  // eslint-disable-next-line
  const {shadow_score} = props.collectionDetail;
  // eslint-disable-next-line
  if(shadow_score){
    // eslint-disable-next-line
    data= [shadow_score.blue_chip, shadow_score.potential_income, shadow_score.heat, shadow_score.community_active, shadow_score.reliability,shadow_score.fluidity]
  }
  console.log(8888,props.collectionDetail);
});

const contains = (arrays, obj) => {
    let i = arrays.length;

    while (i--) {
      if (arrays[i] === obj) {
        return i;
      }
    }
    return res;
  },
  innerdata = (i) => {
    let innerdata2 = [];

    for (let j = 0; j < data.length; j++) {
      innerdata2.push(100 - 20 * i);
    }
    return innerdata2;
  },
  getData = () => {
    let res = {
      series: [{
        type: 'radar',
        symbolSize: 10,
        symbol: 'circle',
        areaStyle: {
          color: '#39B2FF',
          opacity: 0.3
        },
        lineStyle: {
          width: 3
        },
        itemStyle: {
          color: '#fff ',
          borderWidth: 4,
          opacity: 1
        },
        label: {
          show: false
        },
        data: [{
          value: data
        }],
        z: 100
      }]
    };

    for (let i = 0; i < data.length; i++) {
      res.series.push({
        type: 'radar',
        data: [{
          value: innerdata(i)
        }],
        symbol: 'none',
        lineStyle: {
          width: 0
        },
        itemStyle: {
          color: '#fff'
        },
        areaStyle: {
          color: '#fff',
          shadowColor: 'rgba(14,122,191,0.15)',
          shadowBlur: 30,
          shadowOffsetY: 20
        }
      });
    }
    return res;
  },

  initScoreChart = () => {
    optionData = getData();
    for (let i = 0; i < indicatorname.length; i++) {
      indicator.push({
        name: indicatorname[i],
        max: maxdata[i]
      });
    }
    const myChart = proxy.$echarts.init(scoreChart.value),
      option = {
        backgroundColor: '#fff',
        tooltip: {
          formatter: function() {
            let html = '';

            for (let i = 0; i < data.length; i++) {
              html += indicatorname[i] + ' : ' + data[i] + '%<br>';
            }
            return html;
          }
        },
        radar: {
          indicator: indicator,
          splitArea: {
            show: true,
            areaStyle: {
              color: '#fff',
              shadowColor: 'rgba(14,122,191,0.19)',
              shadowBlur: 30,
              shadowOffsetY: 20
            }
          },
          splitLine: {
            show: false

          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          name: {
            textStyle: {
              rich: {
                a: {
                  fontSize: '17',
                  color: '#333',
                  align: 'left',
                  lineHeight: '30',
                  fontWeight: 'bold'
                },
                b: {
                  fontSize: '15',
                  color: '#666',
                  align: 'left'
                }
              }
            },

            formatter: function(params) {
              let i = contains(indicatorname, params),
                percent = data[i] / 100 * 100;

              return '{a|' + percent + '%}\n' + '{b|' + params + '}';
            }
          }
        },
        series: optionData.series
      };

    myChart.setOption(option);
  },

  initPriceChart = () => {
    const myChart = proxy.$echarts.init(priceChart.value),
      option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }
        ]
      };

    myChart.setOption(option);
  },

  initVolumeChart = () => {
    const myChart = proxy.$echarts.init(volumeChart.value),
      option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }
        ]
      };

    myChart.setOption(option);
  },

  initListChart = () => {
    const myChart = proxy.$echarts.init(listChart.value),
      option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }
        ]
      };

    myChart.setOption(option);
  },

  initFloorChart = () => {
    const myChart = proxy.$echarts.init(floorChart.value),
      option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      };

    myChart.setOption(option);
  },
  initExploreChart = () => {
    const keywords = [];

    for (let index = 0; index < 20; index++) {
      let random = Math.floor(Math.random() * 100);

      keywords.push({
        name: random,
        value: random
      });
    }
    const myChart = proxy.$echarts.init(exploreChart.value),
      option = {
        // title: {
        //   text: '热词',
        //   textStyle: {
        //     color: '#148D75'
        //   },
        //   top: 14,
        //   left: 26
        // },
        series: [
          {
            type: 'wordCloud',
            sizeRange: [12, 60],
            rotationRange: [-90, 90],
            rotationStep: 45,
            gridSize: 15,
            shape: 'pentagon',
            width: '100%',
            height: '100%',
            drawOutOfBound: true,
            textStyle: {
              color: function () {
                const colorArr = [
                  '#30B52E',
                  '#CFC4F9',
                  '#5A5A5A',
                  '#FFDCDD',
                  '#C1E3F9',
                  '#DDF1DB',
                  '#F2A1DB',
                  '#77C4F2',
                  '#92D48E',
                  '#1E86FF'
                ];
                // return (
                //   'rgb(' +
                //   [
                //     Math.round(Math.random() * 160),
                //     Math.round(Math.random() * 160),
                //     Math.round(Math.random() * 160)
                //   ].join(',') +
                //   ')'
                // );

                return colorArr[Math.round(Math.random() * 10)];
              }
            },
            emphasis: {
              textStyle: {
                shadowBlur: 10,
                shadowColor: '#333',
                color: 'red'
              }
            },
            data: keywords
          }
        ]
      };

    myChart.setOption(option);
  };


onMounted(() => {
  setTimeout(() => {
    initScoreChart();
    initPriceChart();
    initVolumeChart();
    initListChart();
    initFloorChart();
    initExploreChart();

  }, 1000);
});

</script>

<style lang="scss" scoped>
  .flex{
    display: flex;
    align-items: center;
  }
  .justify-center {
    justify-content: center;
  }
  .justify-between {
    justify-content: space-between;
  }

  .text-right{
    text-align: right;
  }

  .c-81858C{
    color: #81858C;
  }

  .mr-32{
    margin-right: 32px;
  }

  .mb-32{
    margin-bottom: 32px;
  }

  .mb-46{
    margin-bottom: 46px;
  }

  .search-input{
    width: 410px;
    height: 52px;
    background: #FFFFFF;
    border-radius: 8px;
    :deep(.el-input__wrapper){
      box-shadow: unset;
    }
    :deep(.el-input__inner){
      color: #121214;
      font-size: 16px;
      line-height: 24px;
    }
  }

  .search-select{
    :deep(.el-input){
      width: 280px;
      height: 52px;
    }
    :deep(.el-input__wrapper){
      border-radius: 8px;
      box-shadow: unset;
    }
    :deep(.el-input__inner){
      color: #121214;
      font-size: 16px;
      line-height: 24px;
    }
  }

  .card-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .card{
      width: 664px;
      height: 468px;
      padding: 24px;
      background: #FFFFFF;
      border-radius: 24px;
      box-sizing: border-box;
      margin-bottom: 32px
    }
    .title{
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
      color: #121214;
    }
  }
  .holders-type{
    padding: 4px;
    background: #E9EDF2;
    border-radius: 12px;
    display: flex;
    .holders-type-item{
      width: 150px;
      height: 44px;
      border-radius: 4px;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: #ADB1B8;
      display: flex;
      justify-content: center;
      align-items: center;
      &.active{
        background: #FFFFFF;
        color: #121214;
      }
    }
  }
  .sub-title{
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    color: #121214;
  }
  .overview-shadow{
    .chart-container{
      width: 600px;
      height: 441px;
    }
  }
  .overview-shadow-score-box {
      padding: 24px;
      background: #ffffff;
      border-radius: 24px;
      margin: 0 auto 32px;
      box-sizing: border-box;

      .overview-shadow-score-box-main{
        display: flex;
        justify-content: space-between;
      }
      .what-shadow-score-left-box{
          width: 500px;
          .score-title{
            font-size: 24px;
            font-weight: 600;
            color: #222222;
            line-height: 33px;
            margin-bottom: 10px;
          }
          .score-chart{
              width: 500px;
              height: 500px;
          }
      }
      .what-shadow-score-right-box{
          width: 657px;
          .shadow-score-desc{
            font-weight: 400;
            font-size: 18px;
            line-height: 26px;
            color: #121214;
          }
          .shadow-score-desc-title{
            font-weight: 600;
            font-size: 18px;
            line-height: 26px;
            color: #121214;
            line-height: 33px;
            margin: 0 0 32px;
          }
      }
      .search-box{
        width: 410px;
        height: 46px;
        background: #F3F5F7;
        border-radius: 8px;
        box-sizing: border-box;
        padding: 0 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .search-icon{
            width: 16px;
            height: 46px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .search-ipt{
            width: 380px;
            height: 46px;
            box-sizing: border-box;
            padding: 0 8px;
            border: none;
            background: #F3F5F7;
            // color: #ADB1B8;
            font-size: 16px;
            line-height: 46px;
        }
      }
    }
</style>