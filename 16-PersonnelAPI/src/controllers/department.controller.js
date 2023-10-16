"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const Department = require("../models/department.model"); //kontrol edecegimiz modeli buraya cagiriyoruz

module.exports = {
    list: async (req, res) => {
        // const data = await Department.find(search).sort(sort).skip(skip).limit(limit)
        const data = await res.getModelList(Department); //url den gelen  searc sort .. islemlerini al DB de bunlari yap ve dataya ata
        res.status(200).send({
            error: false,
            data, //data:data seklide es6 ile bu sekildede yazilabiliyor//
        });
    },
    create: async (req, res) => {
        const data = await Department.create(req.body); //req.body ile gelen veriyi DB ye kaydet ve kaydettigin bu veriyi dataya ata
        res.status(201).send({
            error: false,
            data,
        });
    },
    read: async (req, res) => {
        const data = await Department.findOne({ _id: req.params.id }); //req.params.id ilen gelen id yi _id ye ata ve bu _id li veriyi DB den bul data ya ata
        res.status(200).send({
            error: false,
            data,
        });
    },
    update: async (req, res) => {
        const data = await Department.updateOne(
            { _id: req.params.id },
            req.body
        ); //req.params.id ilen gelen id yi _id ye ata ve bu _id li veriyi DB den bul ve bu veriyi  req.body ile gelen veriler ile güncelle ve dataya ata
        // not:birden fazla veriyi ayni anda güncellemek istersek updatemany() kullanmamiy gerekecek
        res.status(200).send({
            error: false,
            data,
            new: await Department.findOne({ _id: req.params.id }), //güncellendikten sonra DB deki yeni halini new e ata
        });
    },
    delete: async (req, res) => {
        const data = await Department.deleteOne({ _id: req.params.id }); //req.params.id ilen gelen id yi _id ye ata ve bu _id li veriyi DB den sil

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data,
        });
        // data.deletedCount ? 204 : 404  uzunca asagidaki gibide sekildede yazabilirdik

        // const isDeleted = data.deletedCount >= 1 ? true : false

        // res.status(isDeleted ? 204 : 404).send({
        //     error: !isDeleted,
        //     data
        // })
    },
};
