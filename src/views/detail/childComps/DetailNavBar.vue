<template>
  <div>
    <nav-bar>
      <div slot="left" 
           class="item-left" 
           @click="backClick">
        <img src="~assets/Img/common/back.svg" alt="">
      </div>
      <div slot="center" class="item-center">
        <div v-for="item in titles" 
             :key="item.id" 
             class="item"
             :class="{active: item.id === currentIndex}"
             @click="titleClick(item.id)">
          {{item.name}}
        </div>     
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';

export default {
  name: 'DetailNavBar',
  data () {
    return {
      titles: [
        {id: 1, name: '商品'},
        {id: 2, name: '参数'},
        {id: 3, name: '评论'},
        {id: 4, name: '推荐'},
      ],
      currentIndex: 1,
    };
  },
  components: {
    NavBar
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index
    },
    backClick() {
      this.$router.back()
    }
  }
}

</script>
<style scoped>
  .item-center {
    display: flex;
  }
  .item {
    flex: 1;
    font-size: 16px;
  }
  .active {
    color: var(--color-high-text);
  }
  .item-left {
    margin-top: 7px;
  }
</style>