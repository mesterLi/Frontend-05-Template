## 总结

1. 双层for循环可以通过给第一层标记label，然后 `break label`跳出循环
2. "胜负剪枝"保证能赢，优化多层嵌套for循环
3. check时是否可以只check当前坐标对应行列对角是否win，这样避免无用的循环
4. 布局可以用 `flex` `flex-wrap: wrap`自动换行这样可以不用添加br
