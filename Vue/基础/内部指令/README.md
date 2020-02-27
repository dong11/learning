### Vue 基础--内部指令
#### 1. v-text、v-html
- 示例：

```
// v-text
<span v-text="msg"></span>
<!-- 和下面的一样 -->
<span>{{msg}}</span>

// v-html 不常用  可用组件形式代替
<div v-html="html"></div>
```

#### 2. v-if、v-else、v-show
- 示例：

```
<div v-if="Math.random() > 0.5">
  Now you see me
</div>
<div v-else>
  Now you don't
</div>

<h1 v-show="ok">Hello!</h1>

```

- 区别：
	* 带有 v-show 的元素始终会被渲染并保留在 DOM 中。v-show 只是简单地切换元素的 CSS 属性 display;()
	*  v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
	* v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
	* 相比之下，v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
	* 一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。
	* **<font color='red'>注意，v-show 不支持 ```<template>``` 元素，也不支持 ```v-else```</font>**

#### 3. v-for 循环指令
#### 4. v-on：绑定事件监听器
- 缩写：```@```  
- 常用修饰符：
	* .stop - 调用 event.stopPropagation()。
	* .prevent - 调用 event.preventDefault()。
	* .self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
	* .native - 监听组件根元素的原生事件。
	* .{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
	* .native - 监听组件根元素的原生事件。
	* .once - 只触发一次回调。
- 用法：
	* 绑定事件监听器。事件类型由参数指定。表达式可以是一个方法的名字或一个内联语句，如果没有修饰符也可以省略。
	* 用在普通元素上时，只能监听原生 DOM 事件。用在自定义元素组件上时，也可以监听子组件触发的自定义事件。
	* 在监听原生 DOM 事件时，方法以事件为唯一的参数。如果使用内联语句，语句可以访问一个 $event 属性：v-on:click="handle('ok', $event)"。
- 示例：
  
```
<!-- 方法处理器 -->
<button v-on:click="doThis"></button>

<!-- 内联语句 -->
<button v-on:click="doThat('hello', $event)"></button>

<!-- 缩写 -->
<button @click="doThis"></button>

<!-- 停止冒泡 -->
<button @click.stop="doThis"></button>

<!-- 点击回调只会触发一次 -->
<button v-on:click.once="doThis"></button>
```

#### 5. v-bind
- 缩写：```:```
- 用法： 
	* 动态地绑定一个或多个特性，或一个组件 prop 到表达式。    
	* 在绑定 class 或 style 特性时，支持其它类型的值，如数组或对象。
	* 在绑定 prop 时，prop 必须在子组件中声明。可以用修饰符指定不同的绑定类型。
	* 没有参数时，可以绑定到一个包含键值对的对象。注意此时 class 和 style 绑定不支持数组和对象。
- 示例：  

```html
<!-- 绑定一个属性 -->
<img v-bind:src="imageSrc">

<!-- 缩写 -->
<img :src="imageSrc">
```

#### 6. v-model
- 限制：
	* ```<input>```
	* ```<select>```
	* ```<textarea>```
	* ```components 自定义组件```
- 修饰符：
	* .lazy - 取代 input 监听 change 事件
	* .number - 输入字符串转为有效的数字
	* .trim - 输入首尾空格过滤
- 用法：在表单控件或者组件上创建双向绑定

#### 7. v-pre
- 用法：跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。
- 示例：

```
<span v-pre>{{ this will not be compiled }}</span>
```

#### 8. v-cloak
- 用法： 这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 [v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。通常在简单项目中使用 v-cloak 指令是解决屏幕闪动的好方法，但在大型、工程化的项目中（webpack、vue-router）只有一个空的 div 元素，元素中的内容是通过路由挂载来实现的，这时我们就不需要用到 v-cloak 指令咯。
- 示例：

```
<!-- css -->
[v-cloak] {
  display: none;
}

<!-- dom 直到编译完成后才显示 -->
<div v-cloak>
  {{ message }}
</div>
```

#### 9. v-once
- 用法： 只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。
- 示例：

```
<!-- 单个元素 -->
<span v-once>This will never change: {{msg}}</span>

<!-- 有子元素 -->
<div v-once>
  <h1>comment</h1>
  <p>{{msg}}</p>
</div>

<!-- 组件 -->
<my-component v-once :comment="msg"></my-component>

<!-- `v-for` 指令-->
<ul>
  <li v-for="i in list" v-once>{{i}}</li>
</ul>
```
