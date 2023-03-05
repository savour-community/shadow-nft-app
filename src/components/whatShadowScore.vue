<template>
  <div class="what-shadow-score-container">
      <div class="what-shadow-score-box">
          <div class="what-shadow-score-left-box">
              <h6 class="score-title">What’s Shadow Score</h6>
              <div class="score-chart" ref="scoreChart">

              </div>
          </div>
          <div class="what-shadow-score-right-box">
              <p class="shadow-score-desc">描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释描述解释</p>
              <p class="shadow-score-desc-title">Safety</p>
              <p class="shadow-score-desc">描述解释</p>
              <p class="shadow-score-desc">描述解释</p>
              <p class="shadow-score-desc-title">Safety</p>
              <p class="shadow-score-desc">描述解释</p>
              <p class="shadow-score-desc">描述解释</p>
              <p class="shadow-score-desc-title">Safety</p>
              <p class="shadow-score-desc">描述解释</p>
              <p class="shadow-score-desc">描述解释</p>
          </div>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';

let data = [80, 70, 30, 85, 25],
  indicatorname = ['政治品德修养', '社会发展能力', '美劳素质拓展', '身心健康发展', '学业发展能力'],
  maxdata = [100, 100, 100, 100, 100],
  optionData = null,
  indicator = [];

function contains(arrays, obj) {
  let i = arrays.length;

  while (i--) {
    if (arrays[i] === obj) {
      return i;
    }
  }
  return false;
}

const scoreChart = ref(null),
  { proxy } = getCurrentInstance();



for (let i = 0; i < indicatorname.length; i++) {
  indicator.push({
    name: indicatorname[i],
    max: maxdata[i]
  });
}

function innerdata(i) {
  let innerdata2 = [];

  for (let j = 0; j < data.length; j++) {
    innerdata2.push(100 - 20 * i);
  }
  return innerdata2;
}
function getData() {
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
}

optionData = getData();


onMounted(() => {
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
});
</script>

<style lang="scss" scoped>
.what-shadow-score-container {
  width: 100%;
  .what-shadow-score-box {
    width: 1360px;
    padding: 46px 40px 0 21px;
    background: #ffffff;
    border-radius: 24px;
    margin: 0 auto 32px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .what-shadow-score-left-box{
        width: 500px;
        .score-title{
            font-size: 24px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #222222;
            line-height: 33px;
            margin-top: -10px;
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
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 20px;
        }
        .shadow-score-desc-title{
            font-size: 24px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #222222;
            line-height: 33px;
            margin: 10px 0;
        }
    }
  }
}
</style>