const reg = /([0-9\.]+)|([ \t]+)|([\r\n]+)|([\+])|([\-])|([\*])|([\/])|([\(])|([\)])/g;
const TOKEN = ['Number', 'WhiteSpace', 'UnToken', '+', '-', '*', '/', '(', ')'];
let source = [];

function* tokenrize(str) {
	let i = 0;
	while (true) {
		i++;
		const result = reg.exec(str);
		// exec 返回一个结果数组，下标0是匹配到结果
		// 剩下的索引对应括号位置，可以通过这个与关键词对应
		// console.log(result)
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

for (let i of tokenrize('1 + 2 - 3')) {
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
				// 如果当前是加减表达式，也就意味着 下标1为 +-，下标2为Number需要调用MultiplicationExpression处理成乘法表达式
				MultiplicationExpression(source);
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
Expression(source);
// console.log(source)
