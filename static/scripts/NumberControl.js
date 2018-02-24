"use strict";

export default class NumberControl {
    static isCifra(charParam) {
        const numbersString = "1234567890";
        return numbersString.indexOf(charParam) !== -1;
    }

    static isIntegerNumber(stringParam) {
        for(let i = 0; i < stringParam.length; i++) {
            const c = stringParam.charAt(i);
            if(NumberControl.isCifra(c) === false) {
                return false;
            }
        }
        return true;
    }
}
