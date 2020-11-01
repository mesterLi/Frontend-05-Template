function willcard(source, pattern) {
	let starCount = 0;
	for (let k = 0; k < pattern.length; k++) {
		if (pattern[k] === "*") {
			starCount++;
		}
	}
	if (starCount === 0) {
		for (let i = 0; i < pattern.length; i++) {
			if (pattern[i] !== source[i] && pattern[i] !== "?") {
				return false
			}
		}
		return true;
	}
	let i = 0;
	let lastIndex = 0;
	for (i = 0; pattern[i] !== "*"; i++) {
		if (pattern[i] !== source[i] && pattern[i] !== "?") {
			return false;
		}
	}
	lastIndex = i;
	console.log(i);
	// 只循环到倒数第二个*
	for (let j = 0; j < starCount - 1; j++) {
		i++;
		let sub = "";
		while (pattern[i] !== "*") {
			// 如果下一个不是*
			sub += pattern[i];
			i++;
		}
		// 把子串中？替换成正则表达式
		const reg = new RegExp(sub.replace(/\?/g, "[\\s\\S]"), "g");
		// 从标记的lastIndex开始执行
		console.log('lastIndex', lastIndex, i);
		reg.lastIndex = lastIndex;
		const result = reg.exec(source);

		if (!result) {
			// 如果没有匹配到直接return false
			return false;
		}
		lastIndex = reg.lastIndex;
	}
	console.log(lastIndex)
	for (let m = 0; m <= source.length - lastIndex && pattern[pattern.length - m] !== "*"; m++) {
		let pLen = pattern.length - m;
		if (pattern[pLen] !== source[source.length - m] && pattern[pLen] !== "?") {
			return false;
		}
	}
	return true;
}

// console.log(willcard("abcdefbac", "a*c"));
// console.log(willcard("abcdefbac", "a*d?c"))
// console.log(willcard("abcdcefbac", "a*d*?e?b?c"))
