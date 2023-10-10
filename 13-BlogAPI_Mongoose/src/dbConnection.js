"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const mongoose = require("mongoose"); //mongoose i cagirdik

// const MONGODB = process.env.MONGODB || 'mongodb://localhost:27017/blogAPI'
// mongoose.connect(MONGODB)
//mongodb://localhost:27017/blogAPI  bu adresi vs code daki mongodb extantion u aktif edip üstteki connecting string e sag tiklayip conn.strng i kopyaladim ve sonuna veri tabanimizin ismini ekliyoruz mongodb://localhost:27017/blogAPI
// suan localde calisiyorum yarin uzaktaki db ye baglanmak istedigimde yapmam gereken tek sey connection string i degistirmek olacak bunun kontrolü kolay olsun diyed .env ye kaydettim ve ordan cagirdim

// not:bazi bilgisayarlar localhost u algilayamadigi icin kopyaladigimiz connect. stringdeki localhost yerine 127.0.0.1 yaziyoruz

mongoose
    .connect(process.env.MONGODB || "mongodb://127.0.0.1:27017/blogAPI")
    .then(() => console.log(" * DB Connected * "))
    .catch((err) => console.log(" * DB Not Connected * ", err));
//bu async fonk oldugundan then-catch ile baglanip baglanmadigini görmek istedim

// ve bunu indexjs de calistirmak icin gidip orada sadce cagirmam yeterli  require("./src/dbConnection");
// burda  middleware yazmadigimiz icin index.js de cagirirken application.use() icinde cagirmama gerek yok
