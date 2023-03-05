<template>
  <default-layout>
    <div class="shadow-nft-markets-container">
      <banner />
      <total-list />
      <tabs-table />
      <whale-holder />
      <what-shadow-score />
    </div>
  </default-layout>
</template>

<script setup>
import DefaultLayout from '@/layout/defaultLayout.vue';
import Banner from './components/banner.vue';
import TotalList from './components/totalList.vue';
import TabsTable from './components/tabsTable.vue';
import WhaleHolder from './components/whaleHolder.vue';
import WhatShadowScore from '@/components/whatShadowScore.vue';
</script>

<style lang="scss" scoped>
  .shadow-nft-markets-container{
    width: 100%;
    min-height: 100vh;
    background-image: url('~@/assets/img/index_bg.png');
    background-repeat: no-repeat;
    background-position: top center;
  }
</style>