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
- instanceof:
- Object.prototype.toString.call():

#### 存储形式
- 栈(Stack)和堆(Heap)。
- 栈(Stack)在内存中自动分配内存空间；堆(Heap)在内存中动态分配内存空间，不一定会自动释放内存
- 一般我们在项目中将对象类型手动置为 null 原因，减少无用内存消耗。
- 原始类型是按值形式存放在栈中的数据段，内存空间可以自由分配，同时可以按值直接访问。
- 引用类型是存放在堆内存中，每个对象在堆内存中有一个引用地址，就像是每个房间都有一个房间号一样。引用类型在栈中保存的就是这个对象在堆内存的引用地址，我们所说的“房间号”。通过“房间号”可以快速查找到保存在堆内存的对象。


### this
- 对象调用，this 指向该对象（前边谁调用 this 就指向谁）。
- 直接调用的函数，this指向的是全局 window对象。
- 通过 new的方式，this永远指向新创建的对象。
- 箭头函数中的 this。

### call、apply、bind 的区别
- 共同点
	* 三者都能改变 this 的指向，且第一个参数传递的就是 this 指向的对象
- 不同点
	* 
	
### JS 声明提升
- 变量声明和函数声明都会提升，但函数会提升到变量前。

### 原型和原型链
### new 
### 继承
### 闭包
### 垃圾回收机制
### 深拷贝和浅拷贝
### 异步编程