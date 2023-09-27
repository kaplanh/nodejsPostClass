// console.log('hüseyin');
// const a = 5
// const b = 5
// console.log((a+b));



//?yazdigimiz kodlarin ciktisi icinasagidaki kodlardan birini kullanabiliriz 3 de ayni görevi yapar
// *node index.js
//* node index
// *node .

// ? burda her degidsiklikten sonra tekar bu kodu yazmamak icin nodemon modulunü yükleyip asagidaki gibi  dosya ismini yaziyoruz

// *nodemon index.js
// *nodemon .

//?  nodemon ortamindan cikmak icin ctrl+c kullanilir



//  1 Defa kullanmamızın yeterli olduğu komutlar
// node -v ile node.js'nin yüklü olup olmadığını kontrol etmek
// npm -v ile npm'in yüklü olup olmadığını kontrol etmek
// npm install -g nodemon ile globalde nodemon yüklemek
// ======
//  Her defasında kullanmamız gereken komutlar
// npm init -y package.json dosyasını oluşturmamızı sağlar
// npm install express express'i ve node_modules'i  yükler
// nodemon index.js  index.js isimli dosyamızı nodemon çalıştırmamızı sağlar
// ======
// :alert-2: Amacını bilmemiz gereken kodlar
// npm list yüklü paketleri listeler
// npm i --omit=dev node_modules silinmişse package.json daki dependencies'teki bilgilere göre node_modules'i yükler. devDependencies'tekileri node_modules'e yüklemez
// npm install --production  npm i --omit=dev ile benzer işleve sahiptir. Daha yaygın kullanılan komuttur.
// npm install express --save bu komut express.js'i packetjson'a kaydetmek için kullanılır. Ancak npm in 5.0 sıfır sürümünden sonra otomatik olarak kaydedildiği için ayrıca save komutuna gerek kalmamıştır.
// let moduleName = require("module") Belirtilen modülü çağırır. (Bu komutu çalıştırmak için terminalde "  node   " yazarak js alanına girmiş olmamız gerekir. Çıkmak için  "  .exit" komutu yazılır.
// moduleName.builtinModules  let moduleName = require("module") komutundan sonra yazdığımızda modülleri listeler. 