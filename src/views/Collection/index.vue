<template>
  <default-layout>
    <div class="shadow-setting-container">
        <banner />
        <div  class="main">
          <basic-info />
          <tabs-table />
        </div>
    </div>
  </default-layout>
</template>

<script setup>
import DefaultLayout from '@/layout/defaultLayout.vue';
import Banner from './components/banner.vue';
import BasicInfo from './components/basicInfo.vue';
import TabsTable from './components/tabsTable.vue';
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  top: -68px;
  margin: 0 40px;
}
</style>