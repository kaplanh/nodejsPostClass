"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Reservation Controller:

const Reservation = require('../models/reservation')

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

        // Filters:
        let filters = {}
        // Only self records. except admin:
        if (!req?.user.isAdmin) filters.userId = req.user._id//adminse tümünü listeleyebilirken admin olmayan sadece kendi kayitlarini görmesi icin

        const data = await res.getModelList(Reservation, filters, ['userId', 'carId'])//user ve car in sadece id leri degilde o id deki alt bilgileride görmek icin 

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Reservation, filters),
            data
        })
    },

    // CRUD:

    create: async (req, res) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Create Reservation"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                }
            }
        */

        // get userId from loginedUser.
        req.body.userId = req?.user._id;//reservation create ederken userId yi otomatik olarak  alsin

        // Check new reservations date in exists reservations:

        
        const userReservationInDates = await Reservation.findOne({
            userId: req.body.userId,
            $nor: [
                { startDate: { $gt: req.body.endDate } },
                { endDate: { $lt: req.body.startDate } }
            ]
        })

        if (userReservationInDates) {
            // ayni tarihlerde bir reservation varsa kullanici yeni reservation yapamasin yoksa yapsin demek icin

            res.errorStatusCode = 400;
            throw new Error(
                "It cannot be added because there is another reservation with the same date.",
                { cause: { userReservationInDates: userReservationInDates } }
            );
        } else {
            
            const data = await Reservation.create(req.body)

            res.status(201).send({
                error: false,
                data
            })
        }
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Get Single Reservation"
        */

        // Filters:
        let filters = {};
        // Only self records. except admin:
        if (!req?.user.isAdmin) filters.userId = req.user._id; //adminse herkesi özel olarak bilgilerine bakabilecekken  admin olmayan sadece kendi bilgilerini görmesi icin

        const data = await Reservation.findOne({
            _id: req.params.id,
            ...filters,
        }).populate(["userId", "carId"]); //user ve car in sadece id leri degilde o id deki alt bilgileride görmek icin

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
                schema: {
                }
            }
        */

        const data = await Reservation.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(200).send({
            error: false,
            data,
            new: await Reservation.findOne({ _id: req.params.id })
        })
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Delete Reservation"
        */

        const data = await Reservation.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })

    }

}