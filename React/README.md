### React 基础知识
#### React 生命周期的三个阶段
- **Mounting：已插入真实DOM（加载阶段）**
	* **constructor**：加载的时候调用一次，可以初始化 state，接受两个参数：props 和 context
	* **render**：挂载渲染组件
	* **componentDidMount**：组件第一次渲染已完成，此时 DOM 节点已经生成，可在这调用 ajax 请求，返回数据 setState 后组件会重新渲染
- **Updating：正在被重新渲染（更新阶段）**
	* **getDerivedStateFromProps**：根据当前的 props 来更新组件的 state，每个 render 都会调用此方法
	* **shouldComponentUpdate**：组件接收新的 props 或 state 时调用，return true 就会更新 DOM， return false 就能阻止更新，主要用于性能优化(部分更新)
	* **getSnapshotBeforeUpdate**：在元素被渲染并写入 DOM 之前调用，使得组件能在发生更改之前从 DOM 中捕获一些信息，此生命周期的任何返回值将作为参数传递给 componentDidUpdate()
	* **render**
	* **componentDidUpdate**：componentDidUpdate(prevProps, prevState, snapshot), 该方法在 getSnapshotBeforeUpdate 方法之后被调用，有三个参数prevProps，prevState，snapshot，表示之前的 props，之前的 state，和snapshot。 第三个参数是 getSnapshotBeforeUpdate 返回的，如果触发某些回调函数时需要用到 DOM 元素的状态，则将对比或 计算的过程迁移至 getSnapshotBeforeUpdate，然后在 componentDidUpdate 中统一触发回调或更新状态。
- **Unmounting：已移出真实DOM（卸载阶段）**
	* **componentWillUnmount**：当组件要被从界面上移除的时候，就会调用。在这个函数中，可以做一些组件相关的清理工作

