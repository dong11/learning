### Vuex 基础知识
#### 核心概念
- **State**：单一状态树  
	Vuex使用单一状态树，即用一个对象就包含了全部的状态数据。state作为构造器选项，定义了所有我们需要的基本状态参数。
	
- **Getter**：从store的state中派生出的状态

- **Module**：

- **Action**：
	* Action 提交的是 mutation，而不是直接变更状态。
	* Action 可以包含任意异步操作。
	
- **Mutation**：
	* 提交mutation是更改Vuex中的store中的状态的唯一方法。  
	* mutation必须是同步的，如果要异步需要使用action。
	* 每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数，提交载荷作为第二个参数。（提交荷载在大多数情况下应该是一个对象）,提交荷载也可以省略的。