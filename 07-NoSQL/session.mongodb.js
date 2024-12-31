/* MongoSH */
// https://www.mongodb.com/developer/products/mongodb/cheat-sheet/
// https://www.mongodb.com/docs/manual/reference/sql-comparison/
// https://www.w3schools.com/mongodb/index.php

// !General Commands
//? help
help;
//? clearScreen:
cls; // $ console.clear()

// ?exit from mongosh:
exit; // $ exit() // $ .exit
quit; // $ quit()

// ! Databases commands
// ? databaseleri görmek icin
// show dbs//mongodb komutlarini js ortamina tasiyip calistirabiliriz bu durumda arada bosluk oldugu icin bu komut calismayacaktir o nedenle alttakini kullanmak daha mantikli
show("dbs"); // $ show dbs // $ show databases
//? Create/Swicth to Database: yeni database olusturmak veya baska bir database e gecmek icin
// use admin//admin dbs e gecmek icin
use("newdb"); // $ use newdb  var olmayan bir dbs yi bu sekilde yazarak varsa buna gec yoksa olustur gec diyebiliriz
// ?Drop/Reset:database i silmek icin
db.dropDatabase();

// !Collections (Tables) commands
// mongodb.com/docs/manual/reference/method/js-collection/
// ? collections yani tables lari görmek icin
show("collections"); // $ show collections // $ show tables
// ? collections yani tables lari listelemek icin
db.getCollectionNames(); // List
db.getCollectionInfos(); // List
// ? collections yani tables lara veri eklemeden yeni coll olusturma
db.createCollection("collName"); // Create veri eklemeden coll olusturma
// ?ismi güncellemek icin
db.collName.renameCollection("collName2"); // Update
// ?coll silmak icin
db.collName2.drop(); // Drop

// !Documents (Records/Rows) ekleme

// ?INSERT:
//? Document-object kayit eklemek icin
//? tek bir kayit eklmek icin
// db.coll.insertOne( { new_values } )
// db.coll.insertMany( [ { new_values } ] )
db.coll.insertOne({ firstName: "Test", lastName: "Test", age: 10 });
db.coll.insertOne({
    key1: "value1",
    key2: "value2",
    key3: { keyNested: "valueNested" },
});
//? birden fazla kayit eklmek icin birden fazla obje gönderewceksem []array icinde göndermeliyim
// in array[]
db.coll.insertMany([
    { firstName: "Test1", lastName: "Test1", age: 11 },
    { firstName: "Test2", lastName: "Test2", age: 12 },
    { firstName: "Test3", lastName: "Test3", age: 13 },
    { firstName: "Test4", lastName: "Test4", age: 14 },
    { firstName: "Test5", lastName: "Test5", age: 15 },
    { firstName: "Test6", lastName: "Test6", age: 16 },
    { firstName: "Test7", lastName: "Test7", age: 17 },
    { firstName: "Test8", lastName: "Test8", age: 18 },
    { firstName: "Test9", lastName: "Test9", age: 19 },
    { firstName: "Test", lastName: "Test", age: 10 },
    { firstName: "Test1", lastName: "Test1", age: 11 },
    { firstName: "Test2", lastName: "Test2", age: 12 },
    { firstName: "Test3", lastName: "Test3", age: 13 },
    { firstName: "Test4", lastName: "Test4", age: 14 },
    { firstName: "Test5", lastName: "Test5", age: 15 },
    { firstName: "Test6", lastName: "Test6", age: 16 },
    { firstName: "Test7", lastName: "Test7", age: 17 },
    { firstName: "Test8", lastName: "Test8", age: 18 },
    { firstName: "Test9", lastName: "Test9", age: 19 },
    { firstName: "Test", lastName: "Test", age: 10 },
    { firstName: "Test1", lastName: "Test1", age: 11 },
    { firstName: "Test2", lastName: "Test2", age: 12 },
    { firstName: "Test3", lastName: "Test3", age: 13 },
    { firstName: "Test4", lastName: "Test4", age: 14 },
    { firstName: "Test5", lastName: "Test5", age: 15 },
    { firstName: "Test6", lastName: "Test6", age: 16 },
    { firstName: "Test7", lastName: "Test7", age: 17 },
    { firstName: "Test8", lastName: "Test8", age: 18 },
    { firstName: "Test9", lastName: "Test9", age: 19 },
]);
// db.coll.insert() method is depracated.

// ?SELECT
// ?kayitlari görme getirme

