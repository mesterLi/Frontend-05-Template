# dragable

1、`dragable` 按下时利用`document.addEventListener`控制`mousemove`事件，来解决鼠标移动太快无法拖拽问题
2、`range`去给每个点创建`range`实现可插入，(`range.insertNode(Node)`插入的是已在dom中的节点)
3、`mousemove`的xy与文字`range`的差值的平方来判断插入哪个地方

# reactive

1、 使用 `proxy` 对对象属性进行 `setter getter`, `setter`时进行触发callback，`getter`时存入对象对应的`proxy`对象
2、用`map`把对象对应的calllback存储起来，可以精确触发到对应的callback

