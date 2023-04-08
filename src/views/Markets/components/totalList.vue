<template>
  <div class="shadow-nft-total-container">
      <ul class="shadow-nft-total-box">
          <li class="shadow-nft-total-item">
              <h6>Collections</h6>
              <p class="data-box">{{formatPrice(listData.total_collections)}}<span class="rise">{{listData.total_collections_ratio}}%</span></p><!-- 涨 rise 跌 fall -->
              <div class="folding-chart-box">
                  <div ref="collectionChart" style="height: 100%;"></div>
              </div>
          </li>
          <li class="shadow-nft-total-item">
              <h6>NFT Value (USDT)</h6>
              <p class="data-box">{{formatPrice(listData.total_nft_value)}}<span class="rise">{{listData.total_nft_value_ratio}}%</span></p><!-- 涨 rise 跌 fall -->
              <div class="folding-chart-box">
                  <div ref="nftChart" style="height: 100%;"></div>
              </div>
          </li>
          <li class="shadow-nft-total-item">
              <h6>Whale Holders </h6>
              <p class="data-box">{{formatPrice(listData.total_whale)}}<span class="rise">{{listData.total_whale_ratio}}%</span></p><!-- 涨 rise 跌 fall -->
              <div class="folding-chart-box">
                  <div ref="totalWhaleChart" style="height: 100%;"></div>
              </div>
          </li>
          <li class="shadow-nft-total-item">
              <h6>Total Nfts</h6>
              <p class="data-box">{{formatPrice(listData.total_nft)}}<span class="rise">{{listData.total_nft_ratio}}%</span></p><!-- 涨 rise 跌 fall -->
              <div class="folding-chart-box">
                  <div ref="totalNftChart" style="height: 100%;"></div>
              </div>
          </li>
      </ul>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, watchEffect } from 'vue';

const collectionChart = ref(null),
  nftChart = ref(null),
  totalWhaleChart = ref(null),
  totalNftChart = ref(null),
  props = defineProps({
    listData: Object
  }),
  { proxy } = getCurrentInstance(), // 获取全局配置项
  initCollectionChart = () => {
    const myChart = proxy.$echarts.init(collectionChart.value),
      optionOne = {
        xAxis: {
          show: false,
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          show: false
        },
        color: ['#20B26C'],
        series: [
          {
            data: props.listData.total_collections_stat,
            type: 'line',
            symbol: 'none'
          }
        ],
        grid:{ // 让图表占满容器
          top:'0px',
          left:'0px',
          right:'0px',
          bottom:'0px'
        }
      };

    myChart.setOption(optionOne);
  },
  formatPrice = (price) =>{
    return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  initNftChart = () => {
    const myChart = proxy.$echarts.init(nftChart.value),
      optionOne = {
        xAxis: {
          show: false,
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          show: false
        },
        color: ['#20B26C'],
        series: [
          {
            // data: [150, 230, 224, 218, 135, 147, 260],
            data: props.listData.total_nft_value_stat,
            type: 'line',
            symbol: 'none'
          }
        ],
        grid:{ // 让图表占满容器
          top:'0px',
          left:'0px',
          right:'0px',
          bottom:'0px'
        }
      };

    myChart.setOption(optionOne);
  },
  initTotalWhaleChart = () => {
    const myChart = proxy.$echarts.init(totalWhaleChart.value),
      optionOne = {
        xAxis: {
          show: false,
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          show: false
        },
        color: ['#20B26C'],
        series: [
          {
            data: props.listData.total_whale_stat,
            type: 'line',
            symbol: 'none'
          }
        ],
        grid:{ // 让图表占满容器
          top:'0px',
          left:'0px',
          right:'0px',
          bottom:'0px'
        }
      };

    myChart.setOption(optionOne);
  },
  initTotalNftChart = () => {
    const myChart = proxy.$echarts.init(totalNftChart.value),
      optionOne = {
        xAxis: {
          show: false,
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          show: false
        },
        color: ['#20B26C'],
        series: [
          {
            data: props.listData.total_nft_stat,
            type: 'line',
            symbol: 'none'
          }
        ],
        grid:{ // 让图表占满容器
          top:'0px',
          left:'0px',
          right:'0px',
          bottom:'0px'
        }
      };

    myChart.setOption(optionOne);
  };

watchEffect(()=>{
  console.log(999999, props.listData);
  if(props.listData){
    setTimeout(()=>{
      initCollectionChart();
      initNftChart();
      initTotalWhaleChart();
      initTotalNftChart();
    },100);
  }
});

</script>

<style lang="scss" scoped>
    .shadow-nft-total-container{
        width: 100%;
        margin-bottom: 32px;
        .shadow-nft-total-box{
            width: 1360px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .shadow-nft-total-item{
                width: 316px;
                height: 224px;
                background: #FFFFFF;
                border-radius: 24px;
                box-sizing: border-box;
                padding: 24px;
                h6{
                    font-family: 'IBM Plex Sans';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 22px;
                    color: #81858C;
                    margin-bottom: 4px;
                }
                p.data-box{
                    font-family: 'IBM Plex Sans';
                    font-style: normal;
                    font-weight: 600;
                    font-size: 24px;
                    line-height: 32px;
                    color: #121214;
                    margin-bottom: 20px;
                    .rise{
                        font-family: 'IBM Plex Sans';
                        font-style: normal;
                        font-weight: 400;
                        font-size: 10px;
                        line-height: 14px;
                        color: #20B26C;
                        margin-left: 4px;
                        position: relative;
                        &::after{
                            content: "";
                            width: 0px;
                            height: 0px;
                            border-left: 4px solid transparent;
                            border-right: 4px solid transparent;
                            border-bottom: 4px solid #20B26C;
                            position: absolute;
                            top: 6px;
                            right:-10px;
                        }
                    }
                    .fall{
                        font-family: 'IBM Plex Sans';
                        font-style: normal;
                        font-weight: 400;
                        font-size: 10px;
                        line-height: 14px;
                        color: #EF454A;
                        margin-left: 4px;
                        position: relative;
                        &::after{
                            content: "";
                            width: 0px;
                            height: 0px;
                            border-left: 4px solid transparent;
                            border-right: 4px solid transparent;
                            border-top: 4px solid #EF454A;
                            position: absolute;
                            top: 6px;
                            right:-10px;
                        }
                    }
                }
                .folding-chart-box{
                    width: 268px;
                    height: 86px;
                }
            }
        }
    }
</style>