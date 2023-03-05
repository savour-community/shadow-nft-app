<template>
  <div class="shadow-nft-tabs-table-container">
      <div class="shadow-nft-tabs-table-box">
          <div class="tabs">
            <div class="title active">What’s Shadow Score</div>
            <div class="title">Live Mint</div>
            <div class="title">Hot NFT</div>
          </div>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="date" label="Shadow Score" sortable width="180" />
            <el-table-column prop="name" label="24H Vllume(USDT)" sortable width="180" />
            <el-table-column prop="address" label="price" sortable />
            <el-table-column prop="address" label="mint" sortable/>
            <el-table-column prop="address" label="suggestion" sortable/>
          </el-table>
      </div>
  </div>
</template>

<script setup>
// import { ref } from 'vue';
// const activeTab = ref('hotCollections');
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
];

</script>

<style lang="scss" scoped>
    .shadow-nft-tabs-table-container{
        width: 100%;
        .tabs{
          display: flex;
          margin-bottom: 23px;
          .title{
            font-size: 24px;
            font-weight: 600;
            color: #81858C;
            line-height: 33px;
            margin-right: 32px;
            &.active{
              color: #222222;
            }
          }
          
        }
        .shadow-nft-tabs-table-box{
            width: 1360px;
            padding: 32px 24px 40px;
            background: #FFFFFF;
            border-radius: 24px;
            margin: 0 auto 32px;
        }
    }
</style>