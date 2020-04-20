### Vue 源码
#### 目录设计（src 目录下）- compiler：编译相关
	* compiler 目录包含 Vue.js 所有编译相关的代码。它包括把模板解析成 ast 语法树，ast 语法树优化，代码生成等功能。	* 编译的工作可以在构建时做（借助 webpack、vue-loader 等辅助插件）；也可以在运行时做，使用包含构建功能的 Vue.js。显然，编译是一项耗性能的工作，所以更推荐前者——离线编译。
- core：核心代码
	* core 目录包含了 Vue.js 的核心代码，包括内置组件、全局 API 封装，Vue 实例化、观察者、虚拟 DOM、工具函数等等。

- platforms：不同平台的支持
	* Vue.js 是一个跨平台的 MVVM 框架，它可以跑在 web 上，也可以配合 weex 跑在 natvie 客户端上。platform 是 Vue.js 的入口，2 个目录代表 2 个主要入口，分别打包成运行在 web 上和 weex 上的 Vue.js。
- server：服务端渲染
	* Vue.js 2.0 支持了服务端渲染，所有服务端渲染相关的逻辑都在这个目录下。注意：这部分代码是跑在服务端的 Node.js，不要和跑在浏览器端的 Vue.js 混为一谈。	* 服务端渲染主要的工作是把组件渲染为服务器端的 HTML 字符串，将它们直接发送到浏览器，最后将静态标记"混合"为客户端上完全交互的应用程序。

- sfc：.vue 文件解析
	* 通常我们开发 Vue.js 都会借助 webpack 构建， 然后通过 .vue 单文件的编写组件。	* 这个目录下的代码逻辑会把 .vue 文件内容解析成一个 JavaScript 的对象。

- shared：共享代码
	* Vue.js 会定义一些工具方法，这里定义的工具方法都是会被浏览器端的 Vue.js 和服务端的 Vue.js 所共享的。#### 源码构建Vue.js 源码是基于 Rollup 构建的，它的构建相关配置都在 scripts 目录下。  
- 构建脚本

	通常一个基于 NPM 托管的项目都会有一个 package.json 文件，它是对项目的描述文件，它的内容实际上是一个标准的 JSON 对象。  
	我们通常会配置 script 字段作为 NPM 的执行脚本，Vue.js 源码构建的脚本如下：	
	```
	{	  "script": {	    "build": "node scripts/build.js",   		 "build:ssr": "npm run build -- web-runtime-cjs,web-server-renderer",	    "build:weex": "npm run build --weex"		}	}
	```
	
	这里总共有 3 条命令，作用都是构建 Vue.js，后面 2 条是在第一条命令的基础上，添加一些环境参数。