"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- *
{
  "userId": "652d7681508462fafafa01a2",
  "pizzaId": "652d76c5508462fafafa01b0",
  "size": "Small",
  "quantity": 1,
  "price": 99.99
}
------------------------------------------------------- */
// Order Controller:

const Pizza = require("../models/pizza");
const Order = require("../models/order");

module.exports = {
    list: async (req, res) => {
        /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "List Orders"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        // const data = await res.getModelList(Order, {}, ['userId', 'pizzaId'])//*order icnde userId ve pizzaId lerin sdc id leri degilde id lerin detaylari görmek icin populate e argüman göndermem lazim hem userID i hemde pizzaId ayni anda populate yapmak icin burdan fonksiyona bir argüman göndermeliyim o nedenle 1 array icinde iki deger göndererek her ikisinide detayli görmüs olurum  ['userId', 'pizzaId']
        const data = await res.getModelList(Order, {}, [
            "userId",
            { path: "pizzaId", populate: "toppings" }, //*order icinde hem userId nin detaylarini hemde  pizzaId ve onun icndeki toppings lerin detaylarini görmek icin bu kodu yazdik populate icinde populate yapmis olduk orderdaki pizzayi ve pizzanin icindeki toppings i
        ]);

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Order),
            data,
        });
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "Create Order"
        */

        // Calculatings:
        req.body.quantity = req.body?.quantity || 1; //body den quantity gelmezse modeldeki  default: 1  calismadi onu asmak icin bunu kullandik
        if (!req.body?.price) {//kullanici price bilgisi girmezse(indrm vs den dolayi girebilir) price bilgisi pizza tablosundan gelecek
            const dataPizza = await Pizza.findOne(
                //biz baska bir modeldeki default degerden yeni bir deger hesaplayacaksak öncelikle o modeli bu kontrole require ediyoruz ardindan ModelName.find({ _id: req.body.pizzaId }) ile db den default verileri alip burdaki diger modeldeki degere atiyoruz
                { _id: req.body.pizzaId },
                { _id: 0, price: 1 }
            );
            req.body.price = dataPizza.price;
        }
        req.body.totalPrice = req.body.price * req.body.quantity;

        const data = await Order.create(req.body);

        res.status(201).send({
            error: false,
            data,
        });
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "Get Single Order"
        */

        const data = await Order.findOne({ _id: req.params.id }).populate([
            "userId",
            { path: "pizzaId", populate: "toppings" },
        ]);

        res.status(200).send({
            error: false,
            data,
        });
    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "Update Order"
        */

        // Calculatings:
        req.body.quantity = req.body?.quantity || 1; // default: 1
        if (!req.body?.price) {
            const dataOrder = await Order.findOne(
                { _id: req.params.id },
                { _id: 0, price: 1 } //mongodb de find() ve findOne() da 1.parametre filtre 2.parametre sdc istedigimiz sütunlari getir dedigimiz parametredir _id:default olarak true dur o nedenle gelir gelmesin istersek _id:false yada _:0 yazmamiz gerekir { _id: 0, price: 1 } bu sekilde yazarsak _id gelmeyecek price gelecektir
            );
            req.body.price = dataOrder.price;//sipariste adet sdc adet degistirmek isterse ücreti dataOrder dan cagirip güncellemeli
        }
        req.body.totalPrice = req.body.price * req.body.quantity;

        const data = await Order.updateOne({ _id: req.params.id }, req.body, {
            runValidators: true,
        });

        res.status(202).send({
            error: false,
            data,
            new: await Order.findOne({ _id: req.params.id }),
        });
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "Delete Order"
        */

        const data = await Order.deleteOne({ _id: req.params.id });

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data,
        });
    },
};
