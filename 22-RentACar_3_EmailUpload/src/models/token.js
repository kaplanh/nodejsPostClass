"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- *
{
  "userId": "65343222b67e9681f937f001",
  "token": "...tokenKey..."
}
/* ------------------------------------------------------- */
// Token Model:

const TokenSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        token: {
            type: String,
            trim: true,
            required: true,
            index: true, //arama yaparken hizli gelsin diye index:true yaziyoruz
        },
    },
    { collection: "tokens", timestamps: true }
);

/* ------------------------------------------------------- */
module.exports = mongoose.model('Token', TokenSchema)

// admine manuel yönetme kolayligi vermek istersek admin icin tokencontroler ve tokenrouter yazabiliriz aksi takdirde controller ve router a ihtiyac olmayabilir

