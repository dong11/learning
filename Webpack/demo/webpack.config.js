const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	mode: 'development',
	output: {
		filename: 'main.[hash].js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				// use: ['style-loader', 'css-loader']
				use: [
					// 'style-loader', 
					MiniCssExtractPlugin.loader, // 单独打包 css 文件
					{
						loader: 'css-loader',
						options: {sourceMap: true} // 开启 sourceMap, 调试时方便定位
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							sourceMap: true,
							plugins: loader => [
								require('autoprefixer')(),
								// 这里可以使用更多配置，如 postcss-cssnext 等
								// require('postcss-cssnext')()
							]
						}
					}
      			]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
		    filename: '[name].[hash].css', // 最终输出的文件名, 带上 hash 值
		    chunkFilename: '[id].[hash].css'
		}),
		new OptimizeCssAssetsPlugin({}),
		new UglifyJsPlugin({
	      cache: true, 		// 当 JS 没有发生变化则不压缩；
	      parallel: true, 	// 是否启用并行压缩；
	      sourceMap: true	// 是否启用 sourceMap；
	    }),
	    // 动态生成 html 文件
	    new HtmlWebpackPlugin({
		    title: "webpack demo",   // 生成的文件标题
		    filename: "index.html", // 最终生成的文件名
		    minify: { // 压缩选项
		      collapseWhitespace: true, // 移除空格
		      removeComments: true, // 移除注释
		      removeAttributeQuotes: true, // 移除双引号
		    }
		}),
		// 每次修改文件后都会生成新的 hash 文件, 所以打包前都清空 dist
		new CleanWebpackPlugin()
	]
};