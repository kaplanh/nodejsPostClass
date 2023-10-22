"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */
const passwordEncrypt = require("../helpers/passwordEncrypt");

const PersonnelSchema = new mongoose.Schema(
    {
        //iliski kurdugum üst tablonun primary key ini buraya tasiyorum
        departmentId: {
            type: mongoose.Schema.Types.ObjectId, //mongoose özel type
            ref: "Department", //iliski kuracagim Model
            required: true,
        },

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
            set: (password) => passwordEncrypt(password), //password ü direk degil sifreleyerek DB ye kaydettmek helper/passwordEncrypt.js de yazip buraya cagirdigimiz passwordEncrypt fonksiyonundan gecirdik
        },

        firstName: {
            type: String,
            trim: true,
            required: true,
        },

        lastName: {
            type: String,
            trim: true,
            required: true,
        },

        phone: {
            type: String,
            trim: true,
            
        },

        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            validate: (email) => email.includes("@") && email.includes("."),
        },

        title: {
            //genel müd mü degilmi?
            type: String,
            trim: true,
            required: true,
        },

        salary: {
            type: Number,
            default: 0,
        },

        description: {
            type: String,
            trim: true,
            default: null,
        },
        //kullanici aktif mi sistemi kullanmaya yetkisi var mi 
        //isten cikmis mi, calisiyor mu? eger cikmissa sisteme giris yapamaz kendi kaydini güncelleyebilir ve digerlerininkini göremez
        isActive: {
            type: Boolean,
            default: true,
        },
        //genel müdür mü eger öyleyse her tarafa ulasabilir bütün kayitlara erisebilir güncelleyebilir,silebilir personel ekleyebilir,cikarabilir

        isAdmin: {
            type: Boolean,
            default: false,
        },
        // bir departmanin lideri mi eger öyleyse kendi departmanindaki personelleri güncelleyebilir,silebilir diger departmandakilerin verilerini sdc görüntüleyebilirim

        isLead: {
            type: Boolean,
            default: false,
        },

        startedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { collection: "personnels", timestamps: true }
);

/* ------------------------------------------------------- */
module.exports = mongoose.model("Personnel", PersonnelSchema);
