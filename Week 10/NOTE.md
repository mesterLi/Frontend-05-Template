# 学习笔记

#### 主轴计算

1. 找出flex元素
2. 把主轴剩余尺寸按flex比例分配
3. 如果剩余空间为负数，把所有flex元素设为0，然后等比压缩剩余元素
4. 没有flex元素则根据justify-content来计算

#### 计算交叉轴

1. 根据flex-align和item-align属性设置

#### 绘制单个元素
1. 绘制需要依赖一个图形环境
2. 采用npm包images
3. 绘制在一个viewport上进行
4. 与绘制相关的属性：background-color、border、background-image等。gradient需要WebGL相关的库来处理

#### 绘制DOM
1. 递归调用子元素的绘制方法完成DOM树的绘制
2. 忽略一些不需要绘制的节点
3. 实际浏览器中，文字绘制是难点，需要依赖字体库，把字体变成图片去渲染
4. 实际浏览器中，还会对一些图层做compositing

#### flex
1. 如果算出分配flex的width是负数，则flex： 0，其他元素等比例缩小
2. alginSelf 优先级大于父元素 alginItem
3. flexLine 是根据当前行最高盒子为基准的
