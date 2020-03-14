## ES6 基础知识点
### var、let、const 的区别
- var 存在变量提升，let、const 则不会
- var 的全局声明的变量会挂载到 window 上，其他两者则不会。(let、const 有块级作用域)
- let、const 的作用基本一致，但 const 声明的变量不能再赋值。

### map、filter、reduce 的区别
- map：作用是 map 中传入一个函数，该函数会遍历该数组，对每一个元素做变换之后返回新数组。
- filter：作用是也是生成一个数组，传入的函数返回值确实布尔类型，返回值为 true 的元素放入新数组，通常来筛选删除不需要的元素。
- reduce：将数组中的元素通过回调函数最终转换为一个值。

### Proxy
#### 通过 getter 与 setter 访问属性值有什么好处？
- 避免意外的错误发生。
- 需要记录属性的变化：比如属性值的访问日志记录。
- 数据绑定：在 vue 中使用的数据的双向绑定。

#### 有哪几种方式来定义 getter 和 setter 呢？
- 字面量定义

```
const collection = {
	name: 'Lydia',
	
	get name() {
		console.log('调用了 getter');
	},
	
	set name(value) {
		console.log('调用了 setter: ' + value);
	}
}

collection.name; // 调用了 getter
collection.name = '张三'; // 调用了 setter
```

- ES6 中的 Class 定义

```
class Collection {
	constructor() {
		this.name = 'Lydia';
	}
	
	get firstName() {
		console.log('调用了 getter');
		return this.name;
	}
	
	set firstName(value) {
		console.log('调用了 setter: ' + value);
		this.name = value;
	}
}

const c = new Collection();
c.firstName = '张三';  // 调用了 setter: 张三
console.log(c.firstName);  // 调用了 getter  张三
```

- Object.defineProperty()

```
function collection() {
	let name = 'Lydia';
	
	Object.defineProperty(this, 'name', {
		get: () => {
			console.log('调用了 getter')
		},
		set: (value) => {
			console.log('调用了 setter: ' + value);		}
	});
}
const c = new collection();
c.name = '张三';	// 调用了 setter: 张三
c.name;	// 调用了 getter
```

- Proxy 代理: 代理（proxy）使我们通过代理控制对另一个对象的访问。proxy 和 getter 以及 setter 的区别是，getter和 setter 仅仅控制的是单个对象属性，而 proxy 代理的是对象交互的通用处理，包括对象的方法。

```
```

#### Proxy 的基本应用
- 日志记录 —— 当访问属性时，可以在 get 和 `set 中记录访问日志。
- 校验值 —— 有效的避免指定属性类型错误的发生。
- 定义如何计算属性值 —— 每次访问属性值，都会进行计算属性值。
- 数据的双向绑定（Vue）—— 在 Vue3.0 中将会通过 Proxy 来替换原本的 Object.defineProperty 来实现数据响应式。

### ES6/7 异步编程
#### Generator 生成器
#### Promise
#### async/await