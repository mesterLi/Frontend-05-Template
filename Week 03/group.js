void function (win) {
	const reg = /([0-9\.]+)|([ \t]+)|([\r\n]+)|([\+])|([\-])|([\*])|([\/])|([\(])|([\)])/g;
	const TOKEN = ['Number', 'WhiteSpace', 'UnToken', '+', '-', '*', '/', '(', ')'];
	let source = [];

	function* tokenrize(str) {
		let i = 0;
		while (true) {
			i++;
			const result = reg.exec(str);
			if (!result) {
				break;
			}
			let token = {
				type: null,
				value: null
			};
			for (let i = 1; i < result.length; i++) {
				if (result[i]) {
					token.type = TOKEN[i - 1];
					break;
				}
			}
			token.value = result[0];
			yield token
		}
		yield {
			type: 'EOF'
		}
	}

	for (let i of tokenrize('(1 + 2) * 3')) {
		if (i.type !== 'WhiteSpace' && i.type !== 'UnToken') {
			source.push(i);
		}
	}
	function Expression(source) {
		// console.log(source)
		if (source[0].type === 'AdditiveExpression' && source[1] && source[1].type === 'EOF') {
			let node = {
				type: 'Expression',
				children: [source.shift(), source.shift()]
			}
			source.unshift(node);
			return source;
		}
		AdditiveExpression(source);
		return Expression(source);
	}

	function AdditiveExpression(source) {
		let node = {};
		switch (source[0].type) {
			// 如果第一个是数字，也就是在MultiplicationExpression表达式展开部分
			// 所以需要调用MultiplicationExpression方法
			case 'Number':
				MultiplicationExpression(source)
				return AdditiveExpression(source);
			case '(':
				MultiplicationExpression(source);
				return AdditiveExpression(source);
			case 'MultiplicationExpression':
				node = {
					type: 'AdditiveExpression',
					children: [source[0]]
				}
				source[0] = node;
				return AdditiveExpression(source);
			case 'AdditiveExpression':
				if (source[1] && (source[1].type === '+' || source[1].type === '-')) {
					node = {
						type: 'AdditiveExpression',
						opretor: source[1].type,
						children: []
					}
					node.children.push(source.shift());
					node.children.push(source.shift());
					if (source[0].type === 'Number') {
						MultiplicationExpression(source);
					}
					node.children.push(source.shift());
					source.unshift(node);
					return AdditiveExpression(source);
				}
		}
	}
	function MultiplicationExpression(source) {
		let node = {};
		switch (source[0].type) {
			case 'Number':
				node = {
					type: 'MultiplicationExpression',
					children: [source[0]]
				}
				source[0] = node;
				return MultiplicationExpression(source);
			case '(':
			{
				let i = 0;
				let addExpr = [];
				while (i++ < source.length && source[i].type !== ')') {
					addExpr.push(source[i]);
				}
				AdditiveExpression(addExpr);
				node = {
					type: 'MultiplicationExpression',
					children: []
				};
				node.children.push(source[0]);
				node.children.push(addExpr.shift());
				source.splice(0, i);
				node.children.push(source.shift());
				source.unshift(node);
				return MultiplicationExpression(source);
			}
				break;
			case 'MultiplicationExpression':
				if (source[1] && (source[1].type === '*' || source[1].type === '/')) {
					node = {
						type: 'MultiplicationExpression',
						opretor: source[1].type,
						children: []
					}
					node.children.push(source.shift());
					node.children.push(source.shift());
					node.children.push(source.shift());
					source.unshift(node);
					return MultiplicationExpression(source);
				}
				return source;
		}
	}
// Expression(source)

	AdditiveExpression(source);
	console.log(source);
}(window)
