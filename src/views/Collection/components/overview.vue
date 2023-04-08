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
        <div class="flex justify-between mb-46 hidden">
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
            <div class="chart-container" ref="hotChart"></div>
          </div>
        </div>
    </div>
</template>

<script setup>
import WhaleHolder from './whaleHolder.vue';
import PriceCard from './priceCard.vue';
import * as echarts from 'echarts';
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
  hotChart = ref(null),

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

  initPriceChart = (arr) => {
    const myChart = proxy.$echarts.init(priceChart.value),
      option = {
        xAxis: {
          type: 'category',
          data: arr.map(item=> item.stat_time)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            itemStyle: {
              normal: {
                color: 'rgba(119, 196, 242, 1)'
              }
            },
            data: arr.map(item=> item.price),
            type: 'bar'
          }
        ]
      };

    myChart.setOption(option);
  },

  initVolumeChart = (arr) => {
    const myChart = proxy.$echarts.init(volumeChart.value),
      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        xAxis: {
          type: 'category',
          data: arr.map(item=> item.stat_time)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            itemStyle: {
              normal: {
                color: 'rgba(119, 196, 242, 1)'
              }
            },
            symbolSize:0,
            data: arr.map(item=> item.volume),
            type: 'bar'
          },
          {
            itemStyle: {
              normal: {
                color: 'rgba(194, 95, 255, 1)',
                lineStyle: {
                  width: 2,
                  type: 'solid',
                  color: 'rgba(194, 95, 255, 1)'
                }
              }
            },
            symbolSize:0,
            data: arr.map(item=> item.volume),
            type: 'line'
          }
        ]
      };

    myChart.setOption(option);
  },

  initListChart = (arr) => {
    const myChart = proxy.$echarts.init(listChart.value),
      option = {
        xAxis: {
          type: 'category',
          data: arr.map(item=> item.stat_time)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            itemStyle: {
              normal: {
                color: 'rgba(119, 196, 242, 1)'
              }
            },
            data: arr.map(item=> item.price_dis),
            type: 'bar'
          }
        ]
      };

    myChart.setOption(option);
  },

  initFloorChart = (arr) => {
    const myChart = proxy.$echarts.init(floorChart.value),
      option = {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: arr.map(item=> item.stat_time)
        },
        yAxis: {
          type: 'value'
        },
        legend: {
          data: ['Best Offer', 'Floor Price']
        },
        series: [
          {
            name: 'Floor Price',
            itemStyle: {
              normal: {
                color: 'rgba(194, 95, 255, 1)',
                lineStyle: {
                  width: 2,
                  type: 'solid',
                  color: 'rgba(194, 95, 255, 1)'
                }
              }
            },
            symbolSize:0,
            data: arr.map(item=> item.floor_price),
            type: 'line'
          },
          {
            name: 'Best Offer',
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 2,
                  type: 'solid'
                }
              }
            },
            symbolSize:0,
            data: arr.map(item=> item.best_offer),
            type: 'line'
          }
        ]
      };

    myChart.setOption(option);
  },
  initExploreChart = () => {
    const keywords = ['TAMA','LAND','PINK','NRUTO','USDA','ARTEMIS','DPS','STE','PIT','SAINT','BUBBLE','HIODBS','HULK','VERSE','LFGO','RTM','HFT','BINARYX'],
      newKeywords = [];

    for (let index = 0; index < keywords.length; index++) {
      // let random = Math.floor(Math.random() * 18);

      newKeywords.push({
        name: keywords[index],
        value: index
      });
    }

    const myChart = proxy.$echarts.init(exploreChart.value),
      option = {
        series: [
          {
            type: 'wordCloud',
            // shape: 'circle',
            shape: 'pentagon',
            left: 'center',
            top: 'center',
            right: null,
            bottom: null,
            sizeRange: [12, 60],
            rotationRange: [-90, 90],
            rotationStep: 45,
            gridSize: 8,
            width: '100%',
            height: '100%',
            drawOutOfBound: true,
            layoutAnimation: true,
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
              focus: 'self',
              textStyle: {
                // textShadowBlur: 10,
                // textShadowColor: '#333'
                // shadowBlur: 10,
                // shadowColor: '#333',
                // transform: 'scale(1.5)',
                // color: 'black',
                // lineWidth: 3
              }
            },
            data:newKeywords
          }
        ]
      };

    myChart.setOption(option);
  },
  initHotChart = () => {
    const myChart = proxy.$echarts.init(hotChart.value),
      option = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2021-12-12', '2022-01-16', '2022-02-20', '2022-08-14', '2022-09-18', '2022-10-23', '2022-11-27']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{
                  offset: 0, color: 'rgba(194, 95, 255, 0.97)'
                }, {
                  offset: 1, color: 'rgba(255, 255, 255, 0)'
                }
                ]
                ),
                lineStyle: {
                  width: 2,
                  type: 'solid',
                  color: 'rgba(194, 95, 255, 1)'
                }
              }
              // emphasis: {
              //   color: 'rgba(194, 95, 255, 1)',
              //   lineStyle: { // 系列级个性化折线样式
              //     width:2,
              //     type: 'dotted',
              //     color: 'rgba(194, 95, 255, 1)' //折线的颜色
              //   }
              // }
            },
            symbolSize:0,
            areaStyle: {normal: {}},
            data: [40, 59, 100, 10, 80, 30, 90],
            type: 'line'
          }
        ]
      };

    myChart.setOption(option);
  };


onMounted(() => {
  setTimeout(() => {
    initScoreChart();
    // initPriceChart();
    // initVolumeChart();
    // initListChart();
    // initFloorChart();
    initExploreChart();
    initHotChart();
  }, 1000);
  watchEffect(()=>{
  // eslint-disable-next-line
  const {shadow_score, list_list, trading_list, volume_list,whale_holder, floor_price_list} = props.collectionDetail;
    // eslint-disable-next-line
  if(shadow_score){
    // eslint-disable-next-line
    data= [shadow_score.blue_chip, shadow_score.potential_income, shadow_score.heat, shadow_score.community_active, shadow_score.reliability,shadow_score.fluidity]
    }
    // eslint-disable-next-line
    initPriceChart(trading_list||[] );
    // eslint-disable-next-line
    initVolumeChart(volume_list||[]);
    // eslint-disable-next-line
    initListChart(list_list||[]);
    // eslint-disable-next-line
    initFloorChart(floor_price_list||[]);
  });
});

</script>

<style lang="scss" scoped>
  .flex{
    display: flex;
    align-items: center;
  }
  .hidden{
    display: none;
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
      width: 48%;
      min-width: 664px;
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
      width: 100%;
      min-width: 600px;
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