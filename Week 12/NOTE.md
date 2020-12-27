学习笔记

#### 正常流排版

* 收集盒和文字进行
* 计算盒和文字在行中的排布
* 计算行的排布

#### 组成

* line-box（IFC）：包括文字盒inline-box
* block-level-box
* BFC：包括line-box（IFC）和block-level-box

#### 行内排布

* base-line：文字对准基线
* text-top：上限，字不可超过这条线，随着font-size而动
* text-bottom：下限，字不可超过这条线，随着font-size而动
* line-top：跟盒混排时，盒的高度会把line-top撑开
* line-bottom：跟盒混排时，不同的对齐方式会把line-bottom撑开

#### 块级排布

* 从上往下排
* margin重叠，以最大的margin为准（**只会发生在BFC里**）

#### BFC

* Block Container：内部包含BFC的
  * 能容纳正常流的盒，里面就有BFC
* Block-level Box：外层是BFC
* Block Box：Block Container + Block-level Box => 里面外面都有BFC的

#### Block Container

* block
* inline-box
* table-cell
* flex item
* grid cell
* table-caption

#### Block-level Box

* block
* inline-block
* flex
* inline-flex
* table
* inline-table
* grid
* inline-grid

#### 设立BFC

* floats
* absolutely positioned elements
* block-containers(inline-block、table-cell、table-caption)
  * Flex items
  * Grid cell
* block boxes with 'overflow' other than 'visible'

默认能容纳正常流的盒，默认都能设立BFC。最简单的创建BFC`overflow: hidden`

除了Block Box里外都是BFC并且overflow为visible的不能设立BFC（会发生BFC合并）

* BFC合并与float （在同一个BFC里排版会围绕float，创建新的BFC则不会）
* BFC合并与边距折叠（在同一个BFC边距会发生折叠，依照最大的margin）