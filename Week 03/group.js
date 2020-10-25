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
	// return Expression(source);
}

function AdditiveExpression(source) {
	let node = {};
	switch (source[0].type) {
		// 如果第一个是数字，也就是在MultiplicationExpression表达式展开部分
		// 所以需要调用MultiplicationExpression方法
		case 'Number':
			MultiplicationExpression(source)
			return AdditiveExpression(source);
		case 'MultiplicationExpression':
			node = {
				type: 'AdditiveExpression',
				children: [source[0]]
			}
			source[0] = node;
			return AdditiveExpression(source);
		case 'AdditiveExpression':
			if (source[1].type === '+' || source[1].type === '-') {
				node = {
					type: 'AdditiveExpression',
					opretor: source[1].type,
					children: []
				}
				node.children.push(source.shift());
				node.children.push(source.shift());
				// 如果当前是加减表达式，也就意味着 下标1为 +-或者括号（）符号，下标2为Number需要调用MultiplicationExpression处理成乘法表达式
				// if (source[0].type === '(') {
				// 	Group(source)
				// }
				// if (source[0].type === ')') {
				// 	// console.log(')', source);
				// 	Group(source);
				// }
				if (source[0].type === 'Number') {
					MultiplicationExpression(source);
				}
				node.children.push(source.shift());
				source.unshift(node);
				return AdditiveExpression(source);
			}
		case '(':
			let group = {
				type: 'GroupExpression',
				children: []
			}
			source[0] = group;
			return AdditiveExpression(source)
		case 'GroupExpression':
		{
			let group = source.shift();
			// AdditiveExpression(source);
			// while (source[0].type !)
			AdditiveExpression(source)
			console.log(source)
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
		case 'MultiplicationExpression':
			if (source[1].type === '*' || source[1].type === '/') {
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
	}
}
Expression(source)
