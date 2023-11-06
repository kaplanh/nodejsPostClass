"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- *
{
    "username": "test",
    "password": "1234",
    "email": "abc@site.com",
    "isAdmin": "true"
  }
/* ------------------------------------------------------- */
// User Model:

const passwordEncrypt = require("../helpers/passwordEncrypt");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            trim: true,
            required: true,
            set: (password) => passwordEncrypt(password), //gelen passwordü sifrele öyle kaydet
        },

        email: {
            type: String,
            trim: true,
            required: [true, "Email field must be required"], //yazildi ise true yazilmadi ise hata meajini bas
            unique: [true, "There is this email. Email field must be unique"],
            validate: [
                (email) => email.includes("@") && email.includes("."),
                "Email type is not correct.", //fonksiyonun sonucu dogru degilse zani g;nderdigin email|in icinde  ve . yoksa "Email type is not correct." mesajini ver
            ],
        },
        //isActive ile kullaniciyi silmeden sisteme girmesini engelleyebilirim
        isActive: {
            type: Boolean,
            default: true,
        },

        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        collection: "users",
        timestamps: true,
    }
);

/* ------------------------------------------------------- */
module.exports = mongoose.model("User", UserSchema);
