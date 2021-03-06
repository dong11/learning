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
1. 解析
	将字符串解析生成 AST，生成的 AST 元素节点总共有 3 种类型，1为普通元素，2为表达元素，3为纯文本。
2. 优化语法树
	Vue 模板中并不是所有数据都是响应式的，有很多数据是首次渲染后就永远不会变化的，那么这部分数据生成的 DOM 也不会变化，可以在 patch 的过程跳过对他们的对比。 
3. 生成代码
	通过 generate 方法，将 AST 生成 render 函数。
	
#### Vue中如何检测数组变化
Vue 的 Observer 对数组做了单独的处理，对数组的方法进行编译，并赋值给数组属性的 ```__proto__``` 属性上，因为原型链的机制，找到对应的方法就不会继续往上找了。编译方法中会对一些会增加索引的方法(push、unshift、splice)进行手动 observe。

#### Vue2.x 和 Vue3.x 渲染器的 diff 算法
- 简单来说，diff 算法有一下过程：
	* 同级比较，再比较子节点
	* 先判断一方有子节点一方没有子节点的情况(如果新的 children 没有子节点，将旧的子节点移除)
	* 比较都有子节点的情况（核心 diff）
	* 递归比较子节点

- Vue diff 过程几个核心概念：
	* vnode：虚拟 DOM

		```
		export default class VNode {
			// 列举几个重要的属性
			tag: String | void,
			data: VNodeData | void,
			children: ?Array<Node>,
			text: String | void,
			elm: Node | void,
			context: Component | void; 
			key: string | number | void;
			parent: VNode | void; // component placeholder node
			....
		}
		```
		
		1. children 和 parent 通过这个建立其 vnode 之间的层级关系，对应的也就是真实 dom 的层级关系。
		2. text 如果存在值，证明该 vnode 对应的就是一个文本节点，跟 children 是一个互斥的关系，不可能同时有值。
		3. tag 表明当前 vnode，对应真实 dom 的标签名，如'div'、'p'。
		4. elm 就是当前 vnode 对应的真实的 dom
		5. key 就是当前 vnode 标记的唯一 id。

	* patch  
		1. patch 完成之后，新的 vnode 上会对应生成 elm，也就是真实的 dom，且是已经挂载到 parentElm 下的 dom。简单的来说，如 vue 实例初始化、数据更改导致的页面更新等，都需要经过 patch 方法来生成 elm。
		2. patch 的过程(除去边界条件)主要会有三种 case:
			* 不存在 oldVnode,则进行createElm
			* 存在 oldVnode 和 vnode，但是 sameVnode 返回 false, 则进行createElm
			* 存在 oldVnode 和 vnode，但是 sameVnode 返回 true, 则进行patchVnode

	* sameVnode
	
	```
	function sameVnode (a, b) {
	  return (
	    a.key === b.key && (
	      (
	        a.tag === b.tag &&
	        a.isComment === b.isComment &&
	        isDef(a.data) === isDef(b.data) &&
	        sameInputType(a, b)
	      ) || (
	        isTrue(a.isAsyncPlaceholder) &&
	        a.asyncFactory === b.asyncFactory &&
	        isUndef(b.asyncFactory.error)
	      )
	    )
	  )
	}
	```
	
	* patchVnode
	
		当需要生成 dom，且前后vnode进行sameVnode为true的情况下，则进行patchVnode。
		
	* updateChildren（核心）

- Vue2.x 的核心 diff 算法采用双端比较的算法，同时从新旧 children 的两端开始进行比较，借助 key 值找到可复用的节点，再进行相关操作。相比 React 的 diff 算法，同样情况下可以减少移动节点次数，减少不必要的性能损耗，更加优雅。

- Vue3.x 借鉴了 ivi 算法和 inferno 算法。在创建 VNode 时就确定其类型，以及在 mount/patch 的过程中采用位运算来判断一个 VNode 的类型，在这个基础之上再配合核心的 Diff 算法，使得性能上较 Vue2.x 有了提升。

#### computed 和 watch 的区别
- computed 计算属性，是依赖其他属性的计算值，并且有缓存，只有当依赖的值变化时才会更新。watch 是在监听的属性发生变化时，在回调中执行一些逻辑。
- computed 适合在模板渲染中，某个值是依赖了其他的响应式对象甚至是计算属性计算而来，而 watch 适合监听某个值的变化去完成一段复杂的业务逻辑。

#### computed vs methods
- 计算属性是基于他们的响应式依赖进行缓存的，只有在依赖发生变化时，才会计算求值，而使用 methods，每次都会执行相应的方法。

#### nextTick 是做什么用的，其原理是什么?
- 原理
	1. vue用异步队列的方式来控制DOM更新和nextTick回调先后执行
	2. microtask因为其高优先级特性，能确保队列中的微任务在一次事件循环前被执行完毕
	3. 因为兼容性问题，vue不得不做了microtask向macrotask的降级方案