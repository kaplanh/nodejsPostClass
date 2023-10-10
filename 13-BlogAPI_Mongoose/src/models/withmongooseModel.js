"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
// ?1-mongoose da model olusturmak icin önce mongoose i buraya cagiriyoruz
const mongoose = require("mongoose");

// ?2 - new mongoose.Schema({},{}) ile semamizi olusturuyoruz birinci parametre model i tanimladigim obje 2.parametre collection-tablo ayarlari
// (sequelize da bu sequelize.define() di orda 1.parametre tablo ismi 2.parametre model ayarlari idi)
//  biz sema olusturuyoruz mongodb onu arkada model e ceviriyor gibi düsünebiliriz
const nameSchema = new mongoose.Schema(
    {
        // _id: // AUTO CREATED mongodb de id:_id seklinde tanimlanir _:yazilimda buna dokunma demektir
        // fieldName: String // Shorthand Using
        fieldName: {
            type: String, // Veri tipi
            defualt: null, // Default bir değer atayabiliriz.
            trim: true, // Gelen veriyi trim'den geçir: trim(data)
            select: true, // Data çağrıldığında gelsin mi?
            index: false, // Daha hızlı erişim olsun mu?veri tabani index gördügü veriyi ram de saklar o nedenle hiz
            unique: false, // Benzersiz kayıt olsun mu?
            // required:true, // JSON data içinde gelmesi zorunlu mu?
            required: [true, "Error-Message"], // JSON data içinde gelmesi zorunlu mu? 2.parametre veri gelmediginde yayinlanacak mesaj
            enum: [[0, 1, 2, 3], "Error-Message"], // Pattern/Constraint/Limit/Choices sdc bu 4 deger gelebilir baska veri gelemez
            validate: [
                function (data) {
                    return true;
                },
                "Error-Message",
            ], // Veriyi filtreden geçiren fonksiyon.

            get: function (data) {
                return data;
            }, // Veri çağırırken çalıştırılacak fonksiyon

            set: function (data) {
                return data;
            }, // Veri kaydederken çalıştırılacak fonksiyon
        },
    },
    {
        collection: "collectionName", // Tablo ismi ne olsun?
        timestamps: true, // Create and Manage 'createdAt' and 'updatedAt' otomatik tarih atama olsunmu olmasin mi
    }
);
// NOT: modelname PascalCase olmali

// ?3-olusturdugum semayi model e cevir ve export et
// ------------------------------------------
// Export
// ------------------------------------------
module.exports = {
    CollectionName: mongoose.model("collectionName", collectionName),
};

//******************************************************************************* */

// *NOTdaha kisa olmasi icin su sekildde yazabiliriz

module.exports = {
    CollectionName: mongoose.model(
        "collectionName",
        new mongoose.Schema(
            {
                // _id: // AUTO CREATED mongodb de id:_id seklinde tanimlanir _:yazilimda buna dokunma demektir
                // fieldName: String // Shorthand Using
                fieldName: {
                    type: String, // Veri tipi
                    defualt: null, // Default bir değer atayabiliriz.
                    trim: true, // Gelen veriyi trim'den geçir: trim(data)
                    select: true, // Data çağrıldığında gelsin mi?
                    index: false, // Daha hızlı erişim olsun mu?veri tabani index gördügü veriyi ram de saklar o nedenle hiz
                    unique: false, // Benzersiz kayıt olsun mu?
                    // required:true, // JSON data içinde gelmesi zorunlu mu?
                    required: [true, "Error-Message"], // JSON data içinde gelmesi zorunlu mu? 2.parametre veri gelmediginde yayinlanacak mesaj
                    enum: [[0, 1, 2, 3], "Error-Message"], // Pattern/Constraint/Limit/Choices sdc bu 4 deger gelebilir baska veri gelemez
                    validate: [
                        function (data) {
                            return true;
                        },
                        "Error-Message",
                    ], // Veriyi filtreden geçiren fonksiyon.

                    get: function (data) {
                        return data;
                    }, // Veri çağırırken çalıştırılacak fonksiyon

                    set: function (data) {
                        return data;
                    }, // Veri kaydederken çalıştırılacak fonksiyon
                },
            },
            {
                collection: "collectionName", // Tablo ismi ne olsun?
                timestamps: true, // Create and Manage 'createdAt' and 'updatedAt' otomatik tarih atama olsunmu olmasin mi
            }
        )
    ),
};
//******************************************************************************* */
