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
// Pizza Model:

const passwordEncrypt = require("../helpers/passwordEncrypt");

const PizzaSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },

        image: {
            type: String,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
        
        },

        toppings: [
            {
                //push, push
                type: mongoose.Schema.Types.ObjectId,
                ref: "Topping",
            },
        ],
        // toppings: {
        //     type: [String],
        //     enum: ["sucuk","sosis","salam"],
        // },
    },
    {
        collection: "pizzas",
        timestamps: true,
    }
);

/* ------------------------------------------------------- */
module.exports = mongoose.model("Pizza", PizzaSchema);
