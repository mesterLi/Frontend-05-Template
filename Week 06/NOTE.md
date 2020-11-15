# 学习总结

## 语言分类
1. 非形式语言 不需要按照特定的语法 （中文、英文等）
2. 形式语言 需要按照特定的语法 （乔姆斯基谱系）
    * 0型 无限制文法
    * 1型 上下文相关文法
    * 2型 上下文无关文法
    * 3型 正则文法
    tips：高型一定包括低型，现在一些语言不一定必须是某一型，也有可能是多种结合
    
## 产生式
```
<AdditiveExpression> ::=
        <MultiplicationExpression>
        |<AdditiveExpression>"+"<MultiplicationExpression>
        |<AdditiveExpression>"-"<MultiplicationExpression>
```
1. 尖括号括起来的表示词法结构名
2. 语法结构分基础结构和其他语法结构组成的复合机构
    * 基础结构终结符
    * 复合结构非终结符
3. 引号和中间的自符表示终结符
4. 可以有括号（变为一组）
5. `*` 表示多次; `｜` 表示或; `+` 表示至少一次

#### 括号产生式

```
BNF
    <AdditiveExpression> ::=
        <MultiplicationExpression>|
        <MultiplicationExpression>"+"<AdditiveExpression>|
        <MultiplicationExpression>"-"<AdditiveExpression>
        
    <MultiplicationExpression>::= 
        <Number>|
        <MultiplicationExpression>"*"<MultiplicationExpression>|
        <MultiplicationExpression>"/"<MultiplicationExpression>|
        <GroupExpression>::= "("<AdditiveExpression")"
                  
```

## 语言分类
1. 数据表述语言（JSON、HTML、XML、SQL、CSS、MONGODB）
2. 编程语言（js、golang、c、c++、java、python、ruby等）

## 一般命令式基本单位
1. Atom (变量名、直接量)
    * Identifier
    * Literal
2. Expression （MultiplicationExpression）
    * Atom
    * Operator
    * Punctuator
3. Statement （语句）
    * Expression
    * Keyword
    * Punctuator
4. Structure
    * Function
    * Class
5. Program
    * Module
    * Package
    * Library

## JS类型
1. Number
2. String
3. Boolean
4. Null
5. Undefined
6. Object
7. Symbol
8. BigInt

#### Number IEEE 754 Double Float
1. Sign 1位 符号位
2. Exponent 11位 指数位
3. Fraction 52位 精度位
用64位bit表示，第一位（1｜0）表示正负；接下来11位表示指数位；最后52位表示精度
0.toString() 错误
0 .toString() 正确
因为0. 本身就是一个可被解析的Number（等同于0toString（）是错误的）所以要加空格

#### String ASII
1. utf8 1个字节 每一个字节有8个bit表示
2. utf16 两个字节

#### Object
1. 任何一个对象都是唯一的
2. 状态的改变既是行为
3. 数据属性 （value、writeable、enumerable、configurable）
4. 访问器属性 （get、set、enumerable、configurable）
5. 原型链 会在当前对象上查找属性或方法查找不地道回去原型链上查找，都查不到就是null
    
特殊对象 Date、RegExp、AsyncFunction

## string 转 Uint8Array
1. 获取每个字符的charCode，大于128是中文字符，小于128转二进制（toString(2)）不足8位补前0
2. 大于128转二进制，与16比较，不足前面补0
3. 中文字符用unit8表示 `1110xxxx 10xxxxxx 10xxxxxx`,第一个字节前四位有几个1表示一共几个字节，后四位是中文二进制前4位，第二第三个字节后六位是中文二进制5-10和11-16
4. 最后得到二进制数组，把每个二进制数组通过`parseInt(x, 2)`指定二进制，创建 `new Uint8Array()`给每个索引赋值
