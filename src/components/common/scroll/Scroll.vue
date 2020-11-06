<template>
  <!-- 
    ref/children 
    ref 绑定到一个子组件中，通过this.$refs.ref值 获取到一个组件对象
    ref 绑定到一个普通元素中，通过this.$refs.ref值 获取到一个元素对象
  -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'


export default {
  name: 'Scroll',
  data () {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    },
  },
  mounted() {
    // 使用 $nextTick() 可以在数据发生变化后立即获得更新后的DOM，也就是说在数据渲染完毕以后，界面渲染完毕以后，再执行方法的回调
    this.$nextTick(() => {
      // 创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad
      })

      // 监听滚动的位置
      this.scroll.on('scroll', (position) => {
        // console.log(position);
        this.$emit('scroll', position)
      })

      // 监听scroll 滚动到底部
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    })
  },
  methods: {
    scrollTo(x, y, time=2000) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh()
      }, 300)
    }
  }
}

</script>
<style scoped>
</style>