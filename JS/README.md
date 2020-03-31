## JS 基础知识点
### 数据类型
#### 类型
- 原始类型
	* String 
	* Number
	* Boolean
	* null
	* undefined
	* Symbol

- 引用类型(Object 类型)
	* Object（Array、Date、RegExp、Function、Set、Map）

#### 类型的判断：typeof、instanceof、Object.prototype.toString.call()
- typeof:
- instanceof: 通过判断该对象的原型链中是否可以找到该构造类型的 prototype 类型

```
function Foo(){}
var f1 = new Foo();
console.log(f1 instanceof Foo); // true  (f1.__proto__ === Foo.prototype)
```

- Object.prototype.toString.call():

#### 数据类型的存储形式
- 栈(Stack)和堆(Heap)。
- 栈(Stack)在内存中自动分配内存空间；堆(Heap)在内存中动态分配内存空间，不一定会自动释放内存
- 一般我们在项目中将对象类型手动置为 null 原因，减少无用内存消耗。
- 原始类型是按值形式存放在栈中的数据段，内存空间可以自由分配，同时可以按值直接访问。
- 引用类型是存放在堆内存中，每个对象在堆内存中有一个引用地址，就像是每个房间都有一个房间号一样。引用类型在栈中保存的就是这个对象在堆内存的引用地址，我们所说的“房间号”。通过“房间号”可以快速查找到保存在堆内存的对象。


### this
- 对象调用，this 指向该对象（前边谁调用 this 就指向谁）。
- 直接调用的函数，this指向的是全局 window对象。
- 通过 new 的方式，this永远指向新创建的对象。
- 箭头函数中的 this。

### call、apply、bind 的区别
- 共同点:
	* 三者都能改变 this 的指向，且第一个参数传递的就是 this 指向的对象
- 不同点:
	* call 的传参是单个传递的（试了下数组，也是可以的），而 apply 后续传递的参数是数组形式（传单个值会报错），而 bind 没有规定，传递值和数组都可以。
	* call 和 apply 函数的执行是直接执行的，而 bind 函数会返回一个函数，然后我们想要调用的时候才会执行。
- 手写 call，apply，bind

```
待完善
```
	
### JS 声明提升
- 变量声明和函数声明都会提升，但函数会提升到变量前。

### 原型和原型链
- 基本概念：
	* ```prototype```：每个函数都有一个 prototype 属性，prototype 指向一个对象，可以理解为调用构造函数而创建的那个对象实例的原型对象。
	* ```原型对象```：每个JavaScript实例对象的创建都会关联到另一个对象，这个对象就是我们说的原型对象，继承的实现是依赖于原型对象的。
	* ```__proto__```：每个实例对象都有一个__proto__属性，这个属性执行该对象的原型对象，原型对象同样也有这个属性，执行它的原型对象。
	* ```constructor```：原型对象有一个constructor属性，执行它关联的构造函数。
	* ```原型链```：每个对象都有个 ```__proto__``` 连接着构造函数的原型对象，我们使用方法的时候就会沿着 ```__proto__``` 去寻找。原型链就是多个对象通过 ```__proto__``` 的方式连接了起来。

- 总结：
	* 所有的实例的 ```__proto__``` 都指向该构造函数的原型对象（prototype）。
	* 所有的函数（包括构造函数）是 Function() 的实例，所以所有函数的 ```__proto__``` 的都指向 Function() 的原型对象。
	* 所有的原型对象（包括 Function 的原型对象）都是 Object 的实例，所以 ```__proto__``` 都指向 Object （构造函数）的原型对象。而 Object 构造函数的 ```__proto__``` 指向 null。
	* Function 构造函数本身就是 Function 的实例，所以 ```__proto__``` 指向 Function 的原型对象。

### new 
- 定义：创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例
- new 过程的四个阶段：
	* 创建一个空的简单 JavaScript 对象（即{}）；
	* 这个新对象的 ```__proto__``` 属性指向原函数的 prototype 属性。(即继承原函数的原型)
	* 将新创建的对象作为 this 的上下文；
	* 返回新对象，如果这个函数没有返回其他对象。
	
	```
	function create(Con, ...args) {
		// 创建空对象
		let obj = {};
		// 设置空对象的原型
		obj.__proto__ = Con.prototype;
		// 绑定 this 并执行构造函数
		let result = Con.apply(obj, args);
		// 如果 result 没有其他选择的对象，就返回 obj 对象
		return result instanceof Object ? result : obj;
	}
	
	function Test(name, age) {
		this.name = name;
		this.age = age;
	}
	
	Test.prototype.sayName = function() {
		console.log(this.name);
	}
	
	const a = create(Test, 'Lydia', 21);
	console.log(a.age); // 21
	const name = a.sayName();
	console.log(name); // 'Lydia'
	```

- 创建对象的方式
	* new 构造函数
	* 字面量 {}
	* Object.create()

