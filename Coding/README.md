### 手撕代码

#### Promise（A+规范）、then、all 方法

#### 异步加载图片（使用 Promise）

#### 手写 call apply bind

#### 防抖、节流

#### 自定义 new 过程
	
```
function create(Con, ...args) {
	let obj = {};
	obj.__proto__ = Con.prototype;
	let result = Con.apply(obj, ...args);
	return result instanceof Object ? result : obj;
}
```

#### 实现深拷贝

```
function deepClone(obj, cache = []) {
	if(typeof obj === null || typeof obj !== 'object') {
		return;
	}
	
	const hit = cache.filter(c => c.original === obj)[0];
	if(hit) {
		return hit.copy;
	}
	
	const copy = Array.isArray(obj) ? [] : {};
	
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

#### 双向绑定（手写）

#### 实现一个EventListener类，包含on，off，emit方法
