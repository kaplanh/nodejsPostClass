"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// node i nodemailer
// sendMail(to:string, subject:string, message:string):

const nodemailer = require('nodemailer')

module.exports = function (to, subject, message) {
    //! ----------------ethereal yardimi ile fake email olusturup console da test yapmak icin--------
    //?NOT:bu fonksiyonu passife almanin bir yolu return verdirip return den sonrasini calistirmasini engelemektir
    // Set Passive:
    return true;
    //? 1-nodemailer.createTestAccount() ile fake bir mail olusturuyoruz: NOT:Bu adresten de olusturabiirim ==> https://ethereal.email/
    // Create Test (Fake) Account:
    // nodemailer.createTestAccount().then((email) => console.log(email))
    // olusturulan fake mailin bilgileri
    /*
    her mail servisi ister fake ister gmail ister outlook ister özel bir servis olsun  bize bir username,bir password ve bir smtp bilgisi vermek zorunda
    {
      user: 'ac6evxdu3t45mgmt@ethereal.email',
      pass: 'EhuWArCFt3uevRf887',
      smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },//mail gönderme ayari biz burda mail gönderme yapacagimiz icin burda bu önemli
      imap: { host: 'imap.ethereal.email', port: 993, secure: true },//mail almak ile ilgili ayar bu artik cok kullanilmiyor yerini pop3 aldi
      pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },//mail almak ile ilgili ayar
      web: 'https://ethereal.email'
    }
    */
    // ? 2-nodemailer.createTransport() ile mail sunucusuna baglanma, mail gönderici-iletici olusturma yada mail servisine kayit olup giris yapma o
    // const transporter = nodemailer.createTransport({
    //     host: 'smtp.ethereal.email',//gönderecegim mail servisinin adresi
    //     port: 587,//gönderecegim mail servisinin portu
    //     secure: false, // false | 'tls' | 'ssl'//gönderecegim mail servisinin kullandigi güvenlik servisi var mi yok mu varsa ne
    //     auth: {//erisim bilgileri
    //         user: 'ac6evxdu3t45mgmt@ethereal.email',
    //         pass: 'EhuWArCFt3uevRf887'
    //     }
    // })
    // ? 3-transporter.sendMail() ile yukarda olusturdugumuz fake email bilgilerini alip burada yaziyoruz
    // // SendMail:
    // transporter.sendMail({
    //     from: 'ac6evxdu3t45mgmt@ethereal.email',//mail kimden gidecek
    //     to: 'qadir@clarusway.com', // 'abc@mail.com, def@mail.com'//mail kime gönderilsin virgülle ayirarak birden fazla adrese gönderebilirz
    //     subject: 'Hello',//konu basligi
    //     text: 'Hello There...',//text ile icerik
    //     html: '<b>Hello There</b>'//html olarak icerik
    // }, (error, successInfo) => {//islem basarilimi hatami var bunun icin calisacak callback fonksiyon
    //     (error) ? console.log(error) : console.log(successInfo)
    // })
    //! ------------------------------------------------------------------------------------------------------------------

    //* GoogleMail (gmail):
    // Google -> AccountHome -> Security -> Two-Step-Verify -> App-Passwords
    //? 1-hangi servisi hangi emaili ve gmailin bana verdigi password ü  belirten mail ayarlarini mailSettings objesi icinde belirliyorum
    const mailSettings = {
        service: "Gmail", //kullanacagimiz servis ismi
        user: "kplnhsyn.49@gmail.com", //gönderenin maili
        pass: "eglu cwjs ldey ixxr", // kendi passwordün degil gmail in  su adresinde sana verilen password https://myaccount.google.com/u/1/apppasswords
        // not: eglucwjsldeyixxr  bu sekilde arada bosluk olmasada ayni sey
    };
    // //* YandexMail (yandex):
    // const mailSettings = {
    //     service: 'Yandex',
    //     user: 'username@yandex.com',
    //     pass: 'password' // your emailPassword
    // }
    // ? 2-emailContent ile mail contentini emailContent objesi icinde belirliyorum
    // *statik veriler
    // Mail Subject/Content:
    // const emailContent = {
    //     from: mailSettings.user, //kimden
    //     to: "kplnhsyn.49@gmail.com", //kime
    //     subject: "Hello", //konu basligi
    //     text: "Hello, How are you?", //test icerik
    //     html: "<b>Hello</b> How are you?", //html icerik
    // };

    // *dinamik veriler
    const emailContent = {
        from: mailSettings.user, //kimden
        to: to, // 'qadiradamson@gmail.com',//kime
        subject: subject, // 'Hello',//konu basligi
        text: message, // 'Hello, How are you?',//test icerik
        html: message, // '<b>Hello</b> How are you?'//html icerik
    };
    // ? 3- nodemailer.createTransport() ile yukardaki ayarlari buraya cekip mail servere tasiyorum-baglanti kuruyorum
    // Connect to mailServer:
    const transporter = nodemailer.createTransport({
        service: mailSettings.service,
        auth: {
            user: mailSettings.user,
            pass: mailSettings.pass,
        },
    });
    // ? 4- transporter.sendMail() ile maili gönderiyorum
    // SendMail:
    transporter.sendMail(emailContent, (error, info) => {
        error ? console.log(error) : console.log(info);
    });
}


