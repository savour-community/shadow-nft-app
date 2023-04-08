<template>
  <div class="whale-holder-container">
    <div class="whale-holder-box">
      <div class="whale-holder-title">
        <h6>WhaleHolder</h6>
        <p>Top100</p>
      </div>
      <div class="whale-holer-table">
        <el-table
          :data="whaleHolder"
          :default-sort="{ prop: 'date', order: 'descending' }"
          style="width: 100%"
        >
        <el-table-column prop="address" label="Address"/>
        <el-table-column prop="total_value" label="Token Value"  sortable />
        <el-table-column prop="hold_nft_list" label="Hold NFTs" >
          <template #default="{ row }">
            <img  v-for="item in row.hold_nft_list" src="../../../assets/img/profile/2.png" :key="item" class="profile"/>
          </template>
        </el-table-column>
        <el-table-column prop="hold_collection_list" label="Hold Collections" >
          <template #default="{ row }">
            <img v-for="item in row.hold_collection_list" src="../../../assets/img/profile/1.png" :alt="item" class="profile">
          </template>
        </el-table-column>
        <el-table-column prop="realize_pnl" label="Realized PnL" />
        <el-table-column prop="label" label="Label" />
        </el-table>
        <!-- view more -->
        <div class="view-more-box" @click="handleToViewMore">{{ `View More` }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter(),
  { whaleHolder } = defineProps({
    whaleHolder: Array
  }),
  handleToViewMore = () => {
    router.push({
      path: '/ViewMore'
    });
  };

onMounted(() => {});
</script>

<style lang="scss" scoped>
.whale-holder-container {
  width: 100%;
  .profile{
    border-radius: 50px;
    width: 32px;
    height: 32px;
  }
  .whale-holder-box {
    width: 1360px;
    padding: 32px 0 40px;
    background: #ffffff;
    border-radius: 24px;
    margin: 0 auto 32px;
    .whale-holder-title {
      padding: 0 24px 0;
      h6 {
        font-size: 24px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #222222;
        line-height: 33px;
        margin-bottom: 10px;
      }
      p {
        font-size: 14px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #222222;
        line-height: 20px;
      }
    }
    .whale-holer-table {
      :deep(.el-tabs__nav-scroll) {
        padding: 0 24px;
      }
      :deep(.el-tabs__nav-wrap::after) {
        height: 0;
      }
      :deep(.el-tabs__active-bar) {
        height: 0;
      }
      :deep(.el-tabs__item) {
        font-size: 24px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        line-height: 33px;
        color: #81858c;
      }
      :deep(.el-tabs__item.is-active) {
        color: #222;
      }
      .shadow-score-box {
        display: flex;
        align-items: center;
        .shadow-score-logo {
          width: 60px;
          height: 60px;
          background: #d8d8d8;
          border-radius: 16px;
          margin-right: 11px;
        }
        .shadow-score-info-box {
          .name {
            display: flex;
            align-items: center;
            span {
              font-size: 18px;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              color: #222222;
              line-height: 25px;
            }
            img {
              width: 12px;
              height: 12px;
              margin-top: 10px;
              margin-left: 5px;
            }
          }
          .holder {
            font-size: 10px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 14px;
          }
        }
      }
      .vllume-box {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        p {
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #222222;
          line-height: 25px;
          margin-right: 5px;
        }
        span {
          font-size: 14px;
          font-family: Helvetica;
          color: #52cca3;
          line-height: 12px;
          display: flex;
          align-items: center;
          img {
            margin-left: 2px;
          }
        }
      }
      .mint-chart {
        width: 115px;
        height: 44px;
      }
      .view-more-box {
        width: 1312px;
        height: 52px;
        background: #f5f5fc;
        border-radius: 10px;
        margin: 24px auto 0;
        /* Regular/16 */
        font-family: "IBM Plex Sans";
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 52px;
        /* identical to box height, or 150% */
        text-align: center;
        /* Gray [T]/T1_Title */
        color: #121214;
        cursor: pointer;
      }
    }
  }
}
</style>