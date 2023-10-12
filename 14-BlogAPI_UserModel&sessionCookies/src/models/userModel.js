"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const mongoose = require("mongoose");
const passwordEncrypt = require("../helpers/passwordEncrypt");

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            trim: true,
            unique: true,
            required: [true, "Email field must be required."], //girilmezse bu  hata msj yayinlanacak
            validate: [
                (email) => email.includes("@") && email.includes("."), // ValidationCheck /eger bu sart true sonuc verirse kabul edecek false gelirse message yayinlayacak
                "Email type is incorrect.", // If false Message.
            ],
            // *tam bir e-mail format kontrolü icin
            // validate: [
            //     (email) => {
            //         const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            //         return regex.test(email);
            //     },
            //     "Please fill a valid email address",
            // ],
        },

        password: {
            type: String,
            trim: true,
            required: true,
            //DB lere password direk yazilmaz sifreleyerek yazmak zorundayiz
            // set:(password)=>password+'*987' password='ali' olursaseklinde yazarsak DB ye ali*987 seklinde kaydedilir bunun yerine bir fonksiyon kullanarak yapacagiz
            set: (password) => passwordEncrypt(password), // passwordü sifreleme fonksiyonu
            // bu fonksiyonu helper icinde passwordEncrypt.js dosyasi icinde cagirip düzenledim ve buraya sayfanin basinda const passwordEncrypt = require("../helpers/passwordEncrypt"); ilecagirdim
            // not:bu fonksiyonun görevi benim ona gönderdigim datayi (burda password ) sifreleyip bana geri göndermek
        },

        firstName: String,

        lastName: String,
    },
    {
        collection: "users",
        timestamps: true,
    }
);

module.exports = mongoose.model("User", UserSchema);
