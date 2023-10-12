"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
// Password Encrypt:
// https://nodejs.org/api/crypto.html#cryptopbkdf2syncpassword-salt-iterations-keylen-digest
// ?1-//crypto u required ettik
const crypto = require("node:crypto");
// node: crypto; //:crypto nun nodejs de builtin fonk old gösterir
// ?2-uygulamama özel güvenlik anahtarini SECRET_KEY olarak .env ye yazip buraya cagiriyoruz
const keyCode = process.env.SECRET_KEY || "write_random_chars_to_here";
// ?3-kac defa sifrelemesini istiyorsak onu yaziyoruz
const loopCount = 10_000; //_ sayilari gruplandirmaya yariyor daha iyi okunurluk sagliyor
// ?4-sifrelendikten sonraki ciktinin karakter sayisini belirliyoruz
const charsCount = 32; // write 32 for 64-64 for 128 verecegi karakter sayisi buffer type her iki veriyi bir saydigindan olabilir
// ?5-sifreleme türünü belirliyoruz sha256 or sha512
const encType = "sha512";
// ?6-bu fonksiyonu export ediyoruz

NOT:biz bu degerleri .env de yazipda burayada cagirabiliriz
module.exports = function (password) {
    // crypto.pbkdf2//bunu kullanirsan  görevi ayni unutma async fonk
    const encode = crypto.pbkdf2Sync(
        password,
        keyCode,
        loopCount,
        charsCount,
        encType
    ); //crypto.pbkdf2Sync modulünün icindeki pbkdf2Sync kullanarak sifreliyoruz
    // return  cikti BufferType tipinde
    return encode.toString("hex"); //encode verisini toString yap ve hexadecimal olarak ver
};

// bu fonksiyonun görevi benim ona gönderdigim datayi (burda password ) sifreleyip  geri göndermek
