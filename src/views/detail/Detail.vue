<template>
  <div>
    <detail-nav-bar />
    <detail-swiper :topImages="topImages" />
    <detail-base-info :detailgoods="detailgoods" />
    <detail-shop :shop="shop" />
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShop from './childComps/DetailShop'

import {getDetail, detailGoods, Shop} from 'network/detail'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShop
  },
  data () {
    return {
      iid: null,
      topImages: [],
      detailgoods: {},
      shop: {}
    };
  },
  created() {
    // 1. 保存传入的iid
    this.iid = this.$route.params.iid

    // 2. 根据iid获取数据
    getDetail(this.iid).then(res => {
      console.log(res);
      const data = res.result;
      // 获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages;

      // 获取商品信息
      this.detailgoods = new detailGoods(data.itemInfo, data.columns, data.shopInfo.services);

      // 获取店铺信息
      this.shop = new Shop(data.shopInfo)
    })
  }
}

</script>
<style scoped>
</style>