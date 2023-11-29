

"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- *
{
    "username": "admin",
    "password": "aA*123456",
    "email": "admin@site.com",
    "firstName": "admin",
    "lastName": "admin",
    "isActive": true,
    "isAdmin": true
}
{
    "username": "test",
    "password": "aA*123456",
    "email": "test@site.com",
    "firstName": "test",
    "lastName": "test",
    "isActive": true,
    "isAdmin": false
}
/* ------------------------------------------------------- */
// User Model:

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    password: {
        type: String,
        trim: true,
        required: true,
    },

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    emailVerified: {
        type: Boolean,
        default: false
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

    isActive: {
        type: Boolean,
        default: true,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },

}, { collection: 'users', timestamps: true })

/* ------------------------------------------------------- */
// Schema Configs:

const passwordEncrypt = require('../helpers/passwordEncrypt')


// *kaydetmeden önce bu fonksiyonu calistir diyoruz burdaki fonksiyon arrow fonksiyon olamaz cünkü arrow fonksiyonda this global scobe a isaret ediyor
// *NOT:pre('init') middleware degil fakat  pre('save') bir middleware o nedenlede next kavrami var asgidada görüldügü üzere

// save: Only Create
UserSchema.pre(['save', 'updateOne'], function(next) {

    // get data from "this" when create;
    // if process is updateOne, data will receive in "this._update"
    const data = this?._update || this

    // *regex kodu asagidaki gibide yazilabilir fakat burda / yerine // yazmamiz gerekiyor
    // const emailRegExp = new RegExp("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$")
    // const isEmailValidated = emailRegExp.test(data.email)
    // const isEmailValidated = RegExp("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$").test(data.email)
    const isEmailValidated = data.email
        ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email) // test from "data".
        : true    
    https://regexr.com/ regx kodunun dogrulugunu test etmek icin

    if (isEmailValidated) {//*kullanicinin girdigi email regex den gecti ise

        if (data?.password) {
            

            const isPasswordValidated =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&].{8,}$/.test(
                    data.password
                );

            if (isPasswordValidated) {
                ////*kullanicinin girdigi password regex den gecti ise
                this.password = data.password = passwordEncrypt(data.password);//*paswordümü sifrele ondan sonra db ye kaydet
                this._update = data; // updateOne will wait data from "this._update".
            } else {
                next(new Error("Password not validated.")); //*kullanicinin girdigi password regex den gecmedi ise next() icinde hata gönder
            }
        }

        next() // Allow to save.

    } else {
        
        next( new Error('Email not validated.') )//*kullanicinin girdigi email regex den gecmedi ise
    }
})

/* ------------------------------------------------------- */
module.exports = mongoose.model('User', UserSchema)