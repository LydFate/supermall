<template>
  <div>
    <div class="top">
      <div class="top-img">
        <img :src="shop.logo" alt="">
      </div>
      <span>{{shop.name}}</span>
    </div>
    <div class="bottom">
      <div class="bottom-item bottom-left">
        <div class="info-sells">

        </div>  
      </div>
      <div class="bottom-item bottom-right">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailShop',
  props: {
    shop: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data () {
    return {
      shopInfo: this.shop
    };
  }
}

</script>
<style scoped>
  .top {
    height: 50px;
    display: flex;
  }
  .top span {
    margin-left: 10px;
    margin-top: 16px;
    font-size: 15px;
  }
  .top-img {
    width: 45px;
    height: 45px;
    border-radius: 50px;
    text-align: center;
    border: 1px solid #cccccc;
  }
  .top-img img {
    width: 40px;
    height: 40px;
    margin-top: 4px;
    border-radius: 50px;
  }
</style>