// db.coll.findOne( { filters }, { fields } )
// db.coll.find( { filters }, { fields } )
// ? ilk kayiti yani 0.index deki kayiti getirmek icin
db.coll.findOne();
// ?key ve value su  { firstName: "Test" } olan ilk objeyi getir
db.coll.findOne({ firstName: "Test" });
// ?tüm kayitlari getirmek icin
db.coll.find();
// ?key ve value su  { firstName: "Test" } olan kayitlarin tümünü getir
db.coll.find({ firstName: "Test" });
//? id olmasin istersek sadece firstname ve lastname i getirmek icin
db.coll.find(
    {
        /* all */
    },
    { _id: false, firstName: true, lastName: true }
); // Select Fields
// ?tekrar edenleri sadece bir defa göster demek icin
db.coll.distinct("firstName");
// Comparison:
db.coll.find({ age: { $exists: true } }); // if exists age diye bir field var mi varsa getir yoksa bos döner
db.coll.find({ age: { $eq: 15 } }); // == : equal age 15 e esit olanlari getir
db.coll.find({ age: { $ne: 15 } }); // <> : not equal age 15 e esit olmayanlari getir
db.coll.find({ age: { $gt: 15 } }); // > : greather than
db.coll.find({ age: { $gte: 15 } }); // >= : greather than equal
db.coll.find({ age: { $lt: 15 } }); // <= : less than equal
db.coll.find({ age: { $lte: 15 } }); // <= : less than equal
db.coll.find({ age: { $in: [10, 11, 12] } }); // in list  age i 10,11,12 olanlari getir
db.coll.find({ age: { $nin: [10, 11, 12] } }); // not in list  age i 10,11,12 olmayanlari getir
// Regex:
// mongodb.com/docs/manual/reference/operator/query/regex/
db.coll.find({ firstName: { $regex: "Test" } }); // Contains 'Test'
db.coll.find({ firstName: /Test/ }); // Contains 'Test'
// üstteki iki kod ayni seyi ifade eder

db.coll.find({ firstName: /test/i }); // Case-InSensitive
db.coll.find({ firstName: /^Test/ }); // StartsWith 'Test'
db.coll.find({ firstName: /Test$/ }); // EndsWith 'Test'
// Logical:
db.coll.find({ age: { $not: { $eq: 15 } } }); // NOT {EQUAL}
db.coll.find({ firstName: "Test6", age: 16 }); // default: AND
db.coll.find({ $and: [{ firstName: "Test6" }, { age: 16 }] }); // AND
db.coll.find({ $or: [{ firstName: "Test6" }, { age: 15 }] }); // OR
db.coll.find({ $nor: [{ firstName: "Test6" }, { age: 15 }] }); // NOT OR
// Limit:
db.coll.find().limit(5);
db.coll.find().skip(5).limit(5); //ilk 5 kayittan sonraki 5 kayidi getir
// Sort (1:ASC, -1:DESC):
db.coll.find().sort({ age: -1 }).limit(5); //yasa göre ters sirala ve ilk 5 i göster
// Count:
db.coll.count(); // kac kayit var 4
// veya
db.coll.find().count(); // kac kayit var 4
db.coll.countDocuments(); // ShortHand find().count()
db.coll.countDocuments({ firstName: "Test" });
db.coll.estimatedDocumentCount(); // for bigData
// db.coll.count() method is depracated.

// ?UPDATE:
// ?güncelleme
// ?bir kayiti güncellenek icin
// db.coll.updateOne( { filters }, { $set: { new_values } } )
// ?birden fazla kayit güncellemek icin
// db.coll.updateMany( { filters }, { $set: { new_values } } )
db.coll.updateOne({ age: 19 }, { $set: { new_fields: "new_value" } }); // Add/Update field  age i 19 olan ilk satiri bul new_fields varsa güncelle yoksa ekle
db.coll.updateOne({ age: 19 }, { $set: { new_fields: "new_value2" } }); // Add/Update field
db.coll.updateMany({ age: 19 }, { $set: { new_fields: "new_value3" } }); // Add/Update field age i 19 olan  satirlari bul ve hepsinin new_fields varsa güncelle yoksa ekle
db.coll.updateMany(
    {
        /* all */
    },
    { $unset: { new_fields: 0 } } //hepsinin new_field i siler
); // Drop field
db.coll.updateMany(
    {
        /* all */
    },
    { $currentDate: { updated_at: true } }
); // set currentDate to field
db.coll.updateMany(
    {
        /* all */
    },
    { $inc: { age: 2 } }
    // { $inc: { age: -2 } }
); // increment (age+2) field
db.coll.updateMany(
    {
        /* all */
    },
    { $rename: { updated_at: "updated" } }
); // rename field
// db.coll.update() method is depracated.

// ?DELETE:
// db.coll.deleteOne( { filters } )
// db.coll.deleteMany( { filters } )
db.coll.deleteOne({ age: 19 });
db.coll.deleteMany({ age: 19 });
db.coll.deleteMany({
    /* all */
}); // Delete all documents.
// db.coll.remove() method is depracated.
