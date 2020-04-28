/**
 * 特殊对象
 * 1、Map有 [[MapData]] 私有字段
 * 2、Error有 [[ErrorData]] 私有字段
 * 3、Boolean有 [[BooleanData]] 私有字段
 * 4、Number有 [[NumberData]] 私有字段
 * 5、Date有 [[DateValue]] 私有字段
 * 6、RegExp有 [[RegExpMatcher]] 私有字段
 * 7、Symbol有 [[SymbolData] 私有字段
 * 8、Set有 [[SetData]] 私有字段
 * 9、WeakMap有 [[WeakMapData]] 私有字段
 * 10、WeakSet有 [[WeakSetData]] 私有字段
 * 11、Proxy有 [[RevocableProxy]] 私有字段
 */


function convertNumberToString(number, x = 10) {
    var integer = Math.floor(number)
    var fraction = null
    if (x === 10) fraction = ('' + number).match(/\.\d*/)[0]
    var string = ''
    while (integer > 0) {
        string = integer % x + string
        integer = Math.floor(integer / x)
    }
    return fraction ? string + fraction : string
}


function convertStringToNumber(string, radix = 10) {
    const rep = /^[0-9]{1,}(\.[0-9]{1,})?$/;
    if (typeof string === "string" && rep.test(string)) {
        if (radix > 10 || radix < 2) {
            return
        }
        let chars = string.split('')
        let number = 0
        let i = 0
        while (i < chars.length && chars[i] != '.') {
            number *= radix
            number += chars[i].codePointAt(0) - '0'.codePointAt(0)
            i++;
        }
        if (chars[i] === '.') {
            i++
        }
        let fraction = 1
        while (i < chars.length) {
            fraction /= radix
            number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction
            i++
        }
        return number;
    }
    return new Error('无法转换')
}