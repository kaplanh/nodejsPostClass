#  NodeJS kurmak ve incelemek icin 

-   Node.JS Official & Download : https://nodejs.org
-   Documents: https://nodejs.org/api

###  Check versions:

```sh
    $ node -v
    $ npm -v
    or
    $ node --version
    $ npm --version
    
```

### NPM komutlari 
-npm bir packet manager nörnegin node.js kullanacagimiz modülleri yüklemeye yarar

nodejs default olarak bizim icinde bulundugumuz klasörümüzü tanir ve default olarak modülleri local e yani bulundugumuz klasöre yükler bu durumda ben sdc bu klasörün icinde iken bu modüllere erisebilirim eger tüm bilgisayarda her zaman her yerde erismek istiyorsam  modulleri indirirken global formatta kurmam gerek

local:bulundugumuz klasör
global:bizim bilgisayarimiz




```sh

# LOCAL

    $ npm help
    # nodejs e icinde bulundugum klasörü benim local calisma klasörüm olarak tanitma komutum
    $ npm init  # package.json olusturur
    # bu komutla bir cok soru soruyor bu sorulariotomatik olarak acik klasörden almasi icin alttaki komutu yazacagiz
    $ npm init -y # package.json olusturur

    #yüklü olan modülleri göstermesi icin
    $ npm list #localdeki modul list icin
    npm -g list #globaldeki modul list icin

     
    $ npm install express  #modul ekleme komutu npm install modulIsmi yada  npm i modulIsmi 
    $ npm i express 
    #bu komutla modul otomatik olarak package altina eklenir production icin gerekli olanlar "dependencies" altina eklenir
    # alttaki 3 komutta ayni islevi görür
    $ npm install express
    $ npm i express 
    $ npm i express --save # bu save i yazinca express i dependencies e(ihtiyaclar listesine) ekler save default dur yazmasakta ayni islevi görür

    $ npm i nodemon --save #böyle yazarsam production dahil tüm ortamlarda dependies(ana ihtiyaclar) listesi ne ekler
    $ npm i nodemon --save-dev # package/scripts -> "dev": "nodemon index.js" test ortami yani development ortami icin gerekli olan yardimci devDependencies (yardimci ihtiyaclar listesine )eklenir
    $ npm run dev # yarn dev


    #repodan aldigimiz bir projeyi package.json icindeki dependebcies e bakip ordaki modullere yükleyerek ayaga kaldiriyorum bunun icin npm install packageName yazarak tek tek yükleyebilirim yada npm install dersem package.jsondaki dependencies ve devDependencies altinda  olan tüm modulleri yüklemis olurum fakat  bene sadece devDependencies altindakileri yani development ortami icin gerekli olanlari  yüklemek istersem  npm i --omit=dev sadece production icin gerekli olanlari yüklemek icinde npm install --production kullaniyoruz

    $ npm install # install packaces (at package.json) herpsi
    $ npm install --production # sadece production ortaminda gerekli olanlar
    $ npm i --omit=dev # install packaces with development modules   sadece development ortaminda gerekli olanlar

    # GLOBAL
    $ npm --global list #globaldeki moduller
    $ npm -g list #globaldeki moduller
    $ npm list #localdeki moduller
    $ npm i -g nodemon #nodemon u global e yükleme
    $ npm i nodemon #nodemon u local e yükleme
    $ nodemon -v

    # macoslar icin
    $ which node
    $ sudo chmod -R 777 /user/local/bin/node
    $ npm i -g nodemon

    # NPX
    #npm kodu dosyayi package manager den alir dowload eder klasörün icine kopyalar npx ise dosyayi alir gecici olarak tutar yapacagi islemi yapar ve o dosyayi siler
    #örnegin npx create-react-app newfolder react dosya yapisini kurduktan sonra bu dosya ile hic isimiz olmayacagi icin kurup silinir 
    $ npx create-react-app newfolder # Ctrl+C
```



# nodejs bir js motorudur js kodlarini calistirip kodlara göre bir sonuc veren bir motordur


### NodeShell

```sh
    $ node #nodeshell e girdim
    > console.log('Hello World') # shellde bunu yazinca ayni yerde cikti Hello World
    > let moduleName = require("module") #modul cagirma komutu require i degiskene atadik
    > moduleName.builtinModules // Show included modules.   # nodejs icinde yüklü defaultmodülleri listeler
    > .exit #node shell den cikip linux ortamina gecmek icin

```

### özetle nodejs icin klasörü acinca bu komutlari yaz dosya icinde actigin terminalde

```sh
-   node -v
-   node -npm
-   node -nodemon
-   npm init -y # package.json
-   npm install express
-   nodemon index.js

```

