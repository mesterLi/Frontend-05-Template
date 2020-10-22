```
node ::=
    <Expression> <EOF>/

    <AdditiveExpression> ::=
        <MultiplicationExpression>
        |<AdditiveExpression><+><MultiplicationExpression>
        |<AdditiveExpression><-><MultiplicationExpression>

    <MultiplicationExpression> ::=
        <Number>
        |<MultiplicationExpression><*><Number>/
        |<MultiplicationExpression></><Number>/
```
