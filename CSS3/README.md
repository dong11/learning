### CSS 基础
#### CSS盒模型，在不同浏览器的差异
- **css 标准盒子模型：**  
	css 盒子模型又称为框模型（Box Model），包含元素内容（content），内边距（padding），边框（border），外边距（margin）几个要素。  
	
	元素框的总宽度 = width + padding-left + padding-right + border-left + border-right + margin-left + margin-right;
	
	元素框的总高度 = height + padding-top + padding-bottom + border-top + border-bottom + margin-top + margin-bottom;
	
- **IE 盒子模型：**  
	元素内容宽度 = width + padding-left + padding-right + border-left + border-right;
	元素框的总宽度 = 元素内容宽度 + margin-left + margin-right;
	
	元素内容高度 = height + padding-top + padding-bottom + border-top + border-bottom;
	元素框的总高度 = 元素内容高度 + margin-top + margin-bottom;
	
#### CSS所有选择器及其优先级、使用场景
- **css选择器种类有：**  
	* **通用选择器**： *
	* **id 选择器**：#header{}
	* **class 选择器**：.header{}
	* **元素选择器**：div{}
	* **子选择器**：ul > li{}
	* **后代选择器**：div p{}
	* **伪类选择器**：  
		:hover、::selection、.action、:first-child、:last-child、:first-of-type、:last-of-type、:nth-of-type(n)、:nth-of-last-type(n)等,例如a:hover{}
	* **伪元素选择器**：:after、:before等,例如：li:after
	* **属性选择器**：input[type="text"]
	* **组合选择器**：  
		E,F/E F（后代选择器）/E>F（子元素选择器）/E+F（直接相邻元素选择器----匹配之后的相邻同级元素）/E~F（普通相邻元素选择器----匹配之后的同级元素）
	* **层级选择器**：p~ul 选择前面有p元素的每个ul元素

- **css 选择器优先级**：
	* **选择器优先级由高到低分别为**：  
		!important > 作为 style 属性写在元素标签上的内联样式 > id 选择器 > 类选择器 > 伪类选择器 > 属性选择器 > 标签选择器 > 通配符选择器（* 应少用）> 浏览器自定义；
	* **当比较多个相同级别的CSS选择器优先级时，它们定义的位置将决定一切。下面从位置上将CSS优先级由高到低分为六级**：
		1. 位于 ```<head/>``` 标签里的 ```<style/>``` 中所定义的 CSS 拥有最高级的优先权。
		2. 第二级的优先属性由位于 ```<style/>``` 标签中的 ```@import``` 引入样式表所定义。
		3. 第三级的优先属性由 ```<link/>``` 标签所引入的样式表定义。
		4. 第四级的优先属性由 ```<link/>``` 标签所引入的样式表内的 ```@import``` 导入样式表定义。
		5. 第五级优先的样式有用户设定。
		6. 最低级的优先权由浏览器默认。

- **使用场景：**
	* class使用场景：需要某些特定样式的标签则放在同一个 class 中，需要此样式的标签可再添加此类。（class 不可被 javascript 中的 getElementById 函数所调用）
	* id使用场景：
		1. 根据提供的唯一id号快速获取标签对象，如：document.getElementById(id)；
		2. 用于充当 label 标签 for 属性的值：示例：```<label for='userid'> 用户名：</label>```，表示单击此 label 标签时，id 为 userid 的标签获得焦点；

#### CSS 哪些属性可以继承
css 继承特性主要是指文本方面的继承(比如字体、颜色、字体大小等)，盒模型相关的属性基本没有继承特性。

- **不可继承的：**  
	display、margin、border、padding、background、height、min-height、max-height、width、min-width、max-width、overflow、position、top、bottom、left、right、z-index、float、clear、 table-layout、vertical-align、page-break-after、page-bread-before和unicode-bidi。 

- **所有元素可继承的：**  
	visibility 和 cursor
	
- **终极块级元素可继承的：**
	text-indent 和 text-align 
	
