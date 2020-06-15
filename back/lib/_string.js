let _string = {};

_string.isDigit = function(c) {
    const   digits = '0123456789';
    let     n;

    n = 10;

    while (n != 0) {
        --n;
        if (c === digits.charCodeAt(n))
            return true;
    }

    return false;
};

_string.strToUint = function(str) {
    let     uint;
    let     n;
    let     digit;

    uint = 0;
    n = 0;

    while (n != str.length) {

        if (_string.isDigit(str.charCodeAt(n)) === false)
            return -1;

        digit = parseInt(str.charAt(n), 10);

        if (uint > (Number.MAX_SAFE_INTEGER - digit))
            return -1;

        uint = uint * 10 + digit;

        ++n;
    }

    return (uint);
};

module.exports = _string;
