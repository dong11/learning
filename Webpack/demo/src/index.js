import _ from 'lodash';
import './style/index.css';	// 引入样式文件

function createElement() {
	let div = document.createElement('div');
	div.innerHTML = _.join(['This', 'is', 'a', 'Webpack', 'example'], ' ');
	div.className = 'box';
	return div;
}

document.body.appendChild(createElement());