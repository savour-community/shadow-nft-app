<template>
  <default-layout>
    <div class="shadow-nft-markets-container">
      <banner />
      <total-list />
      <tabs-table />
    </div>
  </default-layout>
</template>

<script setup>
import DefaultLayout from '@/layout/defaultLayout.vue';
import Banner from './components/banner.vue';
import TotalList from './components/totalList.vue';
import TabsTable from './components/tabsTable.vue';
</script>

<style lang="scss" scoped>
  .shadow-nft-markets-containe{
    width: 100%;
  }
</style>