学习笔记
## 对象与组件

#### 对象

  1. Properties 属性
  2. Methods    方法
  3. inherit    继承

#### 组件（基本上是对象的丰富化）

  1. Properties 属性
  2. Methods    方法
  3. inherit    继承
  4. Attribute  特性（描述组件特征）
  5. Config & State  组件的配置 & 组件的内部状态
  6. Event      事件，组件往外去传递数据的桥梁
  7. LifeCycle  声明周期 (init、mount、unmount、update)
  8. Children   树形结构的必要条件

#### 用户

保证用户能更改组件状态，而组件使用者尽量不要去修改（保证状态唯一）

#### 使用者

通过attribute、properties、config影响组件

  * attribute & properties

  * config

  * Event