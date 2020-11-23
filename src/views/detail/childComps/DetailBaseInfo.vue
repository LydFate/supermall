<template>
  <div v-if="Object.keys(detailgoods).length != 0" class="base-info">
    <!-- 标题 -->
    <div class="info-title">{{detailgoods.title}}</div>
    <!-- 价格 -->
    <div class="info-price">
      <span class="n-price">{{detailgoods.lowNowPrice}}</span>
      <span class="o-price">{{detailgoods.oldPrice}}</span>
      <span v-if="detailgoods.discount" class="discount">{{detailgoods.discount}}</span>
    </div>
    <!-- 销量 -->
    <div class="info-other">
      <span>{{detailgoods.columns[0]}}</span>
      <span>{{detailgoods.columns[1]}}</span>
      <span>{{detailgoods.services[detailgoods.services.length-1].name}}</span>
    </div>
    <!-- 发货信息 -->
    <div class="info-service">
      <span class="info-services-item" v-for="index in detailgoods.services.length-1" :key="index">
        <img :src="detailgoods.services[index-1].icon" alt="">
        <span>{{detailgoods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBaseInfo',
  props: {
    detailgoods: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data () {
    return {
    };
  }
}

</script>
<style scoped>
  .info-services-item img {
    width: 20px;
    height: 20px;
  }
</style>