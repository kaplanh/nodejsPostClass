"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Pizza Controller:

const Pizza = require("../models/pizza");

module.exports = {
    list: async (req, res) => {
        const data = await res.getModelList(Pizza);

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Pizza),
            data,
        });
    },

    create: async (req, res) => {
        const data = await Pizza.create(req.body);

        res.status(201).send({
            error: false,
            data,
        });
    },

    read: async (req, res) => {
        const data = await Pizza.findOne({ _id: req.params.id });

        res.status(200).send({
            error: false,
            data,
        });
    },

    update: async (req, res) => {
        const data = await Pizza.updateOne({ _id: req.params.id }, req.body, {
            runValidators: true,
        });

        res.status(202).send({
            error: false,
            data,
            new: await Pizza.findOne({ _id: req.params.id }),
        });
    },

    delete: async (req, res) => {
        const data = await Pizza.deleteOne({ _id: req.params.id });
        console.log(data);

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
        });
    },
};
