function kmp(source, pattern) {
	let table = new Array(pattern.length).fill(0);
	{
		let i = 1, j = 0;
		while (i < pattern.length) {
			if (pattern[i] === pattern[j]) {
				i++, j++;
				table[i] = j;
			} else {
				if (j > 0) {
					j = table[j]
				} else {
					i++;
				}
			}
		}
	}
	{
		let i = 0, j = 0;
		while (i < source.length) {
			if (source[i] === pattern[j]) {
				i++, j++;
			} else {
				if (j > 0) {
					// 如果不匹配并且j > 0 说明前面有匹配上的，让pattern回到匹配上的地方重新遍历
					j = table[j];
				} else {
					i++;
				}
			}
			if (j === pattern.length) {
				return true;
			}
		}
		return false;
	}
}

// console.log(kmp("Hello", "ll"));
// console.log(kmp("Helxlo", "ll"));
// console.log(kmp("aaa", "aaa"));
// console.log(kmp("abcabcdabcabce", "abcabce"));
