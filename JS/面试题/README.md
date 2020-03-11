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
console.log(f1 instanceof Foo); // true  (f1._proto_ === Foo.prototype)
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
	* 所有的实例的 ```_proto_``` 都指向该构造函数的原型对象（prototype）。
	* 所有的函数（包括构造函数）是 Function() 的实例，所以所有函数的 _proto_的都指向 Function() 的原型对象。
	* 所有的原型对象（包括 Function 的原型对象）都是 Object 的实例，所以 ```_proto_``` 都指向 Object （构造函数）的原型对象。而 Object 构造函数的 ```_proto_``` 指向 null。
	* Function 构造函数本身就是 Function 的实例，所以 ```_proto_``` 指向 Function 的原型对象。

### new 
### 继承
### 闭包
### 垃圾回收机制
### 深拷贝和浅拷贝
### 异步编程