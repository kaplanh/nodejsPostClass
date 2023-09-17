"use strict";

/* -------------------------------------------------------
    MODULES
------------------------------------------------------- *

// console.log('index.js çalıştı.')

const test = function() {
    console.log('index.js çalıştı.')
}

// EXPORT:
module.exports = test

/* ------------------------------------------------------- 
// tekbir fonksiyonu export edeceksek asagidaki sekildede export edebiliriz
// EXPORT:
module.exports = function () {
    console.log('index.js çalıştı.')
}

/* ------------------------------------------------------- *
// birden fazla fonksiyonu,objeyi,class i özetle birden fazla veriyi export edeceksek bunlari 3 farkli sekilde export edebiliriz
const test1 = function() {
    console.log('test1 çalıştı.')
}

const test2 = function() {
    console.log('test2 çalıştı.')
}

const test3 = function() {
    console.log('test3 çalıştı.')
}

// *1.array yöntemi

// module.exports = [
//     test1,
//     test2,
//     test3
// ]

// *2-object yöntemi

// module.exports = {
//     test1: test1,
//     test2: test2,
//     test3: test3,
// }

//eger   test1: test1,
//       test2: test2,
//       test3: test3,
// seklinde keyler value lar ile ayni isimde ise  asagidaki gibide yazilabilir

module.exports = {
    test1,
    test2,
    test3,
}

/* ------------------------------------------------------- */

// module.exports.test1 = function() {
//     console.log('test1 çalıştı.')
// }

// module.exports.test2 = function() {
//     console.log('test2 çalıştı.')
// }

// module.exports.test3 = function() {
//     console.log('test3 çalıştı.')
// }

// module.exports.variable = 'new-value'

/* ------------------------------------------------------- */
// birden fazla fonksiyonu export etmenin diger bir yöntemide bu sekilde
module.exports = {
    test1: function () {
        console.log("test1 çalıştı.");
    },
    test2: function () {
        console.log("test2 çalıştı.");
    },
    test3: function () {
        console.log("test3 çalıştı.");
    },
    variable: "new-value",//string veriyide export edebilirim 
};

/* ------------------------------------------------------- */
