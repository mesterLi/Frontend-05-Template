学习笔记

#### Expression
1. `Member` `foo.a` `foo['a']` `foo`` ` `super.a` `super['b']`
`new.target` `new Foo()`
2. `New` `new Foo`
3. `Call` `foo()` `super()` `super().a`等 这里不会先执行 `Member`
会降级为 `call expression`
4. `Left Handside & Right Handside` 大多数情况下左表达式是右表达式
5. `Update` `a++ a-- ++a --a` example: ++ a ++ (这种语法是错误的)
++ (a ++)
6. `Unary` `delete a.b` `void f()` `typeof a` `+a` `-a` `await a`等
7. `Exponetal` `**`唯一右结合的运算符 2 ** 3 ** 2 ==> 2 ** (3 ** 2)
Example `new Foo()()先执行前一个` `new new Foo()先执行后一个`
8. `Multicative` */%
9. `Additive` +-
10. `Shift` << >> 
11. `Relationship` >= <= instance in
12. `Equality` == != === !==
13. `Bitwise` | & ^
14. `Logical` && ||
15 `COnditional` ?:

#### Reference
1. Object
2. Key
3. delete
4. assign

#### Statement

## Gramer & Runtime

1. 简单语句
    * `Expression Statement` 表达式语句
    * `Empty Statement` ；
    * `Debugger Statement`
    * `Throw Statement`
    * `Continue Statement` 跳过这一次的循环
    * `Break Statement` 终止循环后面可以跟label，指定终止哪一次循环
    * `Return Statement` 返回值语句
2. 复合语句
    * `Block Statement` 可以声明块作用域 {}
    * `If Statement` 逻辑判断
    * `Switch Statement`
    * `Iteration Statement` 循环 `while for in for of for ;`
    * `With Statement` 具有穿透作用，会把变量作用返回提升到顶部
    * `Label Statement` 标注语句
    * `Try Statement` try catch finally, 注意 return 不会阻止finally，必须要加{}
    
    每个语句都具有 `[[type]]`(一般是nomal) `[[value]]` `[[target]]`
3. 声明
    * `Function Declaration` function(){}
    * `Genration Declaration` function* (){}
    * `Async Function Declaration` async function(){}
    * `Async Genration Declaration` async function* (){}
    * `Variable Statement` var
    * `Class Declaration` Class A{}
    * `Lexical Declaration` const let 等
    
    函数声明和variable声明时都会提升到当前作用域最顶层，所有的生明都会具有预处理；function&var在预处理的时候会放在第一行，const&let&Class在预处理时，如果没有声明会报错。
    {}会产生一个快级作用域
    
#### 事件循环

1. 宏任务： 一串js代码传给js引擎去执行，这个时候就会产生一个宏任务（setimeout等也会产生宏任务）
2. 微任务：目前只有promise会产生微任务
3. js函数调用，每一个函数都是一个闭包，js函数调用是stack类型，每一个函数执行都会有一个 `Excution Context`执行上下文，它可以获取到它的执行上下文和父级的执行上下文