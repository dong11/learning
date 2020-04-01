### JavaScript 之 Array

- 创建数组
	
	```
	let arr1 = new Array();
	let arr2 = new Array(10); // 指定数组初始长度
	let arr3 = ["zhangsan", "lisi"];
	let arr4 = new Array("zhangsan", "lisi");
	```
	
- 数组元素的添加
	* push：将一个或多个元素添加到数组的末尾，并返回该数组的新长度
	
		```
		let arr = ['zhangsan'];
		arr.push('lisi');
		console.log(arr.push('wangwu', 'Lydia')); // 返回长度为 4
		console.log(arr); // 打印数组和长度
		// ["zhangsan", "lisi", "wangwu", "Lydia"]
		```
	
	* unshift：将一个或多个元素添加到数组的开头，并返回该数组的新长度(该方法修改原有数组);
		
		```
		let arr = ['zhangsan'];
		arr.unshift('lisi');
		let len = arr.unshift('wangwu', 'Lydia');
		console.log(len); // 4   数组长度为： 4
		console.log(arr); // ['wangwu', 'Lydia', 'lisi', 'zhangsan']
		```
		
	* splice：通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。
		- 语法：array.splice(start[, deleteCount[, item1[, item2[, ...]]]])；当 deleteCount === 0 时，为插入数据
		- 示例：

		```
		let arr = ['zhangsan', 'lisi'];
		// 在下标为 1 的位置，插入数据
		arr.splice(1, 0, 'Lydia', 'wangwu');
		console.log(arr);
		// ['zhangsan', 'Lydia', 'wangwu', 'lisi']
		```
	

- 数组元素的删除
	* pop：从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。
		
		```
		let arr = ['zhangsan', 'lisi', 'wangwu', 'Lydia'];
		let name = arr.pop();
		console.log(name, arr.length); // 'Lydia' 3
		console.log(arr); // ['zhangsan', 'lisi', 'Lydia']
		```
		
	* shift：从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。
		
		```
		let arr = ['zhangsan', 'lisi', 'wangwu', 'Lydia'];
		let name = arr.shift();
		console.log(name, arr.length); // 'zhangsan' 3
		console.log(arr); // ['lisi', 'wangwu', 'Lydia']
		```
		
	* splice：

		```
		let arr = ['zhangsan', 'lisi', 'wangwu', 'Lydia'];
		// 从下标为 1 开始，删除 2 个元素, 打印被删除的元素数组
		console.log(arr.splice(1, 2)); // ['lisi', 'wangwu']
		console.log(arr);	// ['zhangsan', 'Lydia'];
		```

- 数组的截取和合并
	* concat：用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

		```
		let arr1 = ['zhangsan', 'lisi'];
		let arr2 = ['wangwu', 'Lydia'];
		let newArr = arr1.concat(arr2);
		console.log(newArr); // ['zhangsan', 'lisi', 'wangwu', 'Lydia']
		console.log(arr1); // ['zhangsan', 'lisi'] 原数组不变
		```
		
	* slice：返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。

		```
		let arr = ['zhangsan', 'lisi', 'wangwu', 'Lydia'];
		// 截取从下标为 1 到 3 的子数组（并不包含 3）
		let newArr = arr.slice(1, 3);
		console.log(newArr); // ['lisi', 'wangwu'];
		// 并不影响原数组
		console.log(arr); // ['zhangsan', 'lisi', 'wangwu', 'Lydia']
		```

