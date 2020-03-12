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
			
	* 原型继承
	* 寄生式继承

### 闭包
### 垃圾回收机制
### 深拷贝和浅拷贝
### 异步编程