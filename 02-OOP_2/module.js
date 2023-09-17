"use strict";

/* -------------------------------------------------------
    MODULES
------------------------------------------------------- *
//? Başka bir JS dosyasını içe aktarma:
// js de NodeJS de baska bir dosyayi ice aktarma komutu require() dir .
// parantez icinde string icinde doyanin yolunu yaziyorum

// require('./module/index.js')
// require('./module/index')//.js 'i yazmak zorunda degiliz
require('./module/')//default index.js oldugu icin index.js i yazmasamda onu alir

/* ------------------------------------------------------- *
//? Başka bir JS dosyasını icindeki fonksiyonu buraya cagirip kullanabilmek icin
// burada fonksiyonu const test = require('./module/') seklinde cagirip test() yazinca
// gidip o dosyadaki fonksiyonu calistirip gelecek
// tabiki bunun icin cagirdigim dosyada yani suan module/index.js deki  fonksiyon module.exports = test seklinde export edilmis olmasi lazim 


// Import:
const test = require('./module/')
test()

/* ------------------------------------------------------- *
// module de tekbir fonksiyon module.expors edilmisse varsa  asagidaki gibi import edilebilir
// Shorthand for singleFunction:
require('./module/')()

/* ------------------------------------------------------- */
//* birden fazla veriyi import etmenin yöntemleri
// 1-arrayla module.exports yapildiysa array ile import etmme

const [test1, test2, test3] = require("./module/");
test1(), test2(), test3();

// 2-object module.exports yapildiysa object ile import etmme

const { test1, test2, test3 } = require("./module/");
test1(), test2(), test3();

//require ederken isimde degistirebiliriz test1:newFunc gibi
const { test1: newFunc, test2, test3, variable } = require("./module/");
newFunc(), test2(), test3(), console.log(variable);

/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
