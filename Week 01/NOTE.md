## 总结

## 三子棋
1. 双层for循环可以通过给第一层标记label，然后 `break label`跳出循环
2. "胜负剪枝"保证能赢，优化多层嵌套for循环
3. check时是否可以只check当前坐标对应行、列、对角、是否win，这样避免无用的循环
4. 布局可以用 `flex` `flex-wrap: wrap`自动换行这样可以不用添加br

## 异步编程
1. `callback` 最初回调函数形式实现异步编程，但是会形成 `回调地狱`不方便功能修改
2. `promise` 通过链式调用实现异步编程，状态只能改变一次（微任务）
3. async/await 同步方式实现异步编程，`await` 后面`function`会自动变成`promise`函数
4. `generator` 方法调用会生成一个迭代器，通过`yield`返回迭代器的value
