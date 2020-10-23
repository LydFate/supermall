# Vue

### 一、vue使用

##### 引入vuejs文件

##### 	  创建vue

```javascript
<div id="app">
    {{message}}
</div>
<script>
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  },
  // 方法
  methods: {
      
  },
  // 计算属性
  computed: {
      
  }
})
</script>
```

### 二、vue指令

  1. v-text          更新textContent，等同于JS的text属性，给innerText赋值

  2. v-html 		输出html代码，给innerHTML赋值

  3. v-pre           跳过这个元素和它的子元素编译过程

  4. v-cloak        元素直到关联实例结束时进行编译

  5. v-once         元素只渲染一次

  6. v-if               条件判断

  7. v-else           条件判断，给v-if添加一个“else”块

  8. v-else-if        给v-if添加一个“else-if”块，可以链式的多次使用

  9. v-show         显示或隐藏元素

  10. v-for             循环语句

        * 有两种遍历形式
          1. **site in sites**
          2. **（site  index）in sites**
        * sites是源数据数组并且 site 是数组元素迭代的别名；index是一个可选参数，表示当前项的索引
        * 注意：当v-for和v-if同处于一个节点时，v-for的优先级比v-if更高。意味着v-if将运行在每个v-for循环中

  11. v-model      在表单上创建双向数据绑定

      * v-model会忽略所有表单元素的value、checked、selected特性的初始值。选择vue实例数据做为具体值
      * v-model修饰符
        1. <.lazy>
           * 将v-model转变为change事件再同步
        2. <.number>
           * 自动将用户的输入值转化为数值类型
        3. <.trim>
           * 自动过滤用户输入的首尾空格

  12. v-on            监听dom事件，以便执行一些代码块。表达式可以是一个方法名

      * 可以简写为：【@】

      * 事件修饰符，修饰符可以串联

        1. <.stop>            阻止事件继续传播。调用event.stopPropagation()，停止冒泡。

           ```javascript
           <a v-on:click.stop="doThis"></a> //阻止点击事件继续传播
           ```

        2. <.prevent>      阻止默认行为

           ```javascript
           <form v-on:submit.prevent="onSubmit"></form>  //提交事件不再重载页面
           ```

        3. <.capture>      使用事件捕获模式，即元素自身触发的事件先在此处理，然后才交由内部元素进行处理

           ```javascript
           <div v-on:click.capture="doThis">...</div>
           ```

        4. <.self>              只在当event.target是当前元素自身时触发处理函数

           ```javascript
           <div v-on:click.self="doThat">...</div>
           ```

        5. <.once>            事件只会触发一次

           ```javascript
           <a v-on:click.once="doThis"></a>
           ```

        6. <.passive>        告诉浏览器你不想阻止事件的默认行为

           ```javascript
           <div v-on:scroll.passive="onScroll">...</div>
           //滚动事件的默认行为（即滚动行为）会立即触发，而不会等待'onScroll'完成
           ```

        7. 使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用`v-on:click.prevent.self`会**阻止所有的点击**，而 `v-on:click.self.prevent` 只会阻止对元素自身的点击

  13. v-bind          动态绑定一个或多个特性

        * 可以简写为冒号【:】没有参数时，可以绑定到一个包含键值对的对象。常用于动态绑定class和style。以及href等
        * 三种语法
          1. 对象语法
          2. 数组语法
          3. 直接绑定数据对象

### 三、vue生命周期

 	1. beforeCreate
     * 在实例初始化之后，数据观测和event/watcher时间配置之前被调用
 	2. created
     * 实例已经创建完成之后被调用。实例已完成：数据观测、属性和方法的运算，watch/event事件回调。挂载阶段还没开始，$el属性目前不可见
 	3. beforeMount
     * 挂载开始之前被调用：相关的render函数首次被调用。该钩子函数在服务器端渲染期间不被调用
 	4. mounted
     * el被新创建的vm.$el替换，并挂在到实例上去之后调用该钩子函数。如果root实例挂载了一个文档内元素，当mounted被调用时vm.$el也在文档内。该钩子在服务端渲染期间不被调用
 	5. beforeUpdate
     * 数据更新时调用，发生再虚拟DOM重新渲染和打补丁之前。
     * 可以在该钩子中进一步更改状态，这不会触发附加的重渲染过程。该钩子在服务端渲染期间不被调用
 	6. updated
     - 由于数据更改导致的虚拟DOM重新渲染和打补丁，在这之后会调用该钩子
     - 当这个钩子被调用时，组件DOM已经更新，所有你现在可以执行依赖于DOM的操作。然而再大多数情况下，你应该避免在此期间更改状态，因为这可能会导致更新无限循环。
     - 该钩子在服务器端渲染期间不被调用
 	7. beforeDestroy
     - 实例销毁之间调用。在这一步，实例仍然完全可用。该钩子在服务器端渲染期间不被调用
 	8. destroyed
     - Vue实例销毁后调用。调用后，Vue实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

