### Vue 基础知识
#### Vue 生命周期
##### 常用的钩子
- beforeCreate：是 new Vue() 之后触发的第一个钩子函数，在当前阶段 data、methods、computed 以及 watched 上的数据和方法都不能被访问。

- created：在实例被创建完成后发生，当前阶段已经完成了数据观测，也就是可以使用数据，更改数据，在这里更改数据不会触发 updated 函数。可以做一些初始数据的获取，在当前阶段无法与 DOM 进行交互，如果非想要，可以通过 vm.$nextTick 来访问 DOM。

- beforeMount：发生在挂在之前，在这之前 template 模板已导入渲染函数编译。而当前阶段虚拟 DOM 已经创建完成，即将开始渲染。在此时也可以对数据进行修改，不会触发 updated。

- mounted：在挂在完成后发生，在当前阶段，真实的 DOM 挂载完毕，数据完成双向绑定，可以访问到 DOM 节点，使用 $refs 属性对 DOM 进行操作。

- beforeUpdate：发生在更新之前，也就是响应数据发生更新，虚拟 DOM 重新渲染之前被触发，可以在当前阶段进行更改数据，不会在成重渲染。

- updated：发生在更新完成之后，当前阶段组件 DOM 已完成更新。要注意的是避免在此期间更改数据，因为这可能会导致无限循环的更新。

- beforeDestroy：发生在实例被销毁之前，在当前阶段实例完全可以被使用，可以在这是进行善后收尾工作，比如清楚计时器。

- destroy：发生在实例销毁之后，这个时候只剩下 DOM 空壳。组件已被拆解，数据绑定被卸除，监听被移除，子实例也统统被销毁。

##### 不常用的钩子
- activated：keep-alive 组件激活时调用，该钩子在服务器端渲染期间不被调用。
- deactivated：keep-alive 组件停用时调用，该钩子在服务器端渲染期间不被调用。
- errorCapture：当捕获一个来自子孙组件的错误时被调用。


#### MVVM
MVVM 是 Model-View-ViewModel 的缩写，也就是把 MVC 中的 Controller 演变成ViewModel。Model 层代表数据模型，View 代表 UI 组件，ViewModel 是 View 和 Model 层的桥梁，数据会绑定到 ViewModel 层并自动将数据渲染到页面中，视图变化的时候会通知 ViewModel 层更新数据。

#### Vue2.x 响应式数据原理
Vue 的响应式是通过 Object.defineProperty 对数据的劫持，并结合观察者模式实现。Vue 利用 Object.defineProperty 创建一个 observe 来劫持监听所有的属性，把这些属性全部转为 getter 和 setter。Vue 中每个组件实例都会对应一个 watcher 实例，他会在组件渲染的过程中使用过的数据属性通过 getter 收集为依赖。之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。

#### Vue模版编译原理
- 解析成 AST (抽象语法树)
- 优化语法树
- 生成代码



