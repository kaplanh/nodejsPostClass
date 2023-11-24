"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- *
{
    "userId": "652d71b9c31f8eecbf12519b",
    "pizzaId": "652d71bfc31f8eecbf12519f",
    "size": "Small",
    "quantity": 2,
    "price": 99.99
}
/* ------------------------------------------------------- */
// Order Model:

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            //users tablosundaki bir userin- kullanicinin id
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true, // unique:true //yaparsak one to one iliski olur ama burda many to one iliski oldugu icin yazmiyoruz yani tek bir kisi tekbir order-siparis verebilirdi ama simdi bir kisi birden fazla siparis verilebilir
        },

        pizzaId: {
            type: mongoose.Schema.Types.ObjectId, //ERD de bigint
            ref: "Pizza",
            required: true,
        },

        size: {
            type: String,
            required: true,
            enum: ["Small", "Medium", "Large", "XLarge"], //bu degerlerden birini secmesi gerekir.bu degerler disinda baska deger girilemez
        },

        quantity: {
            type: Number, //ERD deki int
            required: true,
            default: 1,
        },

        price: {
            type: Number,//ERD deki decimal
            required: true,
            default: 0,
        },

        totalPrice: {
            type: Number,
        },
    },
    {
        collection: "orders",
        timestamps: true,
    }
);

/* ------------------------------------------------------- */
module.exports = mongoose.model('Order', OrderSchema)