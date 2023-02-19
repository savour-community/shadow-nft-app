<template>
  <div class="shadow-nft-container">
    <router-view/>
  </div>
</template>

<script>

</script>


<style lang="scss">
@import './assets/css/reset.scss';
  .shadow-nft-container{
    width: 100%;
    min-height: 100vh;
    background-color: #f5f5f5;
    background-image: url('~@/assets/img/index_bg.png');
    background-repeat: no-repeat;
    background-position: top center;
  }
</style>