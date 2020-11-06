<template>
  <div id="home">
    <!-- 标题 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <!-- 类别吸顶 -->
    <tab-control :titles="['流行', '新款', '精选']" 
                   @tabClick="tabClick" 
                   ref="tabControl1" 
                   class="tab-control" 
                   v-show="isTabFixed"/>
    <!-- 滚动 -->
    <scroll class="wrapper" 
            ref="scroll" 
            :probeType="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore"
            >

      <!-- 轮播图 -->
      <home-swiper :banners="banners" 
                   @swiperImageLoad="swiperImageLoad" />
                   
      <!-- 推荐 -->
      <recommends :recommends="recommends" />

      <!-- 每周流行 -->
      <feature-view />

      <!-- 类别 -->
      <tab-control :titles="['流行', '新款', '精选']" 
                   @tabClick="tabClick" 
                   ref="tabControl2" 
                   />

      <!-- 商品展示 -->
      <good-list :goods="showGoods" />
    </scroll>

    <!-- 
      返回顶部 
      .native 监听组件点击
    -->
    <back-top @click.native="backTop" v-show="this.isShow" />
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper';
  import Recommends from './childComps/RecommendView';
  import FeatureView from './childComps/FeatureView';

  import {getHomeMultidata, getHomeGoods} from 'network/home';

  import TabControl from 'components/content/tabControl/TabControl';
  import GoodList from 'components/content/goods/GoodList';
  import BackTop from 'components/content/backTop/BackTop'

  import NavBar from 'components/common/navbar/NavBar';
  import Scroll from 'components/common/scroll/Scroll';

  export default {
    name: "Home",
    data () {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        probeType: 1,
        isShow: true,
        tabOffsetTop: 0,
        isTabFixed: false,
        savaY: 0
      };
    },

    /**
     * 注册组件
     */
    components: {
      NavBar,
      HomeSwiper,
      Recommends,
      FeatureView,
      TabControl,
      GoodList,
      Scroll,
      BackTop
    },

    /** 
     * created 钩子函数 当组件创建完成后执行
     */
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()

      // 请求商品数据
      this.getHomeGood('pop')
      this.getHomeGood('new')
      this.getHomeGood('sell')
    },

    /** 
     * mounted 钩子函数 在模板渲染成html后调用，通常是初始化页面完成后
     */
    mounted() {
      // 防抖函数 加载图片频繁刷新的
      const refresh = this.debounce(this.$refs.scroll.refresh, 500)
      // 监听图片加载完成
      // 事件总线 GoodListItem.vue imageLoad-->  Home.vue
      this.$bus.$on('imageLoad', () => {
        refresh()
      })

      // 获取tabControl 的offsetTop
      // 所有的组件都有一个属性$el: 用于获取组件中的元素
      
    },

    /**
     * activated 钩子函数 被keep-alive 缓存的组件激活时调用
     * 进入页面时，返回到离开页面时的位置
     */
    activated() {
      // console.log('activated');
      this.$refs.scroll.scrollTo(0, this.savaY, 0)
      this.$refs.scroll.refresh()
    },

    /**
     * deactivated 钩子函数 被keep-alive 缓存的组件停用时调用
     * 离开页面时 保存页面当前停留位置
     */
    deactivated() {
      this.savaY = this.$refs.scroll.getScrollY()
    },

    /** 
     * 计算属性
     */
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },

    /**
     * 方法
     */
    methods: {
      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          // this.result = res;
          // 将数据保存到data
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },

      /** 
       * 请求商品数据
       */
      getHomeGood(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // 将 this.goods[type].list中的数据 添加到res.data.list中
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          // this.$refs.scroll.finishPullUp()
        })
      },

      /**
       * 事件监听相关的方法
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
          default:
            break;
        }
        // 设置 tabControl1 和 tabControl2 选中类别一致
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },

      /**
       * 返回顶部
       */
      backTop() {
        this.$refs.scroll.scrollTo(0, 0, 2000)
      },

      // 获取滚动位置
      contentScroll(position) {
        // 判断滚动到什么位置时，返回顶部显示/隐藏
        this.isShow = (-position.y) > 700

        // 决定tabControl 是否吸顶(position: fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },

      /**
       * 上拉加载更多
       */ 
      loadMore() {     
        // 监听图片什么时候加载完
        this.getHomeGood(this.currentType)
        // 重新计算高度
        this.$refs.scroll.refresh()
        // 默认只能上拉加载一次  finishPullUp上拉加载多次
        this.$refs.scroll.finishPullUp()
      },

      /** 
       * 防抖函数
       */ 
      debounce(func, delay) {
        let timer = null
        return function(...args) {
          if(timer) clearTimeout(timer)
          timer = setTimeout(() => {
            func.apply(this, args)
          }, delay)
        }
      },

      /** 
       * 获取tabControl 的 offsetTop
       */
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      }
    }
  }

</script>
<style scoped>
  /* scoped: 作用域，只会在当前文件有效果  */
  #home {
    /* vh: 视口 */
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: rgb(255, 255, 255);
    
    /* 使用浏览器原生滚动时，需要使用fixed 
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  .wrapper {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control {
    top: -20px;
    left: 0;
    right: 0;
    position: relative;
  }
</style>