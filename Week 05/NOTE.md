## 练习笔记

#### 字典树

1. `object` key 值唯一性
2. 遍历时加上出现的次数

#### kmp

`pattern = "abcdabce"`
`source = "abcdabcdabce"`

1. 先把 `pattern` 处理成重复记录的 `table` 列表 (`[0, 0, 0, 0, 0, 1, 2, 3]`, 
e前面有三个字符是在重复的)
2. 进行 `pattern` 串与 `source` 串进行匹配，当`source` 串匹配到第二个d的时候与 
`pattern` 串的e不匹配，但是前面的`abcd`是匹配的，所以我们让`pattern`串回到3的位置
与 `source` 重新进行匹配

#### willcard

1. 先记录 `pattern` 中出现的 `*` 号的数量，如果为0，就按照正常逻辑处理
2. 截取`pattern`中之前`*`号与下一个`*`号之间的字符串把`?`用正则替代，在 `source`中
执行正则 `exec` 记录 `lastIndex`
3. 从后到前遍历 `pattern`中与`source`中出现的字符串，如果是 `*`（最后一个）就尽
可能匹配更多字符串

#### api

1. `String.fromCharCode` 返回由指定的utf-8创建的字符串 `String.fromCharCode(111)` 
返回 `o`
2. `"a".charCodeAt(0)` 返回 `a` 在ASCII码中对应的位置 97 => a, 98 => b
