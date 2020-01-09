---
date: 2018-11-7
tag: 
  - js
author: liuli
location: shanghai  
---
# 防抖与节流

鼠标滚动（scroll）、调整窗口大小（resize）、敲击键盘（keyup）这类事件在触发时往往频率极高，这时事件对应的回调函数会反复执行，如果回调函数内包含复杂的运算逻辑或者DOM操作等，就可能造成浏览器的不流畅。而防抖和节流就是为了优化此类问题的，两者并不会减少事件的触发，而是减少事件触发时回调函数的执行次数。
* 防抖：事件短时间内高频次触发，但是只有在规定时间内不再触发后才执行回调
* 节流：将短时间的函数调用以一个固定的频率间隔执行

### 防抖
```
/**
 * 防抖
 * @param {Function} fn 回调函数
 * @param {Number} time 延迟时间
 * @param {Boolean} immediate 是否立即执行
 * @returns
 */
function debounce(fn, time, immediate) {
	let timer = null
	return function() {
		let context = this
		let args = arguments
		// !timer 判断是否执行过
		const callNow = immediate && !timer

		timer && clearTimeout(timer)

		timer = setTimeout(function() {
			timer = null
			if (!immediate) fn.apply(context, args)
		}, time)

		if (callNow) fn.apply(context, args)
	}
}
```
使用：
```
window.onresize = debounce(() => { console.log(1) }, 200);
```
### 节流
```
/**
 * 节流
 * @param {Function} fn 回调函数
 * @param {Number} time 间隔时间
 */
function throttle(fn, time) {
	let startTime = 0
	return function() {
		let handleTime = +new Date()
		let context = this
		let args = arguments

		if (handleTime - startTime >= time) {
			fn.call(context, args)
			startTime = handleTime
		}
	}
}
```
使用:
```
window.onresize = throttle(() => { console.log(1) }, 1000);
```