- **内联元素可继承的：**
	letter-spacing、word-spacing、white-space、line-height、color、font、font-family、font-size、font-style、font-variant、font-weight、text-decoration、text-transform、direction 
	
- **列表元素可继承的：**
	list-style、list-style-type、list-style-position、list-style-image
	
#### 常用at规则及使用示例
- @charset
- @import
- @namespace
- @document
- @font-face
- @keyframes
- @media
- @page
- @supports

```
/*定义字符集*/
@charset "utf-8"    
/*导入css文件*/ 
@import "base.css"
/*自定义字体*/
@font-face {}
/*声明CSS3 animation动画关键帧*/
@keyframes fadeIn {}
/*媒体查询*/
@media{}
```

#### link 和 @import 的区别
- link 属于 XHTML 标签，而 @import 是 CSS 提供的。
- ⻚面被加载时，link 会同时被加载，而 @import 引用的 CSS 会等到⻚面被加载完再加载。
- import 只在 IE5 以上才能识别，而 link 是 XHTML 标签，无兼容问题。
- link 方式的样式权重高于 @import 的权重。
- 使用 dom 控制样式时的差别。当使用 javascript 控制 dom 去改变样式的时候，只能使用 link 标签，因为 @import 不是 dom 可以控制的。

#### 有哪些方式(CSS)可以隐藏⻚面元素
- ```opacity: 0```： 本质上是将元素的透明度将为0，就看起来隐藏了，但是依然占据空间且可以交互
- ```visibility: hidden```： 与上一个方法类似的效果，占据空间，但是不可以交互了
- ```display: none```：这个是彻底隐藏了元素，元素从文档流中消失，既不占据空间也不交互，也不影响布局
- ```overflow: hidden```：这个只隐藏元素溢出的部分，但是占据空间且不可交互
- ```z-index: -999```：原理是将层级放到底部，这样就被覆盖了，看起来隐藏了
- ```transform: scale(0,0)```：平面变换，将元素缩放为0，但是依然占据空间，但不可交互

#### em\px\rem区别
- px：绝对单位，⻚面按精确像素展示。
- em：相对单位，基准点为父节点字体的大小，如果自身定义了font-size按自身来计算(浏览器默认字体是 16px)，整个⻚面内1em不是一个固定的值。
- rem：相对单位，可理解为”root em”, 相对根节点html的字体大小来计算，CSS3新加属性，chrome/firefox/IE9+支 持 

#### 块级元素水平居中的方法

#### CSS有几种定位方式（position 的值）
- static：正常文档流定位，此时 top, right, bottom, left 和 z-index 属性无效，块级元素从上往下纵向排布，行级元素从左向右排列。
- relative：相对定位，此时的『相对』是相对于正常文档流的位置。
- absolute：相对于最近的非 static 定位祖先元素的偏移，来确定元素位置，比如一个绝对定位元素它的父级、和祖 父级元素都为relative，它会相对他的父级而产生偏移。
- fixed：指定元素相对于屏幕视口(viewport)的位置来指定元素位置。元素的位置在屏幕滚动时不会改变，比如那 种回到顶部的按钮一般都是用此定位方式。
- sticky：粘性定位，特性近似于relative和fixed的合体，其在实际应用中的近似效果就是IOS通讯录滚动的时候的 『顶屁股』。

#### 


	

#### display 属性

#### margin: auto

#### max-width

#### 盒模型

#### box-sizing

#### position

#### float

#### clear 清除浮动

#### 百分比宽度

#### 媒体查询

#### inline-block

#### column

#### flexbox

#### 伪类选择器：
- 动态伪类选择器


#### 新特性
##### 强大的 CSS3 选择器


##### 抛弃图片的视觉效果
##### 盒模型变化（多列布局和弹性盒模型）
##### 阴影效果
##### Web 字体和 Web Font 图标
##### CSS3 过度和动画交互效果
##### 媒体查询


#### 渐进增强和优雅降级