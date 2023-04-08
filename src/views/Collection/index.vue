<template>
  <default-layout>
    <div class="shadow-setting-container">
        <banner />
        <div class="main">
          <basic-info :collectionDetail="collectionDetail"/>
          <tabs-table :collectionDetail="collectionDetail"/>
        </div>
    </div>
  </default-layout>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import DefaultLayout from '@/layout/defaultLayout.vue';
import Banner from './components/banner.vue';
import BasicInfo from './components/basicInfo.vue';
import TabsTable from './components/tabsTable.vue';
import { getHotCollectionDetail } from '@/assets/js/http.js';
const collectionDetail = ref({}),
  search = window.location.search,
  params = new URLSearchParams(search);

onMounted(async () => {
  const res = await getHotCollectionDetail({
    // eslint-disable-next-line
    collection_id: Number(params.get('id')||1),
    page: 1,
    // eslint-disable-next-line
    page_size: 10
  });

  collectionDetail.value = res;
});
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  top: -68px;
  margin: 0 40px;
}
</style>