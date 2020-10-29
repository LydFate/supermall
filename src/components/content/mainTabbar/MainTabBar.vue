<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="red">
      <img slot="item-icon" src="~assets/Img/tabbar/home.svg" alt="">
      <img slot="item-icon-active" src="~assets/Img/tabbar/home_active.svg" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="red">
      <img slot="item-icon" src="~assets/Img/tabbar/category.svg" alt="">
      <img slot="item-icon-active" src="~assets/Img/tabbar/category_active.svg" alt="">
      <div slot="item-text">应用</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="red">
      <img slot="item-icon" src="~assets/Img/tabbar/shopcart.svg" alt="">
      <img slot="item-icon-active" src="~assets/Img/tabbar/shopcart_active.svg" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="red">
      <img slot="item-icon" src="~assets/Img/tabbar/profile.svg" alt="">
      <img slot="item-icon-active" src="~assets/Img/tabbar/profile_active.svg" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'

  export default {
    name: 'MainTabBar',
    data () {
      return {
      };
    },
    components: {
      TabBar,
      TabBarItem
    },
  }

</script>
<style scoped>
</style>