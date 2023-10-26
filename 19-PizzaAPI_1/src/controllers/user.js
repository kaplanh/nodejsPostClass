"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// User Controller:

const User = require("../models/user");

module.exports = {
    list: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        const data = await res.getModelList(User);

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(User),
            data,
        });
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
        */

        const data = await User.create(req.body);

        res.status(201).send({
            error: false,
            data,
        });
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Get Single User"
        */

        const data = await User.findOne({ _id: req.params.id });

        res.status(200).send({
            error: false,
            data,
        });
    },
    update: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Update User"
        */

        //* findByIdAndUpdate  metodu ile güncellersek ve 3.parametre olarakta { new: true } eklersek DB den güncellenmis halini döndürür
        // const data = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true }) // return new-data

        // const data = await User.updateOne({ _id: req.params.userId }, req.body)
        const data = await User.updateOne(
            { _id: req.params.userId },
            req.body,
            { runValidators: true }
        );

        //update otomatik validation u calistirmiyor *{ runValidators: true } bunu 3.parametre olarak eklersek update yaparkende validate ettirmis oluyoruz

        res.status(202).send({
            error: false,
            body: req.body,
            result: data, // update infos
            newData: await User.findOne({ _id: req.params.userId }),
        });
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Delete User"
        */

        const data = await User.deleteOne({ _id: req.params.id });

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data,
        });
    },
};
