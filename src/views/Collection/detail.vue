<template>
    <default-layout>
        <div class="collection-detail-container">
            <div class="mb-32 mt-40 flex">
                <div class="shadow-nfts-card">
                    <div class="shadow-nfts-img" :style="`background: url(${nftDetail.image}) no-repeat; background-size: cover`">
                  </div>
                    <div class="shadow-nfts-card-content">
                        <div class="shadow-nfts-title flex">
                          Creator
                          <div class="c-121214 creator">{{nftDetail.creator}}</div>
                          <div class="contract flex"><div class="contract-detail">{{nftDetail.contract}}</div><span>{{(nftDetail.contract||'')?.slice(-6)}}</span></div>
                      </div>
                        <div>Description:</div>
                        <div class="c-81858C">{{nftDetail.describe}}</div>
                    </div>
                </div>
                <div class="overview-content">
                    <div class="title">{{nftDetail.name}}</div>
                    <div class="sub-title">Holder <span class="c-121214">{{nftDetail.holder}}</span>  {{nftDetail.creator}}</div>
                    <el-divider />
                    <div class="overview-content-list">
                        <div class="overview-content-item" v-for="item in options" :key="item.title">
                            <div class="left">{{item.title}}</div>
                            <div class="right">{{item.value}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <price-card :list="priceCardList" class="mb-32"/>
            <div class="card">
                <div class="title">项目活动</div>
                <div class="search-bar">
                  <el-select
                    v-model="value1"
                    multiple
                    placeholder="Select"
                    style="width: 240px"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </div>
                <el-table :data="tableData" :default-sort="{ prop: 'date', order: 'descending' }">
                    <el-table-column prop="type" label="事件"/>
                    <el-table-column prop="from_addr" label="Token Value"/>
                    <el-table-column prop="price" label="Price" sortable />
                    <el-table-column prop="to_addr" label="To" sortable/>
                    <el-table-column prop="trade_time" label="Time" sortable />
                </el-table>
            </div>
        </div>
    </default-layout>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import DefaultLayout from '@/layout/defaultLayout.vue';
import PriceCard from './components/priceCard.vue';
import { getNftDetail } from '@/assets/js/http.js';
const nftDetail = ref({}),
  options = ref([]),
  priceCardList = ref([]),
  tableData = ref([]),
  search = window.location.search,
  params = new URLSearchParams(search);

onMounted(async () => {
  const res = await getNftDetail({
    // eslint-disable-next-line
    nft_id: Number(params.get('id')||1),
    type: 1,
    page: 1,
    // eslint-disable-next-line
    page_size: 10
  });

  nftDetail.value = res;

  options.value = [
    {
      title: 'contract adress',
      value: res.contract
    },{
      title: 'tokenId',
      value: res.toke_id
    },{
      title: 'Content URL',
      value: res.contract
    },{
      title: 'Minting Hash',
      value: res.mint_hash
    },{
      title: 'Minting Date',
      value: res.mint_time
    }
  ];

  priceCardList.value = [{
    title: 'Price',
    price: res.price,
    percent: '2.48%'
  },{
    title: 'Total Holders',
    price: res.holder,
    percent: '2.48%'
  },{
    title: 'Total Whale Holders',
    price: res.whale_holder,
    percent: '2.48%'
  },{
    title: 'Total TXNs',
    price: res.total_txn,
    percent: '2.48%'
  }
  ];

  tableData.value = res.nft_txn;

  // [
  //   {
  //     address: '0x8955...f86b',
  //     tokenValue: 1000,
  //     owned: 200,
  //     realizedPnL: 'Tom',
  //     label: 12300
  //   },
  //   {
  //     address: '0x8955...f86b',
  //     tokenValue: 1000,
  //     owned: 200,
  //     realizedPnL: 'Tom',
  //     label: 12300
  //   },
  //   {
  //     address: '0x8955...f86b',
  //     tokenValue: 1000,
  //     owned: 200,
  //     realizedPnL: 'Tom',
  //     label: 12300
  //   },
  //   {
  //     address: '0x8955...f86b',
  //     tokenValue: 1000,
  //     owned: 200,
  //     realizedPnL: 'Tom',
  //     label: 12300
  //   },
  //   {
  //     address: '0x8955...f86b',
  //     tokenValue: 1000,
  //     owned: 200,
  //     realizedPnL: 'Tom',
  //     label: 12300
  //   }
  // ]

  console.log(1111111, res);
});

</script>

  <style lang="scss" scoped>
  .flex{
    display: flex;
  }
  .mt-40{
    margin-top: 40px;
  }
  .mb-32{
    margin-bottom: 32px;
  }
  .c-121214{
    color: #121214;
  }
  .c-81858C{
    color: #81858C;
  }
  .collection-detail-container{
    margin: 0 40px;
    .card{
      padding: 24px;
      background: #FFFFFF;
      border-radius: 24px;
      box-sizing: border-box;
      margin-bottom: 32px;
      .title{
        font-weight: 600;
        font-size: 20px;
        line-height: 28px;
        color: #121214;
        }
    }
    .shadow-nfts-card{
      width: 580px;
      overflow: hidden;
      background: #fff;
      border-radius: 24px;
      margin: 0 32px 38px 0;
      .shadow-nfts-img{
        width: 580px;
        height: 642px;
      }
      .shadow-nfts-card-content{
        padding: 24px;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        .creator{
          width: 237px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-left: 8px;
        }
        .contract{
          font-size: 18px;
          margin-left: 8px;
        }
        .contract-detail{
          width: 86px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .shadow-nfts-title{
        font-weight: 600;
        font-size: 24px;
        line-height: 32px;
        color: #81858C;
        margin-bottom: 24px;
      }
    }
    .overview-content{
        padding: 24px;
        width: 748px;
        height: 640px;
        background: #FFFFFF;
        border-radius: 24px;
        .title{
            font-weight: 700;
            font-size: 40px;
            line-height: 48px;
            color: #121214;
            margin-bottom: 12px;
        }
        .sub-title{
            font-weight: 500;
            font-size: 20px;
            line-height: 28px;
            color: #ADB1B8;
        }
        .overview-content-list{
            .overview-content-item{
                display: flex;
                margin-bottom: 28px;
                .left{
                    width: 224px;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 24px;
                    color: #81858C;
                }
                .right{
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 24px;
                    color: #121214;
                    flex: 1;
                    width: 0;
                    white-space: pre-wrap;
                    word-break: break-all;
                }

            }

        }
    }
  }
  </style>