"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- *
{
    "flightNumber": "IS-AN-001",
    "airline": "THY",
    "departure": "ISTANBUL",
    "departureDate": "2020-10-01 10:00:00",
    "arrival": "ANKARA",
    "arrivalDate": "2020-10-01 12:00:00",
    "createdId": "652ceaa1bae9cde5e8a97522"
}
{
  "flightNumber": "IS-AN-002",
  "airline": "THY",
  "departure": "ISTANBUL",
  "departureDate": "2020-10-01 23:00:00",
  "arrival": "ANTALYA",
  "arrivalDate": "2020-10-02 03:00:00",
  "createdId": "65317b1c29b1267920ddf30d"
}
/* ------------------------------------------------------- */
// Flight Model:

const FlightSchema = new mongoose.Schema(
    {
        flightNumber: {
            // IS-AN-005
            type: String,
            trim: true,
            required: true,
            unique: true,
        },

        airline: {
            type: String,
            trim: true,
            required: true,
        },

        departure: {
            type: String,
            trim: true,
            required: true,
        },
        //kalkis-depertureleri citys diye bir tabloda tutut burada sehrin ismini yazmak yerine o sehrin tablodaki id sini cekebilirdim asagidaki gibi olmasi gerekende bu normalde

        // departure: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'City',
        //     required: true
        // },

        departureDate: {
            type: Date, //body den bu sekilde göndermelisin "departureDate": "2020-10-01 10:00:00"
            required: true,
        },

        arrival: {
            type: String,
            trim: true,
            required: true,
        },
        //varis-arrival citys diye bir tabloda tutut burada sehrin ismini yazmak yerine o sehrin tablodaki id sini cekebilirdim asagidaki gibi
        // arrival: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'City',
        //     required: true
        // },

        arrivalDate: {
            type: Date, // body den bu sekilde göndermelisin  arrivalDate: "2020-10-01 12:00:00",
            required: true,
        },

        createdId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { collection: "flights", timestamps: true }
);

// Mongoose Scheme Middleware:
// https://mongoosejs.com/docs/middleware.html
// Trigger: Wnen running init:

const dateToLocaleString = require("../helpers/dateToLocaleString");

FlightSchema.pre("init", function (document) {
    // https://www.w3schools.com/jsref/jsref_tolocalestring.asp
    // document.departureDateStr = document.departureDate.toLocaleString('tr-tr', { dateStyle: 'full', timeStyle: 'medium' })
    // document.arrivalDateStr = document.arrivalDate.toLocaleString('tr-tr', { dateStyle: 'full', timeStyle: 'medium' })
    document.departureDateStr = dateToLocaleString(document.departureDate);
    document.arrivalDateStr = dateToLocaleString(document.arrivalDate);
    document.__v = undefined;
});

/* ------------------------------------------------------- */
module.exports = mongoose.model("Flight", FlightSchema);
