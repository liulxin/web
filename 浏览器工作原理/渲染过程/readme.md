1. 解析`html`文件构建`dom`树
2. 处理`css`构建`CSSOM`树
3. 将`DOM`和`CSSOM`合并为渲染树
4. 根据渲染树布局，然后进行绘制

#### script
在解析`html`时如果遇到了`script`标签，将会阻塞`html`的解析。如果是外部脚本，那么就需要等待获取，以及`js`代码执行的完成，才会继续`dom`树的构建。

> 由于`script`标签的阻塞，通常采用以下方式来进行优化
* 放在网页`body`标签末尾
* 添加`defer、async`属性使得不阻塞`html`的解析。虽然都会异步加载脚本，不过`defer`和`async`是有不同的：
    - `defer`会在文档渲染完毕后，DOMContentLoaded事件调用前执行。按顺序执行所有的script
    - `async`会在浏览器空闲允许的情况下执行，并且是无序的，先加载完就先执行

#### link
在解析`html`时如果遇到了样式表，将会阻塞浏览器的渲染。直至`CSSOM`构建完成。
* css加载不会阻塞DOM树的解析
* css加载会阻塞DOM树的渲染
* css加载会阻塞后边js的执行

#### 回流和重绘
在页面的渲染过程中，由于样式和js可能会导致多次的渲染。也就涉及到了回流和重绘。
* 回流：当render tree 的一部分或全部的元素因改变了自身的宽高，布局，显示或隐藏，或者元素内部的文字结构发生变化 导致需要重新构建页面的时候，就造成了回流
* 重绘：当一个元素自身的宽高，布局，及显示或隐藏没有改变，而只是改变了元素的外观风格的时候，就造成了重绘
> 回流必定触发重绘，重绘不一定触发回流

触发回流的属性：
* 盒模型相关属性：`width height padding margin display border-width border min-height`
* 定位属性及浮动：`top left bottom right position float clear`
* 内部文件结构的改变等：`text-align overflow-y font-weight overflow font-family line-height vertival-align white-space font-size`
触发重绘的属性:
* `color border-style border-radius visibility text-decoration background outline box-shadow`等

优化：
* `transform` 代替`top left margin-top margin-left`等属性
* 使用className 代替js操作多条样式
* 尽量不使用table布局
