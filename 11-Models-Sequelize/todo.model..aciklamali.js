//* SEQUELIZE ile model olusturma
//sequelize  projeye ekleme kodlari icin ==> https://sequelize.org/docs/v6/getting-started/

//? 1- öncelikle hangi database ile calisacaksam onu ve sequelize i  npm den teminalde asagidaki kodla instal ediyorum
//* npm i sequelize sqlite3 //sqlite ile calisacaksam-suan bunla calisacagiz

// npm i sequelize mysql2 //mysql2 ile calisacaksam
// npm i sequelize mariadb //mariadb ile calisacaksam
// npm i sequelize pg pg-hstore //Postgres ile calisacaksam
// npm i sequelize tedious  //Microsoft SQL Server ile calisacaksam
// npm i sequelize oracledb  //Oracle Database ile calisacaksam

// ?2-sequelize i require() edip icinden Sequelize motorunu ve DataTypes i destructring yöntemi ile cagiriyoruz
// Not:postgre sql ile calisacaksam  postgresql de önceden veri tabani ve user hazir olmali tablolari olusturmaya gerek yok onu model(sequelize ile) kendi  olusturacak

const { Sequelize, DataTypes } = require("sequelize");
// console.log(sequelize);
// ?3  Sequelize() class ina baglanmak istedigim database ismi ve localde baglanacaksam yolunu uzaktakine baglanacaksam connecting string ini yazip  bir instance olusturuyorum yani pgAdmin4 e gidip user ve veri tabani olusturmam gerek
const sequelize = new Sequelize(
    "sqlite:" + process.env.SQLITE || "./db.sqlite3" // baglanacagim db yol veya connecting stringini .env de tutabilir ordan cagirabilirm
);

// ?3-const Todoo = sequelize.define('tableName,{ title: { type: DataTypes.STRING(64), // varchar(64)      allowNull: false,}, description: DataTypes.TEXT, // ShortHand Using.})
// komutu ile Modelimizi olusturuyoruz
// burda Todo model ismi pascalcase
//1.parametre  tableName:olusacak tablo ismi
// 2.parametre {sütunName:{type:DataTypes.INTEGER,}} keyler sütun isimleri ve datatypes larini vb belirtmis olacak

// hangi data tipinin hangi veri tabani tarafindan desteklendigini burdan bakabilirsin==> https://sequelize.org/docs/v7/models/data-types/

// model olustururken erd ne diyorsa ona göre hazirlanir onun disina cikilmaz
// sequelize.define('tableName', { columns })
// sequelize ile tablo olusturmanin komutu define('tablename',{}) ve define() iki parametresi var 1.si string icinde tablo ismi 2.si obje objenin key leri sütun isimlerini bu keylere gelen objeler ise datatypes lari yani o sütunlarda tutulacak veri typleri ve diger özellikleri-kisitlamalari belirtir
const Todo = sequelize.define("todo", {
    // id: {
    //     //? Not need define ID field, it will create auto.
    //     type: DataTypes.INTEGER,
    //     unique: true,
    //     allowNull: false, // default: true
    //     field: "custom_column_name", // Change column name //id degilde custom_column_name yazar
    //     comment: "Description",
    //     primaryKey: true,
    //     autoIncrement: true,
    // },
    title: {
        type: DataTypes.STRING(64), // varchar(64)
        allowNull: false, //bos birakilabilir mi hayir
    },

    description: DataTypes.TEXT, // ShortHand Using. sadece data tipini belirteceksem obje acmama gerek yok

    priority: {
        // 1: High , 0: Normal, -1: Low yüksek öncelikli veya degil
        type: DataTypes.TINYINT, //TINYINT:kücük sayilik bir alan rezerv etsin postgres: INTEGER
        allowNull: false,
        defaultValue: 0, // set default value.
    },

    isDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },

    //? Not need define "createdAt" & "updatedAt" fields.//bu ikisini postgre sql e birakmak en iyisi
    // createdAt: false, // Unset
    // updatedAt: false, // Unset
});

// ?4 -    mongoDB de create database yada create collection yapmamiza gerek yok bir veri bir document yolladigimiz zaman otomatik kendi olusturuyordu fakat sql db lerde böyle birsey yok db önceden hazir olmali o nedenle bu db lere önceden veri tabani olustur bu db yi ayaga kaldir demeliyiz bunun icin asagidaki 3 koddan biri ile  sekronizasyon yapmaliyim bu sekronizasyon komutu ile klasörümün icinde db.sqlite3 adinda bir db olusacak ve sqlite viewer extantion u yüklersem v s koda bana olusturdugum tabloyu görmebilecegim
// Synchronization:
//! SYNC MUST RUN ONCE!-sadece bir defa calismali sonra kapatilmali
// sequelize.sync() // CREATE TABLE-yoksa olusturur ama degisiklikleri sekronize etmez
// sequelize.sync({ force: true }) // DROP & CREATE-önceki verileri siler  degisiklikleri sekronize eder

// *bunu kullan
// sequelize.sync({ alter: true }); // TO BACKUP & DROP & CREATE & FROM BACKUP-degisikleri önceki verileri silmeden sekronize eder önce var olan verileri yedekler sonra siler sonra degisikliklerle birlikte eskileri sekronize eder
// !NOT:bu Synchronization islemi sadece bir defa yapilmali ve yoruma alinmali

// ?5-sisteme ekleme cikarma islemleri yapabilmek icin sequelize.authenticate() ile baglaniyorum
// Connect:
sequelize
    .authenticate() //async bir method calisip calismadigni anlamak icin then-catch ile kontrol ettim
    .then(() => console.log("* DB Connected *"))
    .catch((err) => console.log("* DB Not Connected *", err));

// NOT:veri tabanlarina sequelize ile baglanmanin 3 yöntemi var bu linkten inceleyebilirsin ==> https://sequelize.org/docs/v6/getting-started/

// *örnek
// const { Sequelize } = require('sequelize');

// // Option 1: Passing a connection URI
// const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

// // Option 2: Passing parameters separately (sqlite)
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'path/to/database.sqlite'
// });

// // Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
// });

module.exports = Todo;
