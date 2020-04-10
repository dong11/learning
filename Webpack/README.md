### Webpack 知识点

#### ATS(Abstract Syntax Tree) 抽象语法树
- 定义：是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。

#### 原理
1. 通过入口，将文件通过 babel/parser 解析成 AST，在通过

#### 作用
- 代码转换
- 文件优化
- 代码分割
- 模块合并
- 自动刷新
- 自动发布

#### Plugins
- **HtmlWebpackPlugin**
	
	```
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html', // 模板路径
			filename: 'index.html', // 输出文件名
			minify: {
				removeAttributeQuotes: true, // 去掉引号
				collapseWhitespace: true, // 一行输出
				removeComments: true, // 移除注释
			},
			hash: true, // 带 hash 值
		})
	]
	```
	
- **MiniCssExtractPlugin**

	```
	plugins: [
		new MiniCssExtractPlugin({
			
		})
	]
	```
	
#### loader
- **css-loader**
- **style-loader**