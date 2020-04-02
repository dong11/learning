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

- Object.create(): 创建一个新对象，使用现有的对象来提供新创建的对象的```__proto__```。

- Object.freeze(): 可以冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。freeze() 返回和传入的参数相同的对象。

- Object.seal(): 封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要原来是可写的就可以改变。

- Object.keys(): 会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 。

- Object.values(): 返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用for...in循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。

- Object.getOwnPropertyNames(): 回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。

- Object.getOwnPropertySymbols(): 返回一个给定对象自身的所有 Symbol 属性的数组。

- Object.is(): 判断两个值是否是相同的值。
	* 两个值都是 undefined
	* 两个值都是 null
	* 两个值都是 true 或者都是 false
	* 两个值是由相同个数的字符按照相同的顺序组成的字符串
	* 两个值指向同一个对象
	* 两个值都是数字并且
		- 都是正零 +0
		- 都是负零 -0
		- 都是 NaN
		- 都是除零和 NaN 外的其它同一个数字

- Object.defineProperty(): 会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
