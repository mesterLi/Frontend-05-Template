#### 四则运算

#### 词法分析 语法分析 运行时执行

有效输入 . 1-9 + - * /
格式化输入 空格 换行
1. 词法分析：
    1. 乘除法表达式 `MultiplicationExpression` 可以是单独的一个 `Number` 或者一个乘法表达式 */ 一个 `Number`
    2. 加减表达式 `AdditiveExpression` 可以是 乘除表达式+-乘除表达式， 
    也可以是加减表达式 +- 乘除表达式
    3. 因为乘除优先级原因所以加法是由若干个乘除拼接起来
```
<Expression> ::=
    <AdditiveExpression> <EOF>/

    <AdditiveExpression> ::=
        <MultiplicationExpression>
        |<AdditiveExpression><+><MultiplicationExpression>
        |<AdditiveExpression><-><MultiplicationExpression>

    <MultiplicationExpression> ::=
        <Number>
        |<MultiplicationExpression><*><Number>/
        |<MultiplicationExpression></><Number>/
```

括号表达式可以把括号看成乘法然后按照正确顺序去计算
```group
    
<Expression> ::=
    <AdditiveExpression> <EOF>/

    <AdditiveExpression> ::=
        <MultiplicationExpression>
        |<AdditiveExpression><+><MultiplicationExpression>
        |<AdditiveExpression><-><MultiplicationExpression>

    <MultiplicationExpression> ::=
        <Number>
        |<MultiplicationExpression><*><Number>/
        |<MultiplicationExpression></><Number>/
        |<(><AdditiveExpression><)>
```
