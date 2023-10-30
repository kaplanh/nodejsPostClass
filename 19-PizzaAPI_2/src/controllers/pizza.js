"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Pizza Controller:

const Pizza = require("../models/pizza");

module.exports = {
    list: async (req, res) => {
        /*
            #swagger.tags = ["Pizzas"]
            #swagger.summary = "List Pizzas"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        const data = await res.getModelList(Pizza);

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Pizza),
            data,
        });
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Pizzas"]
            #swagger.summary = "Create Pizza"
        */

        const data = await Pizza.create(req.body); //dB ye kaydedip db deki halini data ya atar

        res.status(201).send({
            error: false,
            data,
        });
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Pizzas"]
            #swagger.summary = "Get Single Pizza"
        */

        const data = await Pizza.findOne({ _id: req.params.id });

        res.status(200).send({
            error: false,
            data,
        });
    },
    update: async (req, res) => {
        /*
            #swagger.tags = ["Pizzas"]
            #swagger.summary = "Update Pizza"
        */

        //* findByIdAndUpdate  metodu ile güncellersek ve 3.parametre olarakta { new: true } eklersek DB den güncellenmis halini döndürür
        // const data = await Pizza.findByIdAndUpdate(req.params.userId, req.body, { new: true }) // return new-data

        // const data = await Pizza.updateOne({ _id: req.params.userId }, req.body)
        const data = await Pizza.updateOne(
            { _id: req.params.userId },
            req.body,
            { runValidators: true }
        );

        //update otomatik validation u calistirmiyor *{ runValidators: true } bunu 3.parametre olarak eklersek update yaparkende validate ettirmis oluyoruz

        res.status(202).send({
            error: false,
            body: req.body,
            result: data, // update infos
            newData: await Pizza.findOne({ _id: req.params.userId }),
        });
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Pizzas"]
            #swagger.summary = "Delete Pizza"
        */

        const data = await Pizza.deleteOne({ _id: req.params.id });

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data,
        });
        console.log(data.deletedCount);
    },
};
