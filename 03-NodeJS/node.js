"use strict"

/* --------------------------------------------

        NODEJS

-------------------------------------------- */


/*********************************************/
//? NodeJS Nedir ?

// ?V8
// *Chrome tarayicimizda javascript kodlarini render yapan V8 adinda bir motor var
    
    
// *Chrome google tarafindan yapilmis bir tarayici V8 de Google tarafindan yapilmis bir motordur ve opensource dur. bu motorun görevi html icindeki javascript kodlarini algilayip calistirmaktir

// ?NodeJS
// *Ryan Dahl 2009 da bu client tarafindaki bu V8 motoru almis ve server seide cevirmis yani tarayici tarafinda js calistirmak icin yapilan motoru almis modifie etmis server tarafinda calisir hale getirmis

//* NodeJS V8 üzerinde calisan bir sistem
//*js nin server seide tarafinda calismasina imkan saglayan bir motor
//*bütün platformlarda windows,macos,Linux da calisiyor en iyi performansi Linux üzerinde sergiliyor.
//*%60 i C++ & %40 i js ile yazilmistir

/*********************************************/
// ?Bir projenin akis semasi
// *Browserdan herhangi bir siteye girmek icin yazilan adrese url denir
// ?Request
// *1- Browser benim urldeki domane name göre onun arka planda id numarasini yakalayip(her serveren bir id numarasi vardir) servere bir takim veriler gönderir ve bu verilerle bir talepte bulunur. Bu talebe Request denir

//*2-frontend kismi bu veriyi alir JSON a cevirir yani API ile konusacak ortak dil haline dönüstürür ve backend tarafina REST API ye json bir veri gönderir

// bu gönderdigi veriler
// 1 - URL
// 2 - Header
// 3-  http Method
// 4-data

// *3-server gelen veriyi(js objesini) kendi anlayacagi data ya cevirir(JSON to Data) mesela js de bu objedir
//*4-kullanici girisi yetkilendirme vs icin süzgecten gecirir. Eger gelen bu istek yetki ve izinlerden gecti ise bu veriler Models & Controllers den gecirilir (expressde görecegiz) yani yetkilendirme-gecis izni varsa is yazilima dökülüyor (motor calistiriliyor) bu motor veri tabanindan veri alisverisi yapmaya baslar
//*nihai sonucu  data olarak  rendere gönderir renderde gelen data(js objesini) yi Json a cevirip client side a döner buna response denir

// ?Response
// * Server  bu requste bir cevap döner buna Response denir
//* response dönerken
// 1 - Header
// 2 - StatusCode
// 3 - data
// gönderir



/*********************************************/
// ?Request URL
// *örnek bir url=> https://video.google.co.uk:80/videoplay?docid=-72078230&hl=en#00h02m30s


// *tarayiciya yazdigimiz adresler url olarak adlandirilir
//* bu url lerin farkli bölümleri ve islevleri vardir
// 1 - basta http yada https takilarina http protokoleri denir
// 2 - google.co.uk kismina domain name denir domain servere i temsil eder
// 3 - video a kismina subdomain(alt domaine) denir obje mantigindaki gibi fakat burda sub domain önce yazilir
// 4 - : 80 e port denir.Srveren bir parcasini(aplication u) temsil eder
// 5 - /videoplay seklinde / ile adreslemeye path denir
// 6 -? docid = -72078230   seklinde ? ile ayirip key = value  seklindeki datalara query denir
// 7 - docid = -72078230 ve hl = en  gibi gönderilen herbir dataya parametre deniyor birden fazla query varsa herbirinin arasina & koyulur

// 8-#00h02m30s  # isareti ile ayirip sayfa ici isaretleme yapmaya fragment denir


/*********************************************/

// ?Request Methods
// *CRUD islemleri
// backend tek kelime ile ifade edilecekse CRUD işlemleri ile ifade edilebilir

