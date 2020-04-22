### 手撕代码

#### 手写instanceof的实现原理

```
function instanceOf(left, right) {
	let proto = left.__proto__;
	let prototype = right.prototype;
	while(true) {
		if(proto === null) reutrn false;
		if(proto === prototype) return true;
		proto = proto.__proto__;
	}
}
```

#### 手写 apply call bind
- **三者用法**：
	
	```
	fun.call(thisObj, arg1, arg2, arg3);
	fun.apply(thisObj, [argsArray]);
	var bindFn = fun.bind(thisObj, [, arg1[, arg2[, ...]]]);
	bindFn();
	```
	
- **apply**

	```
	Function.prototype.apply1 = function(content = window) {
		content.fn = this;
		let result;
		if(arguments[1]) {
			result = content.fn(...arguments[1]);
		} else {
			result = content.fn();
		}
		delete content.fn;
		return result;
	}
	```
	
- **call**

	```
	Function.prototype.call1 = function(content = window) {
		content.fn = this;
		let result;
		let args = arguments.slice(1);
		result = content.fn(...args);
		delete content.fn;
		return result;
	}
	```
	
- **bind**

	```
	Function.prototype.bind1 = function(content = window) {
		let _this = this;
		let args = [...arguments].slice(1);
		return function F() {
			if(this instanceof F) {
				return _this.apply(this, args.concat([...arguments]));
			} 
			return _this.apply(content, args.concat([...arguments]));
		}
	}
	```

#### 防抖、节流
- 防抖：当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时。

	```
	function debounce(fn, delay) {
		let timer = null;
		return function(..args) {
			timer && clearTime(timer);
			timer = setTimeout(() => {
				fn.apply(this, args);
			}, delay);
		}
	}
	```
	
- 节流：当持续触发事件时，保证一定时间段内只调用一次事件处理函数。

	```
	function throttle(fn, delay) {
		let flag = true;
		return function(..args) {
			if(!flag) return 
			flag = false;
			setTimeout(() => {
				fn.apply(this, args);
				flag = true;
			}, delay);
		}
	}
	```

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
- Object.defineProperty
 
	```
	let vm = {};
	let obj = {
		name: 'zhangsan',
		age: 18
	};
	for(let key in obj) {
		if(obj.hasOwnProperty(key)) {
			Object.defineProperty(vm, key, function() {
				get: function() {
					return obj[key];
				},
				set: function(value) {
					obj[key] = value;
				}
			})
		}
	}
	```

#### 实现一个 EventListener 类，包含 on，off，emit 方法

```
//实现一个EventListener类，包含on，off，emit方法
class EventListener {
    constructor() {
        this.list = {}
    }

    on(key, fn) {
        if (!this.list[key]) {
            this.list[key] = []
        }
        this.list[key].push(fn)

    }

    emit(key, ...args) {
        for (let fn of this.list[key]) {
            fn.apply(this, args)
        }
    }

    off(key, fn) {
        let fnlist = this.list[key]
        if (!fnlist) return
        if (!fn) {
            fnlist.length = 0
        } else {
            fnlist.forEach((item, index) => {
                if (item === fn) {
                    fnlist.splice(index, 1)
                }
            })
        }

    }
}

let obj1 = new EventListener()


obj1.on('work', value => {
    console.log(`我是${value}啊`)
})

obj1.on('eat', value => {
    console.log(`我在${value}啊`)
})


obj1.emit('work', 'zc')

obj1.off('eat')

obj1.emit('eat', '吃西瓜')
```

#### Promise（A+规范）、then、all 方法

#### 异步加载图片（使用 Promise）

```
function loadImageAsync(imageUrl) {
	return new Promise((resolve, reject) => {
		let img = new Image();
		img.onload = function() {
			resolve(img)
		};
		img.onerror = function() {
			reject(new Error('Could not load image at ' + url));
		};
		img.src = imageUrl;
	})
}
```

#### 实现一个柯里化函数
- 定义：柯里化是指这样一个函数(假设叫做createCurry)，他接收函数A作为参数，运行后能够返回一个新的函数。并且这个新的函数能够处理函数A的剩余参数
- 实现：
	
	```
	// 简单实现，参数只能从右到左传递
	function createCurry(func, args) {
	    var arity = func.length;
	    var args = args || [];
	
	    return function() {
	        var _args = [].slice.call(arguments);
	        [].push.apply(_args, args);
	
	        // 如果参数个数小于最初的func.length，则递归调用，继续收集参数
	        if (_args.length < arity) {
	            return createCurry.call(this, func, _args);
	        }
	
	        // 参数收集完毕，则执行func
	        return func.apply(this, _args);
	    }
	}
	```