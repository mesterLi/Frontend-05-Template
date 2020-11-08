const $ = Symbol("$");

class Trie {
	constructor() {
		this.root = Object.create(null);
	}
	insert(word) {
		let node = this.root;
		for (let s of word) {
			if (!node[s]) {
				node[s] = Object.create(null);
			}
			node = node[s];
		}
		if (!($ in node)) {
			node[$] = 0;
		}
		node[$]++;
	}
	more() {
		let max = 0;
		let maxWord = null;
		const visite = (node, word) => {
			if (node[$] && node[$] > max) {
				max = node[$];
				maxWord = word;
			}
			for (let i in node) {
				visite(node[i], word + i);
			}
		}
		visite(this.root, "");
		console.log(maxWord, max);
		return [max, maxWord];
	}
	less() {
		let min = Number.MAX_SAFE_INTEGER;
		let minWord = null;
		let visite = (node, word) => {
			if (node[$] && node[$] < min) {
				min = node[$];
				minWord = word;
			}
			for (let i in node) {
				visite(node[i], word + i);
			}
		}
		visite(this.root, "");
		return [min, minWord];
	}
}

function randomLength(length) {
	let s = "";
	for (let i = 0; i < length; i++) {
		s += String.fromCharCode(Math.random() * 26 + "a".charCodeAt(0))
	}
	return s;
}
const tire = new Trie();

for (let i = 0; i < 100000; i++) {
	tire.insert(randomLength(4));
}

console.log(tire.less())