// C : Create => POST:serverde yeni bir kayit eklemek istegi
// R : Read => GET:bir datayi görmek istiyorum
// U : Update => PUT/PATCH:bir veriyi güncellemek istiyorum PUT:komple güncelleme(username,email,tel vb hepsini degistirmek istersem),PATCH:kismi güncelleme(sadece email i güncellemek istersem)
// D : Delete => DELETE:bir veri kümesini silmek istiyorum


// HEAD => Header ile gelen verilerin detaylarini sunar
// TRACE => serverden bir mesaj varsa onu yayinlar
// OPTIONS=>o anki Application un durumunu,detayini gösterir

// GET ve HEAD metodlari güvenlidir yani disardan erisilebilir erisilmesinde bir sakinca yok.Url ile gönderebildigimiz veriye GET verisi diyebiliriz
// POST, PUT, PATCH güvenli degildir disardan erisilemez erisilmesi sakincalidir(APIKEY acik acik yazilamaz)

// NOT:Domain haric url ile giden gelen hersey header dir

/*********************************************/
// ?Response Status Code
//* yapilan request e karsi dönen response un statusunu bildiren code ve mesaj döner buna Response statusCode denir

// • 1xx: Bilgi isteği
// • 2xx: Başarı
// • 3xx: Yönlendirme
// • 4xx: İstemci hatası
// 5xx: Sunucu hatası
//  *En Sık Karşılaşılan Durum Kodları
// • 200 Durum Kodu (Başarılı) ...//default dur backend ci birsey yazmasada gelir
// • 301 Durum Kodu (Kalıcı Yönlendirme) ...
// • 302 Durum Kodu (Geçici Yönlendirme) ...
// • 403 Durum Kodu (Erişim İzni Sorunu) ...
// • 404 Durum Kodu (Bulunamadı) ...
// • 410 Durum Kodu (Kalıcı Olarak Bulunmuyor) ...
// • 500 Durum Kodu (Sunucu Hatası) ...
// • 503 Durum Kodu (Sunucu Kullanılamıyor)
//* status kodlarin tamami icin => https://www.ideasoft.com.tr/http-durum-kodlari-nedir-anlamlari-nelerdir/
/*********************************************/
// ?Header
// *Türü ne olursa olsun(html,js,css,doc...) Her dosyanin bir Headr birde body alani vardir
//*Header da olusturulma tarihi güncellenme tarihi vb veriler tutulur
//*dosyalarin header kismini biz göremeyiz isletim sistemi görür,postman görür yani özel bir yazilim ister
//*bir dosyayi silip cop kutusundan da sildigimizde gözükmez burada sadece header kismi silinir body kismi silinmez siber suclar güvenlik birimleri bazi özel programlar araciligiyla header siz body e ulasip bilgileri okuyabilirler
//*json veri disinda hersey header da gider header da gelir

// HTTP Headers lari, request and response headers aracılığıyla istemciler ve sunucu arasında ek bilgi aktarmak için kullanılır . başlıklar büyük/küçük harfe duyarlı değildir; başlık alanları iki nokta üst üste, anahtar/değer çiftleriyle string biçiminde ayrılır. Boş alan başlığıyla gösterilen başlık bölümünün sonu. Yorumları içerebilecek birkaç başlık alanı vardır. Ve birkaç başlık, eşittir işaretiyle ayrılmış kalite(q) anahtar/değer çiftleri içerebilir.

// Bağlam açısından dört tür başlık vardır:
 

// General Header(Genel Başlık): Bu tür başlıklar hem İstek hem de Yanıt başlıklarına uygulanır ancak veritabanı gövdesini etkilemez.
// Request Header(İstek Başlığı): Bu tür başlıklar, istemci tarafından getirilen istek hakkında bilgi içerir.
// Response Header(Yanıt Başlığı): Bu tür başlıklar, istemci tarafından talep edilen kaynağın konumunu içerir.
// Entity Header(Varlık Başlığı): Bu tür başlıklar, MIME türü, İçerik uzunluğu gibi kaynakların gövdesi hakkında bilgileri içerir.

// Daha fazla detay mevcut merak edenler için => https://www.geeksforgeeks.org/http-headers/ 
/*********************************************/
/*********************************************/


