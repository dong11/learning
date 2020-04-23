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

```
/*
     Promise：构造 Promise 函数对象
     excutor: 执行构造器 （同步执行）
*/
function Promise(excutor) {

    const _that = this
    _that.status = 'pending' // 给 promise对象指定 status属性,初始值为 pending
    _that.data = undefined   //给 promise 对象指定一个用于储存结果数据的属性
    _that.callbacks = [] // 每个元素的结构：{ onFulfilled(){}, onRejected(){}}

    function resolve(value) {

        // 如果当前状态不是 pending，直接结束
        if (_that.status !== 'pending') return


        // 将 状态改为 resolved
        _that.status = 'resolved'

        // 保存 value 数据
        _that.data = value

        // 如果有待执行callback 函数，立刻异步执行回调函数
        if (_that.callbacks.length > 0) {
            setTimeout(() => {
                _that.callbacks.forEach(callbacksObj => {
                    callbacksObj.onFulfilled(value)
                })
            })
        }
    }


    function reject(reason) {

        // 如果当前状态不是 pending，直接结束
        if (_that.status !== 'pending') return

        // 将 状态改为 rejected
        _that.status = 'rejected'

        // 保存 value 数据
        _that.data = reason

        // 如果有待执行callback 函数，立刻异步执行回调函数
        if (_that.callbacks.length > 0) {
            setTimeout(() => {
                _that.callbacks.forEach(callbacksObj => {
                    callbacksObj.onRejected(reason)
                })
            })
        }
    }


    //立刻同步执行 excutor
    try {
        excutor(resolve, reject)
    } catch (error) { //如果执行器抛出异常，promise对象变为 rejected 状态
        reject(error)
    }
}


/*
  Promise原型对象的 then() --- *思路*

    1、指定成功和失败的回调函数
    2、返回一个新的 promise 对象
    3、返回promise的结果由 onFulfilled/onRejected执行结果决定
    4、指定 onFulfilled/onRejected的默认值
 */
Promise.prototype.then = function (onFulfilled, onRejected) {

    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : reason => reason //向后传递成功的value

    //指定默认的失败的回调（实现错误/异常穿透的关键点）
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { //向后传递失败的reason
        throw reason
    }

    const _that = this


    //返回一个新的promise 对象
    return new Promise((resolve, reject) => {

        /*
                    调用指定的回调函数处理，根据执行结果，改变return的promise的状态
                 */
        function handle(callback) {
            /*
                           1. 如果抛出异常，return 的promise就会失败，reason 就是 error
                           2. 如果回调函数返回的不是promise，return的promise就会成功，value就是返回的值
                           3.如果回调函数返回的是promise，return的promise的结果就是这个promise的结果
                        */

            try {
                const result = callback(_that.data)

                // 3.如果回调函数返回的是promise，return的promise的结果就是这个promise的结果
                if (result instanceof Promise) {
                    // result.then(
                    //     value => resolve(value), //当result成功时，让return的promise也成功
                    //     reason => reject(reason)  //当result失败时，让return的promise也失败
                    // )

                    result.then(resolve, reject)

                } else {
                    //  2. 如果回调函数返回的不是promise，return的promise就会成功，value就是返回的值
                    resolve(result)
                }
            } catch (error) {
                //1. 如果抛出异常，return 的promise就会失败，reason 就是 error

                reject(error)
            }
        }


        if (_that.status === 'pending') {
            //假设当前状态还是 pending 状态，将回调函数 保存起来
            _that.callbacks.push({
                onFulfilled(value) {
                    handle(onFulfilled) //改promise的状态为 onFulfilled状态
                },
                onRejected(reason) {
                    handle(onRejected)  //改promise的状态为 onRejected状态
                }
            })
        } else if (_that.status === 'resolved') { //如果当前是resolved状态，异步执行onresolved并改变return的promise状态
            setTimeout(() => {
                handle(onFulfilled)
            })
        } else { //onRejected
            setTimeout(() => { //如果当前是rejected状态，异步执行onRejected并改变return的promise状态
                handle(onRejected)
            })
        }

    })

}


/*
    Promise原型对象的 catch()
    指定失败的回调函数
    返回一个新的 promise 对象
 */
Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected)
}

Promise.prototype.finally = function (callback) {
    return this.then(value => {
        Promise.resolve(callback(value))
    }, reason => {
        Promise.resolve(callback(reason))
    })
}

/*
    Promise函数对象的 resolve()
    返回 指定结果的 "成功" 的 promise 对象
 */
Promise.resolve = function (value) {
    //返回 一个 成功/失败 的promise
    return new Promise((resolve, reject) => {
        if (value instanceof Promise) { //使用value的结果作为 promise 的结果
            value.then(resolve, reject)
        } else { //value不是promise => promise变为成功，数据是 value
            resolve(value)
        }
    })

}

/*
    Promise函数对象的 reject()
    返回 指定结果的 "失败" 的 promise 对象
 */
Promise.reject = function (reason) {

    //返回 一个失败的 promise
    return new Promise((resolve, reject) => {
        reject(reason)
    })
}


/*
    Promise函数对象的 all()
    返回 一个promise，只有当所有promise都成功时才成功，否则只要有一个失败就 失败
 */
Promise.all = function (promises) {

    const values = Array.apply(null, {length: promises.length})//用来保存所有成功 value的数组
    let resolvedCount = 0

    return new Promise((resolve, reject) => {

        //遍历获取每一个 promise的结果
        promises.forEach((p, index) => {
            Promise.resolve(p).then(
                //p成功，将成功的 value 保存 values
                // values.push(value)  => 不能这样
                value => {

                    resolvedCount++ //成功的次数

                    values[index] = value

                    //如果全部成功了，将return的 promise 改为成功
                    if (resolvedCount === promises.length) {
                        resolve(values)
                    }

                },
                reason => { //只要一个失败了，return 的promise就失败
                    reject(reason)
                }
            )
        })
    })
}


/*
	Promise函数对象的 race()
	返回 一个promise，其结果由第一个完成的promise来决定
*/
Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        //遍历获取每一个 promise的结果
        promises.forEach((p, index) => {
            Promise.resolve(p).then(
                value => { // 一旦由成功了，将return 变为失败
                    resolve(value)
                },

                reason => { //只要一个失败了，return 的promise就失败
                    reject(reason)
                }
            )
        })
    })
}
```

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