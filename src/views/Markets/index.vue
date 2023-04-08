<template>
  <default-layout>
    <div class="shadow-nft-markets-container">
      <banner />
      <total-list :listData="listData"/>
      <tabs-table
        :hotCollections="hotCollections"
      />
      <whale-holder :whaleHolder="whaleHolderData"/>
      <what-shadow-score :shadowScore="shadowScore"/>
    </div>
  </default-layout>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import DefaultLayout from '@/layout/defaultLayout.vue';
import Banner from './components/banner.vue';
import TotalList from './components/totalList.vue';
import TabsTable from './components/tabsTable.vue';
import WhaleHolder from './components/whaleHolder.vue';
import WhatShadowScore from '@/components/whatShadowScore.vue';
import { getIndex } from '@/assets/js/http.js';

let listData = ref({}),
  hotCollections = ref([]),
  whaleHolderData = ref([]),
  shadowScore = ref({});

onMounted(async () => {
  const res = await getIndex();

  listData.value = res?.head_data;
  hotCollections.value = res;
  whaleHolderData.value = res?.whale_holder_list;
  shadowScore.value = res?.shadow_score;
});

</script>

<style lang="scss" scoped>
  .shadow-nft-markets-container{
    width: 100%;
    min-height: 100vh;
    background-image: url('~@/assets/img/index_bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top center;
  }
</style>