"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- *
{
    "username": "test",
    "password": "1234",
    "email": "test@site.com",
    "isActive": true,
    "isStaff": false,
    "isAdmin": false,
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
            select: false, //select default olarak true dur flase cekersek find() veya findOne() yaptigimizda password bilgisi gelmeyecektir
            // ama passwordün gerekli oldugu yerde findOne({username,password},{password:1}) yazarak select:false ragmen passwordün gelmesini saglayabiliriz
            set: (password) => passwordEncrypt(password), //set metodu veri tabanina kaydedilmeden önce gelen veriyi ilgili fonksiyondan geciriyor sonra kaydediyor
        },

        email: {
            type: String,
            trim: true,
            required: [true, "Email field must be required"],
            unique: [true, "There is this email. Email field must be unique"],

            validate: [
                (email) => {
                    const emailRegexCheck =
                        /^[a-zA-Z0-9._%?+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    return (
                        emailRegexCheck.test(email),
                        "Email type is not correct."
                    );
                },
            ],
            //yazdigimiz kodun dogru calisip calismadigini bu siteden check edebilirsin ==> https://regexr.com/

            //altaki sekildede yazabiliriz
            //test(email) ile true false döndüren bir regex test metodu ilke gelen emailin regex koda uygun mu degilmi onu kontrol eder 
            // validate: [
            //     (email) =>
            //         /^[a-zA-Z0-9._%?+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
            //             email
            //         ),
            //     "Email type is not correct.",
            // ],
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        isStaff: {
            type: Boolean,
            default: false,
        },

        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { collection: "users", timestamps: true }
);

/* ------------------------------------------------------- */
module.exports = mongoose.model("User", UserSchema);