- 数组元素的排序
	* reverse：将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组。

		```
		let arr = ['zhangsan', 'lisi', 'wangwu', 'Lydia'];
		arr.reverse();
		console.log(arr); // ["Lydia", "wangwu", "lisi", "zhangsan"]
		```
		
	* sort：用原地算法对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的
		- 语法：arr.sort([compareFunction]) 参数可选
			1. 如果 compareFunction(a, b) 小于 0，那么 a 会被排列到 b 之前；
			2. 如果 compareFunction(a, b) 等于 0，a 和 b 的相对位置不变。
			3. 如果 compareFunction(a, b) 大于 0，b 会被排列到 a 之前。
			4. compareFunction(a, b) 必须总是对相同的输入返回相同的比较结果，否则排序的结果将是不确定的。
		- 示例：

		```
		let arr1 = [1,3,2,6,5,9,7];
		let arr2 = ['zhangsan', 'lisi', 'wangwu', 'Lydia'];
		// 默认排序
		arr1.sort();
		arr2.sort();
		console.log(arr1); // [1, 2, 3, 5, 6, 7, 9]
		console.log(arr2); // ["Lydia", "lisi", "wangwu", "zhangsan"]
		
		// 自定义排序
		// 从大到小排序
		arr1.sort(function(a1, a2) {
			if(a2 > a1) {
				return 1;
			} else if(a2 === a1) {
				return 0;
			} else {
				return -1;
			}
			// 可以简写成
			// return a2 - a1;
		});
		console.log(arr1); // [9, 7, 6, 5, 3, 2, 1]
		
		
		let persons = [
			{ name: 'zhangsan', age: 18 },
			{ name: 'lisi', age: 22 },
			{ name: 'Lydia', age: 19 },
			{ name: 'wangwu', age: 20 },
		];
		// 根据年龄从大到小排序
		persons.sort(function(p1, p2) {
			return p2.age - p1.age;
		});
		console.log(persons);
		// [
		//   { name: 'lisi', age: 22 },			//   { name: 'wangwu', age: 20 },
		//   { name: 'Lydia', age: 19 },
		//   { name: 'zhangsan', age: 18 },
		// ];
		
		```

- 数组元素的字符串化
	* join：将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符。

	```
	let arr = ['zhangsan', 'lisi', 'wangwu', 'Lydia'];
	// 所有元素连接成一个字符串，使用 ',' 隔开
	let str = arr.join(',');
	console.log(str); // zhangsan,lisi,wangwu,Lydia
	// 原数组不影响
	console.log(arr); // ['zhangsan', 'lisi', 'wangwu', 'Lydia']
	```

- filter：创建一个新数组, 其包含通过所提供函数实现的测试的所有元素

	```
	let arr = [1, 3, 2, 6, 5, 9, 7];
	// 筛选大于 5 的元素
	let newArr = arr.filter(function(item, index) {
		if(item > 5) {
			return true; // 需要保留的元素
		}
		return false; // 需要过滤的元素
	});
	console.log(newArr); // [6, 9, 7]
	// 原数组不影响
	console.log(arr); // [1, 3, 2, 6, 5, 9, 7]
	```

- map：创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

	```
	let persons = [
		{ name: 'zhangsan', age: 18 },
		{ name: 'lisi', age: 22 },
		{ name: 'Lydia', age: 19 },
		{ name: 'wangwu', age: 20 },
	];
	// 给每个元素对象增加一个属性 gender, 属性值 0/1 随机
	let newArr = persons.map(function(item, index) {
		item.gender = Math.round(Math.random());
		return item;
	});
	console.log(newArr);
	// [
	//   { name: 'lisi', age: 22, gender: 1 },	//   { name: 'wangwu', age: 20, gender: 1 },
	//   { name: 'Lydia', age: 19, gender: 0 },
	//   { name: 'zhangsan', age: 18, gender: 1 },
	// ];
	```

- reduce：对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。

	```
	let arr = [1, 3, 2, 6, 5, 9, 7];
	// 计算所有元素之和
	let count = arr.reduce(function(accumulator, currentValue) {
		// accumulator: 累计器累计回调的返回值
		// currentValue: 当前元素
		return accumulator + currentValue;
	});
	console.log(count); // 33
	```

- flat：会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

	```
	let arr = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
	let newArr = arr.flat(Infinity);
	console.log(newArr); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	```

- some：测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。

	```
	let arr = [1, 2, 3, 4, 5];
	// 测试数组是否含有能被 2 整除的元素
	let has2 = arr.some(function(a) {
		return a % 2 === 0;
	});
	console.log(has2); // true
	```

- every：测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。
	
	```
	let arr = [1, 2, 3, 4, 5];
	// 测试数组是否所有元素都能被 2 整除
	let has2 = arr.every(function(a) {
		return a % 2 === 0;
	});
	console.log(has2); // false
	```