// NOT-1:bu fonksiyonu burada yazdiktan sonra eger bir kullanici create olduktan sonra ona mail gitsin diyorsak controllers/user.js e gidip create fonksiyonuda bu fonksiyonu cagirip icine beklesigi argümanlari gönderip mailin ilgili kisiye gitmesini saglayabiliriz
//NOT-2:bu fonksiyonu burada yazdiktan sonra eger bir kullanici create olduktan sonra ona bu mailin gercek bir mail olup onaylanma linki iceren bir mail göndermek istiyorsak
// *1 - models / user.js de mailin onaylanip onaylanmadigini takip eden  asagidaki gibi bir field eklemeliyiz
// emailVerified: {
//         type: Boolean,
//         default: false
//     }
// *2-controllers / user.js e gidip bu fonksiyonu orada cagirip create fonksiyonu icinde yolu users/verify ve query si kullanicinin id si ve sifrelenmis passwordünü iceren bir link maili göndermeliyiz

// const sendMail = require('../helpers/sendMail')
// sendMail(
//             // user email:
//             data.email,
//             // Subject:
//             'Welcome',
//             // Message:
//             `
//                 <p>Welcome to our system</p>
//                 Bla bla bla...
//                 Verify Email: http://127.0.0.1:8000/users/verify/?id=${data._id}&verifyCode=${passwordEncrypt(data.email)}
//             `
//         )



//*3- kullanici mailini kontrol edip linke tikladiginda users/verify adresine istek atmis olacagindan controllers/user.js icinde  verify fonksiyonun yazmamiz ve bu conrol ile req.query den gelen id yi :_id seklinde tekrar isimlendirerek ve verifyCode u alip User modelinde _id üzerinden findOne() yaparak user i yakalamali verifyCode ilede sifrelenen user.emailin ayni olup olmadigini kontrol edip dogruysa update({_id}) ile User modeldeki emailVerified yi true yapmali ardindan sendMail() ile  yeni bir email göndermeliyiz
//  verify: async (req, res) => {
//      const { id: _id, verifyCode } = req.query;

//      const user = await User.findOne({ _id });

//      if (user && verifyCode == passwordEncrypt(user.email)) {
//          await User.updateOne({ _id }, { emailVerified: true });
//          sendMail(user.email, "Email Verified", "Email Verified");

//          res.status(200).send({
//              error: false,
//              message: "Email Verified",
//          });
//      } else {
//          res.errorStatusCode = 402;
//          throw new Error("User Not Found.");
//      }
//  };

// *4-linke tiklandiginda bu controle ulasabilmesi icin routes/user.js  icinde router.route("/:id") üzerinde hatta en üstte olmak kaydiyla users/verify rouute nu olusturmaliyiz
// router.get("/verify", user.verify);