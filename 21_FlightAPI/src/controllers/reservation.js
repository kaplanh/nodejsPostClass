"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Reservation Controller:

const Passenger = require("../models/passenger");
const Reservation = require("../models/reservation");

module.exports = {
    list: async (req, res) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "List Reservations"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        const data = await res.getModelList(Reservation, {}, "passengers");

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Reservation),
            data,
        });
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Create Reservation"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "flightId": "...Flight.objectId...",
                    "passengers": [
                        "...Passenger.objectId...",
                        {
                            "firstName": "string",
                            "lastName": "string",
                            "email": "string:email",
                        }
                    ]
                }
            }
        */
        // * her reservationda bu reservation u kimin yaptigini bilmek istegimizden  reservation olusurken  createdId ile bunu saglamak icin ya burda controllerda eklemeliyim yada bizim yaptigimiz gibi authenticationda eklemeliyiz orada ekledigimiz icin burayi yoruma aldik

        // req.body.createdId = req.user._id

        // *biz passenger bilgilerini buraya hem passenger tablosuna daha önceden kayit olmuslardan passenger._id den hemde yeni kayit olanlari{ "firstName": "string", "lastName": "string", "email": "string:email", }  seklinde obje formatinda alabiliriz bunu saglamak icin bazi düzenlemeler yapmamiz gerekiyor

        // ?1.yol

        /* Check ID or OBJECT for passengers *

        let passengersInfos = req.body?.passengers || [],//* body den gelen passengers bilgilerini toplayacagimiz bir array
            passengerIds = [],//*passengers id lerini tutmak icin bir array
            passenger = {};

        for (let passengerInfo of passengersInfos) {

            if (typeof passengerInfo == "object") {//*gelen passenger verileri daha önce kayitli degilse ise yani object formatinda ise  
                // passengerInfo = Object:

                // Yolcu mevcut mu?
                passenger = await Passenger.findOne({ email: passengerInfo.email })//*buraya cagirdigimiz Passenger modeli ile email üzerinden db de kayitli olup olmadigini sorguladik

                if (passenger) {//*db de böyle bir passenger varsa 
                    // Mevcut ise ID'sini kabul et:
                    passengerIds.push(passenger._id)//*bu passenger in id sini passengerIds array ine push ladik

                } else {//*db de böyle bir passenger yoksa 
                 // Gelen veriye createdId Ekle:
                   
                    Object.assign(passengerInfo, { createdId: req.body.createdId })//*bir objeye bir key:value cifti eklemnin metodu object.assign() ile 
                    //  passengerInfo = { ...passengerInfo, createdId: req.body.createdId }yukaridakinin alternatifi destructiring yöntemi ile bus ekildede passengerInfo icine createdId ekledik

                    // Mevcut değilse yeni yolcu oluştur:
                    passenger = await Passenger.create(passengerInfo)//*gelen verilerle yeni bir passenger olustur
                    // ve ID'sini kabul et:
                    passengerIds.push(passenger._id)//*olusan passenger in id sini passengerIds array ine pushla
                }

            } else {//*gelen passenger verileri daha önce kayitli ise yani id formatinda ise 
                // passengerInfo = ID:

                // Yolcu mevcut mu?
                passenger = await Passenger.findOne({ _id: passengerInfo })//*buraya cagirdigimiz Passenger modeli ile id üzerinden db de kayitli olup olmadigini sorguladik
                // Mevcut ise ID'sini kabul et:
                if (passenger) passengerIds.push(passenger._id)//*db de böyle bir passenger varsa bu passenger in id sini passengerIds array ine push ladik
            }
        }
        /* Check ID or OBJECT for passengers */

        // ?2.yol

        /* Check ID or OBJECT for passengers */

        let passengerInfos = req.body?.passengers || [],
            passengerIds = [],
            passenger = false;

        for (let passengerInfo of passengerInfos) {
            Object.assign(passengerInfo, { createdId: req.user?._id });

            if (typeof passengerInfo == "object") {
                passenger = await Passenger.findOne({
                    email: passengerInfo.email,
                });
                if (!passenger)
                    passenger = await Passenger.create(passengerInfo);
            } else {
                passenger = await Passenger.findOne({ _id: passengerInfo });
            }

            if (passenger) passengerIds.push(passenger._id);
        }

        /* Check ID or OBJECT for passengers */

        // Doğrulanmış ID'leri passengers'a aktar:
        req.body.passengers = passengerIds; //*Doğrulanmış ID'leri passengers'a aktardik

        const data = await Reservation.create(req.body);

        res.status(201).send({
            error: false,
            data,
        });
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Get Single Reservation"
        */

        const data = await Reservation.findOne({ _id: req.params.id });

        res.status(200).send({
            error: false,
            data,
        });
    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Update Reservation"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: { $ref: '#/definitions/Reservation' }
            }
        */

        const data = await Reservation.updateOne(
            { _id: req.params.id },
            req.body,
            { runValidators: true }
        );

        res.status(202).send({
            error: false,
            data,
            new: await Reservation.findOne({ _id: req.params.id }),
        });
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Delete Reservation"
        */

        const data = await Reservation.deleteOne({ _id: req.params.id });

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data,
        });
    },

    //*biz passengers lari tablodan cekmeyip hem id hem de obje seklinde ekleyebilelim dedigimiz icin ref ve objectid yi kullanmadik o nedenle burda passenger bilgilerini görmek icin yeni bir url controlleri yazmak durumunda kaldik

    passengers: async (req, res) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "List Passengers of Reservation"
        */

        const data = await Reservation.findOne({ _id: req.params.id });
        // console.log(data.passengers)
        const passengers = await Passenger.find({
            _id: { $in: data.passengers },//*id lerine göre data.passengers array-yolcu listesinin icindeki tüm id ler icindeki verileri getir
        });

        res.status(200).send({
            error: false,
            // data,
            passengers,
        });
    },
};
