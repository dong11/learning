### JavaScript 之 Array

- 创建数组
	
	```
	let arr1 = new Array();
	let arr2 = new Array(10); // 指定数组初始长度
	let arr3 = ["zhangsan", "lisi"];
	let arr4 = new Array("zhangsan", "lisi");
	```
	
- 数组元素的添加
	* push：
	* unshift：
	* splice：

- 数组元素的删除
	* pop：
	* shift：
	* splice：

- 数组的截取和合并
	* concat：
	* slice：

- 数组元素的排序
	* reverse：
	* sort：

- 数组元素的字符串化
	* join：

- filter：创建一个新数组, 其包含通过所提供函数实现的测试的所有元素

- map：创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

- reduce：对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。

- flat：会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

- some：测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。

- every：测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。
