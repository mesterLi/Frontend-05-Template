# 学习笔记

## CSS总体结构

1. @charset
2. @import
3. rules
  * @media
  * @page
  * rule

## CSS @规则的研究

1. @charset https://www.w3.org/TR/css-syntax-3/
2. @import https://www.w3.org/TR/css-cascade-4/
3. @media https://www.w3.org/TR/css3-conditional/
4. @page https://www.w3.org/TR/css-page-3/
5. @counter-style ：https://www.w3.org/TR/css-counter-styles-3
6. @keyframes https://www.w3.org/TR/css-animations-1/
7. @fontface https://www.w3.org/TR/css-fonts-3/
8. @supports https://www.w3.org/TR/css3-conditional/
9. @namespace https://www.w3.org/TR/css-namespaces-3/

## CSS规则

1. 选择器
2. 声明
    * Key
    * Value
3. Selector
    * https://www.w3.org/TR/selectors-3/
    * https://www.w3.org/TR/selectors-4/
4. Decalartion:
    * Key
        * Properties
        * Variables https://www.w3.org/TR/css-variables/
    * Value https://www.w3.org/TR/css-values-4/
    
## 选择器语法

1. 简单选择器
    * \*
    * 标签   div svg|a   
    * 类  .cls
    * ID  #id
    * 属性 理论上可以用属性选择器代替类和id选择器（如果不考虑选择器优先级的话）
        *  [attr] 匹配有该属性名    
        *  [attr=value] 匹配属性值等于value
        *  [attr~=value] 匹配属性值中的一个等于value，(适用于用空格相连的多个value)
        *  [attr|=value] 匹配属性值以value开头
    * 伪类   :hover（主要是元素的一些特殊状态[来自交互]，或者是带函数的选择器）
    * 伪元素  ::before 
  
2. 复合选择器
    * <简单选择器><简单选择器><简单选择器>  多个简单选择器之间是 “与” 的关系
3. 复杂选择器
    * <复合选择器><sp><复合选择器>           (子孙)后代
    * <复合选择器>">"<复合选择器>            父子   
    * <复合选择器>"~"<复合选择器>	          后续邻居
    * <复合选择器>"+"<复合选择器>            第一个后续邻居
    * <复合选择器>"||"<复合选择器>           列选择器，表示选中对应列中符合条件的单元格

## 伪类

1. 链接/行为
    * :any-link 所有超链接
    * :link 未访问超链接
    * :visited 已访问超链接
    * :hover 鼠标放上去之后生效
    * :active 点击之后生效
    * :focus 获取了焦点    
    * :target 当前url的hash指向了当前的锚点

2. 树结构
    * :empty
    * :nth-child()
    * :nth-last-child()  //倒数
    * :first-child :last-child :only-child
    
    NOTE:
    
        :empty，:nth-last-child(), :last-child和:only-child 破坏了ComputeCss的计算时机的问题
        :empty（StartTag入栈时并不知道是否有子元素）
        :nth-last-child()，:last-child （需要倒数的话，必须提前知道所有的子元素）
        :only-child（必须提前知道所有的子元素）
        :nth-child()和:first-child不会破坏ComputeCss的时机，因为可以知道第N个或者第一个子元素

3. 逻辑型
    * :not伪类只支持复合选择器(多个简单选择器)
    * :where  :has

## 伪元素

1. ::before
2. ::after
3. ::first-letter
4. ::first-line

###### ::before,::after

```
<div>
    <::before/>
    content content content content content
    content content content content content
    content content content content content
    content content content content content
    <::after/>
</div>
```

###### ::first-letter   适合报纸中第一个非常大的字

```
<div>
    <::first-letter>c</::first-letter>content content content content content
    content content content content content
    content content content content content
    content content content content content
    content content content content content
</div>
```

first-letter 可以设置的属性
1. font
2. color
3. background
4. word-spacing
5. letter-spacing
6. text-decoration
7. text-transform
8. line-height
9. float
10. vertical-align
    * 盒模型系列：margin,padding,border

###### ::first-line

```	
<div>
    <::first-line>content content content content content</::first-line>
    content content content content content
    content content content content content
    content content content content content
    content content content content content
</div>
```

first-line 可以设置的属性
1. font 字体
2. color 颜色
3. background 背景
4. word-spacing 
5. letter-spacing 字间距
6. text-decoration 文字方向
7. text-transform 字模转换
8. line-height 行间距

  



