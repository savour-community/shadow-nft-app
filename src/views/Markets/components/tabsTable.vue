<template>
  <div class="shadow-nft-tabs-table-container">
      <div class="shadow-nft-tabs-table-box">
          <el-tabs
            v-model="activeTab"
          >
            <el-tab-pane label="Hot Collections" name="hotCollections"></el-tab-pane>
            <el-tab-pane label="Live Mint" name="liveMint"></el-tab-pane>
            <el-tab-pane label="Hot NFT" name ></el-tab-pane>
          </el-tabs>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const activeTab = ref('hotCollections');

</script>

<style lang="scss" scoped>
    .shadow-nft-tabs-table-container{
        width: 100%;
        .shadow-nft-tabs-table-box{
            width: 1360px;
            padding: 32px 0 40px;
            background: #FFFFFF;
            border-radius: 24px;
            margin: 0 auto 32px;
        }
    }
</style>