const ASII_TYPE = 'ASII_TYPE';
const CHINESE_TYPE = 'CHINESE_TYPE';

function stringToUft(str) {
	let binaryArr = [];
	for (let i in str) {
		// code转二进制
		let bit = str[i].charCodeAt();
		let j = 0;
		let bits = bit.toString(2);
		switch (type(bit)) {
			// 标准ASII编码
			case ASII_TYPE:
				// console.log(bits)
				while (j <= 8 - bits.length && 8 - bits.length > 0) {
					j++;
					bits = '0' + bits;
				}
				binaryArr.push(bits);
				break;
			case CHINESE_TYPE:
				binaryArr.push(...transToUnit8(bits));
				break;
			default:
				return binaryArr
		}
	}
	return bitArrToArrayBuffer(binaryArr);
}

function type(charCode) {
	if (charCode <= 126) {
		return ASII_TYPE;
	}
	return CHINESE_TYPE;
}
function transToUnit8(bits) {
	const len = '1110'; // 三个1表示占三个字节 剩下4位 是前4位。不足补0
	const other = '10'; // 其他两个字节以10开头，剩下6位分别是unt16编码中后六位 和中间6位
	let i = 0;
	while (16 - bits.length > i) {
		bits = '0' + bits;
	}
	return [
		len + bits.substr(0, 4),
		other + bits.substr(4, 6),
		other + bits.substr(10, 6)
	]
}

function bitArrToArrayBuffer(arr) {
	const buffer = new Uint8Array(arr.length);
	for (let i = 0; i < arr.length; i++) {
		buffer[i] = parseInt(arr[i], 2); // 指定2进制
	}
	return buffer;
}
console.log(stringToUft('ABC萨瓦迪卡'))
