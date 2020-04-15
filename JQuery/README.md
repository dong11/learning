### JQuery 相关知识
####  jQuery 库中的 ```$()``` 是什么？
- ```$()``` 函数用于将任何对象包裹成 jQuery 对象，接着你就被允许调用定义在 jQuery 对象上的多个不同方法。你甚至可以将一个选择器字符串传入 ```$()``` 函数，它会返回一个包含所有匹配的 DOM 元素数组的 jQuery 对象。

#### ```$(document).ready()``` 是个什么函数？为什么要用它？
-  ready() 函数用于在文档进入ready状态时执行代码。当DOM 完全加载（例如HTML被完全解析DOM树构建完成时），jQuery允许你执行代码。使用 ```$(document).ready()``` 的最大好处在于它适用于所有浏览器，jQuery帮你解决了跨浏览器的难题。


####  JavaScript window.onload 事件和 jQuery ready 函数有何不同？
- 可以在页面中使用多个document.ready()函数，但只能用一次window.onload
- document.ready()函数在页面DOM元素加载完就会执行，而window.onload()函数则是要所有都加载

#### 网页上有 5 个 <div> 元素，如何使用 jQuery来选择它们

```
	$('div'); // 根据标签名获取
	$('.div'); // 根据类名获取
	$('#div1'); // 根据 id 获取
```