- 字面量创建对象的优势所在
	* 代码量少，更易读
	* 对象字面量运行速度更快，它们可以在解析的时候被优化。他不会像 new 一个对象一样，解析器需要顺着作用域链从当前作用域开始查找，如果在当前作用域找到了名为 Object() 的函数就执行，如果没找到，就继续顺着作用域链往上照，直到找到全局 Object() 构造函数为止。
	
- new/字面量 与 Object.create(null) 创建对象的区别？
	* new 和 字面量创建的对象的原型指向 Object.prototype，会继承 Object 的属性和方法。
	* 通过 Object.create(null) 创建的对象，其原型指向 null，null 作为原型链的顶端，没有也不会继承任何属性和方法。

### 继承
- 继承方式：
	* 经典继承（构造函数）
		
		1. **基本思想**：在子类的构造函数的内部调用父类的构造函数。
		2. **优点**：
			* 保证了原型链中引用类型的独立，不被所有实例共享。
			* 子类创建的时候可以向父类进行传参。
		3. **缺点**：
			* 继承的方法都在构造函数中定义，构造函数不能够复用了（因为构造函数中存在子类的特殊属性，所以构造函数中复用的属性不能复用了）。
			* 父类中定义的方法对于子类型而言是不可见的（子类所有的属性都定义在父类的构造函数当中）。

	* 组合继承
		1. **基本思想**：
			* 使用原型链实现对「原型对象属性和方法」的继承。
			* 通过借用构造函数来实现对「实例属性」的继承。
		2. **优点**：
			* 在原型对象上定义的方法实现了函数的复用。
			* 每个实例都有属于自己的属性。
		3. **缺点**：
			* 组合继承调用了两次父类的构造函数，造成了不必要的消耗。
			
	* 原型继承(Object.create)
	* 寄生式继承

### 闭包
- 作用域：规定变量和函数的可使用范围叫做作用域。
- 作用域链：每个函数都会有一个作用域，查找变量或函数时，由局部作用域到全局作用域依次查找，这些作用域的集合就称作为作用域链。
- 闭包：函数执行会形成一个私有的作用域，保护里面的变量不受外界干扰，除了保护私有变量外，还可以存储一些内容，这种模式叫做闭包。

```
function Fn() {
	var b = 2;
	return function (){
		console.log(b++);
	}
}
var a = new Fn();
a(); // 2
a(); // 3
```

### 垃圾回收机制
### 深拷贝和浅拷贝
- 浅拷贝实现方式：只进行一层关系的拷贝。
	* 扩展运算符实现：
	
	```
	let a = {c: 1, x: {y: 1}}
	let b = {...a}
	a.c = 2
	console.log(b.c) // 1
	a.x.y = 2;
	console.log(b.x.y) // 2
	```
	
	* Object.assign()实现
	
	```
	let a = {c: 1, x: {y: 1}};
	let b = Object.assign({}, a);
	a.c = 2
	console.log(b.c) // 1
	a.x.y = 2;
	console.log(b.x.y) // 2
	```
	
	* 自己实现一个浅拷贝：
	
	```
	function shallowClone(o) {
	const obj = {};
	for(let i in o) {
		obj[i] = o[i];
	}
	return obj;
	}
	```
	
- 深拷贝实现方式：进行无限层次的拷贝。
	* JSON.parse(JSON.stringify(object))
	
	```
	// obj 中存在函数时
	function stringifyRep(key, value) {
	  if (typeof value === "function") {
	    return `${value}`;
	  }
	  return value;
	}
	function parseRep(key, value) {
	  return eval(value);
	}
	var a = {
	  b: () => 1 + 1
	}
	var aa = JSON.parse(JSON.stringify(a, stringifyRep), parseRep)
	```

	* 自己实现一个深拷贝：
	
	```
	function deepClone(obj, cache = []) {
		// typeof [] === 'object'
		// typeof {} === 'object'
		if(obj === null || typeof obj !== 'object') {
			return obj;
		}
		
		// 解决循环引用的问题 如：var a = {b: 1}; a.c = a;
		const hit = cache.filter(c => c.original === obj)[0];
		if(hit) {
			return hit.copy;
		}
		
		const copy = Array.isArray(obj) ? [] : {};
		
		// 将copy首先放入cache, 因为我们需要在递归deepCopy的时候引用它
		cache.push({
			original: obj,
			copy
		});
		
		Object.keys(obj).forEach(key => {
			copy[key] = deepClone(obj[key], cache);	
		});
		
		return copy;
	}
	```
	
### 异步编程
- 异步编程方法：
	* Promise
	* Generator
	* async/await

- 运行机制
	1. 一开始执行宏任务（script 中同步代码），执行完毕，调用栈为空。
	2. 然后检查微任务队列是否有可执行任务，执行完所有微任务。
	3. 进行页面渲染。
	4. 第二轮从宏任务队列取出一个宏任务执行，重复以上循环。


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