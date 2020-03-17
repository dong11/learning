### 项目性能优化
#### 代码层面的优化
- 图片资源懒加载
- 选择合适的图片格式和尺寸
- 减少 HTTP 请求数量
	* 小图片转base64，减少请求
	* 按优先级进行分批请求
	* 浏览器缓存，减少请求次数或响应数据
- 减少Dom操作和避免回流，渲染优化
- 事件节流，减少操作

#### Webpack 层面的优化
- 静态资源的压缩合并（JS 代码压缩合并、CSS 代码压缩合并、雪碧图）

#### 基础的 Web 技术优化
- 使用 CDN 让资源加载更快
- 浏览器缓存(localStorage、sessionStorage、cookie)