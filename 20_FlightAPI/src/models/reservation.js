"use strict"
/* -------------------------------------------------------
	NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- *
{
	"flightId": "652cebb3bae9cde5e8a9753b",
	"passengers": [
	  "652cf408b63b905ad13d9a87",
	  "652cf408b63b905ad13d9a89",
	  {
		"firstName": "Test 11",
		"lastName": "Test 11",
		"email": "test11@site.com"
	  },
	  {
		"firstName": "Test 12",
		"lastName": "Test 12",
		"email": "test12@site.com"
	  },
	],
	"createdId": "652ceaa1bae9cde5e8a97522"
  }
/* ------------------------------------------------------- */
// Reservation Model:

const ReservationSchema = new mongoose.Schema(
    {
        // biz burda bir ucus icin sdc bir reservasion düsündük ama normalde her ucus icin birden fazla reservation olabilir

        flightId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Flight",
            required: true,
        },

        // bir reservationda birden  fazla yolcu olabilir ben reservation a passenger gönderirken 2 farkli sekilde gönderebilirim 1.si eger benim passengers tablommda-collection da kayitli olanlariki bunlari id lerini göndererek yapabilirim 2-sisteme kayitli olmayan yeni bir yolcuyu ise passenger modele uygun olacak sekilde istenen bilgileri obje icinde gönderebilirim
		passengers: [],
		//normalde asagidaki gibi passenger ler önce passenger tablosuna kaydedilir sonra ordan id ile buraya cagrilir
        // passengers: [
        // 	{
        // 		type: mongoose.Schema.Types.ObjectId,
        // 		ref: 'Passenger',
        // 		required: true,
        // 	}
        // ],

        createdId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { collection: "reservations", timestamps: true }
);

/* ------------------------------------------------------- */
module.exports = mongoose.model('Reservation', ReservationSchema)