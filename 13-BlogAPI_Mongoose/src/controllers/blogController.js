"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
// hem mogoDB komutllarini hemde mongoose komutlarini kullanabiliriz
// mongoose komutlari icin ==> https://mongoosejs.com/docs/queries.html

// Catch async-errors and send to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */
// module.exports = {
//     key1: 'value',
//     key2:'value'
// }
//* üstteki ile alttaki ayni sey sadece yazimi farkli her ikisinide kullanabiliriz
// module.exports.key1 = 'value'
// module.exports.key2 = 'value'

//? 1-Modellerimi buraya cagiriyorum
// Call Models:
const { BlogCategory, BlogPost } = require("../models/blogModel");

// ------------------------------------------
// BlogCategory
// ------------------------------------------
//? 2-Crud islemlerinin fonksiyonlarini yaziyorum
module.exports.BlogCategory = {
    list: async (req, res) => {
        const data = await BlogCategory.find();

        res.status(200).send({
            error: false,
            count: data.length, //toplam kayit sayisi
            result: data,
        });
    },

    create: async (req, res) => {
        const data = await BlogCategory.create(req.body);

        res.status(201).send({
            error: false,
            body: req.body,
            result: data,
        });
    },

    read: async (req, res) => {
        // req.params.categoryId
        // mongoose un kodu findById ilede tek veri getirebiliriz
        // const data = await BlogCategory.findById(req.params.categoryId)
        const data = await BlogCategory.findOne({ _id: req.params.categoryId });

        res.status(200).send({
            error: false,
            result: data,
        });
    },

    update: async (req, res) => {
        // const data = await BlogCategory.findByIdAndUpdate(req.params.categoryId, req.body, { new: true }) // return new-data
        const data = await BlogCategory.updateOne(
            { _id: req.params.categoryId },
            req.body
        );

        res.status(202).send({
            error: false,
            body: req.body,
            result: data, // update infos
            newData: await BlogCategory.findOne({ _id: req.params.categoryId }), //günceledikten sonra ki kayitli data
        });
    },

    delete: async (req, res) => {
        const data = await BlogCategory.deleteOne({
            _id: req.params.categoryId,
        });

        res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
    },
};

// ------------------------------------------
// BlogPost
// ------------------------------------------
module.exports.BlogPost = {
    list: async (req, res) => {
        const data = await BlogPost.find().populate("blogCategoryId"); // get Primary Data

        res.status(200).send({
            error: false,
            count: data.length,
            result: data,
        });
    },

    listCategoryPosts: async (req, res) => {
        const data = await BlogPost.find({
            blogCategoryId: req.params.categoryId,
        }).populate("blogCategoryId");

        res.status(200).send({
            error: false,
            count: data.length,
            result: data,
        });
    },

    // CRUD ->

    create: async (req, res) => {
        // const data = await BlogPost.create({
        //     fieldName: 'value',
        //     fieldName: 'value',
        //     fieldName: 'value',
        // })
        const data = await BlogPost.create(req.body);

        res.status(201).send({
            error: false,
            body: req.body,
            result: data,
        });
    },

    read: async (req, res) => {
        // req.params.postId
        // const data = await BlogPost.findById(req.params.postId)
        const data = await BlogPost.findOne({
            _id: req.params.postId,
        }).populate("blogCategoryId"); // get Primary Data

        res.status(200).send({
            error: false,
            result: data,
        });
    },

    update: async (req, res) => {
        // const data = await BlogPost.findByIdAndUpdate(req.params.postId, req.body, { new: true }) // return new-data
        const data = await BlogPost.updateOne(
            { _id: req.params.postId },
            req.body
        );

        res.status(202).send({
            error: false,
            body: req.body,
            result: data, // update infos
            newData: await BlogPost.findOne({ _id: req.params.postId }),
        });
    },

    delete: async (req, res) => {
        const data = await BlogPost.deleteOne({ _id: req.params.postId });

        res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
    },
};
