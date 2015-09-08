function classGost2814789(encryptionKey) {

    /*  Таблица замен */
    var exchangeTable = [
        {0: '9', 1: '6', 2: '3', 3: '2', 4: '8', 5: 'b', 6: '1', 7: '7', 8: 'a', 9: '4', a: 'e', b: 'f', c: 'c', d: '0', e: 'd', f: '5'},
        {0: '3', 1: '7', 2: 'e', 3: '9', 4: '8', 5: 'a', 6: 'f', 7: '0', 8: '5', 9: '2', a: '6', b: 'c', c: 'b', d: '4', e: 'd', f: '1'},
        {0: 'e', 1: '4', 2: '6', 3: '2', 4: 'b', 5: '3', 6: 'd', 7: '8', 8: 'c', 9: 'f', a: '5', b: 'a', c: '0', d: '7', e: '1', f: '9'},
        {0: 'e', 1: '7', 2: 'a', 3: 'c', 4: 'd', 5: '1', 6: '3', 7: '9', 8: '0', 9: '2', a: 'b', b: '4', c: 'f', d: '8', e: '5', f: '6'},
        {0: 'b', 1: '5', 2: '1', 3: '9', 4: '8', 5: 'd', 6: 'f', 7: '0', 8: 'e', 9: '4', a: '2', b: '3', c: 'c', d: '7', e: 'a', f: '6'},
        {0: '3', 1: 'a', 2: 'd', 3: 'c', 4: '1', 5: '2', 6: '0', 7: 'b', 8: '7', 9: '5', a: '9', b: '4', c: '8', d: 'f', e: 'e', f: '6'},
        {0: '1', 1: 'd', 2: '2', 3: '9', 4: '7', 5: 'a', 6: '6', 7: '0', 8: '8', 9: 'c', a: '4', b: '5', c: 'f', d: '3', e: 'b', f: 'e'},
        {0: 'b', 1: 'a', 2: 'f', 3: '5', 4: '0', 5: 'c', 6: 'e', 7: '8', 8: '6', 9: '2', a: '3', b: '9', c: '1', d: '7', e: 'd', f: '4'}
    ];

    /**
     * Режим работы ключа
     * encrypt зашифрование
     * decrypt расшифрование
     * authcode выработка имитовставки
     * */
    var keyModes = {
        encrypt:    [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 7, 6, 5, 4, 3, 2, 1, 0],
        decrypt:    [0, 1, 2, 3, 4, 5, 6, 7, 7, 6, 5, 4, 3, 2, 1, 0, 7, 6, 5, 4, 3, 2, 1, 0, 7, 6, 5, 4, 3, 2, 1, 0],
        authcode:   [0, 1, 2, 3, 4, 5, 6, 7]
    };

    this.crypt = function (text, keyMode) {

        var xorResult = '';
        var result = '';

        splitIntoBlocks(text).forEach(function (block) {

            keyModes[keyMode].forEach(function (k) {

                xorResult = CicleLeftShift(exchangeChars(mod2_32(block[1].charCodeAt(0), encryptionKey.charCodeAt(k))), 11) ^ block[0].charCodeAt(0);

                block.reverse();

                block[1] = String.fromCharCode(xorResult);

            });

            result += block.join('');

        });

        return result;

    };

    /**
     * Разделяет входящую строку на блоки по 2 символа (32*2 = 64 бит)
     * Если в строке нечетное количетсов символов, то дописывает в конец пробел
     * @param text
     * @returns {Array}
     */
    function splitIntoBlocks(text) {

        if (text.length % 2) text += ' ';

        return text.match(/(..)/g).map(function (item) {
            return item.split('');
        });

    }

    /**
     * Реализует сложение по модулю 32
     * @param a {string} первый операнд
     * @param b {string} второй операнд
     * @returns {*} Результат сложения
     */
    function mod2_32(a, b) {

        var result = (+a + +b).toString(2);

        return result.length > 32 ? parseInt(result.slice(1), 2) : parseInt(result, 2);

    }

    /**
     * Дописывает в начало целевой строки заданные символы до достижени нужнйо длины
     *
     * @param string {string} Целевая строка
     * @param char {string} Символ, который следует дописывать
     * @param length {number} Длинна результирующей строки
     * @returns {*} {string} Результирующая строка
     */
    function padString(string, char, length) {
        while (string.length < length)
            string = char + string;
        return string;
    }

    /**
     * Реализует нарезку 32-х битного блока на 4-х битные блоки,
     * перевод этих блоков в HEX и замену HEX символа по таблице замен в соответствии с ГОСТ 28147-89
     * @param input
     * @returns {string}
     */
    function exchangeChars(input) {

        return parseInt(padString(input.toString(2), '0', 32).replace(/(....)/g, function (match) {

            return parseInt(match, 2).toString(16);

        }).split('').reverse().map(function (item, i) {

            // console.log(item + '|'+ i + '|'+exchangeTable[i][item]);

            return exchangeTable[i][item];

        }).reverse().join(''), 16);

    }

    /**
     * Циклический сдвиг влево
     * @param value
     * @param shift
     * @returns {Number}
     * @constructor
     */
    function CicleLeftShift(value, shift) {
        return parseInt(parseInt(value).toString(2).slice(shift) + parseInt(value).toString(2).slice(0, shift), 2);
    }

}