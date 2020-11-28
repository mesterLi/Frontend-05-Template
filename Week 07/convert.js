// radix 2 8 10 16
function NumberToString(num, radix) {
    const code = '0123456789abcdef';
    let remainder;
    let divisor;
    let hex = '';
    while (true) {
        if (num < radix) {
            hex = code.charAt(num) + hex;
            break;
        }
        remainder = num % radix;
        divisor = Math.floor(num / radix);
        hex = code.charAt(remainder) + hex;
        num = divisor;
    }
    return hex;
}

NumberToString(255, 16);

function StringToNumber(str, radix) {
    let val = 0;
    for (let i = 0; i < str.length ; i++) {
        const asiiCode = str[i].charCodeAt();
        console.log(i)
        if (asiiCode <= 57 && asiiCode >= 48) {
            // 0-9
            val += str[i] * radix ** (Math.abs(i + 1 - str.length));
        }
        if (asiiCode > 57 && asiiCode <= 102) {
            // a-f
            val += (asiiCode - 87) * radix ** (Math.abs(i + 1 - str.length));
        }
    }
    return val;
}
StringToNumber('1000', 2)