### JavaScript 之 Object
#### 语法
##### 对象字面量：

```
let obj = {
	name: 'Lydia',
	age: 21
};
```

##### 构造函数：

```
let obj = new Object();
```

#### 类型
##### 语言类型
- 简单基本类型：string、boolean、number、null、undefined
- 复杂基本类型：object

##### 内置对象
- String、Number、Boolean、Array、Object、Function、RegExp、Date、Error
- 创建方式：通过 new 来进行构造
	
	```
	let strObj = new String('abc');
	let numberObj = new Number(123);
	let booleanObj = new Boolean(false);
	...
	let dateObj = new Date();
	```
	
- 检查类型：
	* typeof
	* instanceof
	* Object.prototype.toString.call()

#### 属性
##### 内置方法
- Object.assign(): 用于将所有可枚举属性的值从一个或多个源对象复制到目标对象（浅拷贝）

	```
	const obj = {
		a: 1,
		b: {
			x: 2
		}
	};
	
	const newObj = Object.assign({}, obj);
	obj.a = 9;
	obj.b.x = 12;
	console.log(newObj); // {a: 1, b: { x: 12 }}
	```

- 
