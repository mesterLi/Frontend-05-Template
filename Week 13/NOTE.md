学习笔记

# HTML

* symbol
  * `&nbsp;`: 空格
    * no-break space
    * 会破坏语义,不建议使用
  * `&quot;`: `"`
  * `&amp;`: `&`
  * `&lt;`: `<`
  * `&gt;`: `>`
* 语义化
  * 定义
    * 语义指的是一段代码的含义
    * 例如: 这个 HTML 的元素有什么作用，扮演了什么样的角色
    * 在恰当的需求下使用恰当的 HTML 元素
  * 好处
    * `<h1>`它的语义会被在很多地方以不同的方式被使用到， 例如搜索引擎会把它包含的内容作为一个重要的关键词，从而影响这个页面在搜索结果中的排序（SEO），而且屏幕阅读器会使用它来帮助视障用户更好的使用这个页面。
  * 语义化元素
    * `<article>`
    * `<aside>`
    * `<details>`
    * `<figcaption>`
    * `<figure>`
    * `<footer>`
    * `<header>`
    * `<main>`
    * `<mark>`
    * `<nav>`
    * `<section>`
    * `<summary>`
    * `<time>`
    * [more...](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Inline_text_semantics)

## CSSOM

* window.getComputedStyle(element [, pseudoElt]);
  * element 要获取其计算样式的元素
  * pseudoElt 可选,伪元素
  * 返回 一个包含元素的所有 CSS 属性值的对象
* window
  * innerHeight,innerWidth
  * outerHeight,outerWidth
  * devicePixelRatio
* scroll
  * element
    * scrollTop
    * scrollLeft
    * scrollWidth
    * scrollHeight
    * scroll(x, y)
    * scrollBy(x, y)
    * scrollIntoView()
  * window
    * scrollX
    * scrollY
    * scroll(x, y)
    * scrollBy(x, y)
* layout
  * getClientRects()
  * __getBoundingClientRect()__