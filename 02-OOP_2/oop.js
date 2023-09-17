"use strict";

/* -------------------------------------------------------
    OOP & CLASSES
------------------------------------------------------- */
//? OOP: Object Oriented Programming(nesne yönelimli programlama)
//? DRY: Don't Repeat Yourself (kendini tekrar etme)
//? BLUEPRINT: Taslak (Mimarların kullandığı mavi şablon kağıdı)
//? CLASS: Obje türetmek için kullanılacak şablon.
//*class yazmamin amaci bir sablon olusturup bu class i kullanarak objectler üretmektir

//?class olusturma yöntemleri

//*1- Class Declaration:
//class PascalNamedClassName {...}

// class keywordü
// pascalcase named(tüm kelime bas harfleri büyük)
// ve  {}

//*2- Class Expression:
//const PascalNamedClassName = class {...}

// const keywordü
// pascalcase named
// =(atama operatörü)
// class keywordü
// {}

// const PascalNamedClassName1 = class {
//     undefinedProperty //
//     // degiskenlere property ,field veya atribute olarak adlandirilir deger atamazsam degeri undefined olur
//     extraField = 'field-value' //degisken tanimlarken const let e grek olmadan direk yazabiliyoruz : yok = var

//     //method yazarken let,const yok function yazmadan methodun ismi () {} ile yaziyoruz
//     //method ve degisken yazmada sinir yok istedigimiz kadar yazabiliriz
//     //objedeki this mantigi burdada var
//     methodName1() {
//         return this
//     }
//     methodName2() {
//         return this.extraField
//     }

// }

//? INSTANCE: Bir classtan türetilen objedir.

// const instance = new PascalNamedClassName1()
// console.log(instance);
// console.log(instance.undefinedProperty);
// console.log(instance.methodName2());
//yukarda olusturdugum class in basina new keyword ü koyup bir degiskene atadim yani class tan bir instance olusturdum
//class lar soyut instance lar somuttur
//class bir sablondur, bir templete dir bir modeldir instance bu model baz alinarak ayaga kaldirilmis bir varliktir
//instance atandiktan sonra class in tüm public methodlarina ve property lerine ulasabilir
//ulastigim bu property nin degerini instance da degistirebilirim dikkat class daki deger degismez sadece o instance da degisir

// *constructor

//? "new Class" ile obje oluştururken veri göndermek için "constructor" methodu kullanılır.
// ??bir class olustururken benim gönderdigim degerlerle  o classtan object olustursun istiyorsam constructor adinda bir method kullanip class a gönderdigim verileri bu constructor un ayaga kaldirmasini sagliyorum

//? bu methodun ismi constructor olmak zorunda baska isim verilemez
//? bu methodu yazarken class a göndermek istedigim parametreleri yazabilirim
//?bu parametrelere default deger verebilirim
//?methodlarin en üstüne yazilir zorunlu degil best practice
//?disardan gelen bu parametreleri this e aktarmak zorundayiz
//?constructor olusturduktan sonra artik ben yeni bir instance olustururken class i ma bu sekilde const instance = new PascalNamedClassName('parameter-1-value', 'parameter-2-value') argüman gönderebilirim



// const PascalNamedClassName2 = class {
//     undefinedProperty;
//     extraField = "field-value";

//     constructor(parametre1, parametre2 = "defaault-value") {
//         this.parametre1 = parametre1;
//         this.parametre2 = parametre2;
//     }

//     methodName1() {
//         return this;
//     }

//     methodName2() {
//         return this.extraField;
//     }
// };
// // //? constructordan sonra instance  olustururken class argüman gönderebilirim
// const instance2 = new PascalNamedClassName2('parametre-1-value', 'parametre-2-value')
// console.log(instance2);//instance
// console.log(instance2.methodName2());//class in methoduna ulastim
// console.log(instance2.undefinedProperty=true);//class in property sine ulastim
// console.log(instance2.extraField);//class in property sine ulastim
// console.log(instance2.extraField = 'new-value');//class in property sine ulastim ve degerini degistirdim ama unutma class daki deger degismez

/* -------------------------------------------------------*
//    *CLASSES-Örnek-1

//class
class Car {
    isRunnung = false;
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    runEngine() {
        this.isRunnung = true;
        console.log("Motor Calisti");
        return (this.isRunnung = true);
    }
}

//bir Car objesi
const ford = new Car("Ford", "Mustang", 1967);
console.log(ford); //Car { isRunnung: false, brand: 'Ford', model: 'Mustang', year: 1967 }

// console.log(ford.isRunnung);// false class in property
// console.log(ford.runEngine());//class in methodu
// console.log(ford.isRunnung); true

//bir Car objesi
const mercedes = new Car("Mercedes", "CLK200", 2000);
console.log(mercedes); //Car {isRunnung: false, brand: 'Mercedes',  model: 'CLK200',  year: 2000}

// not:ford da mercedeste Car objesi ve data type lari ayni fakat instance isimleri farkli oldugu icin bir karisiklik yok
// data type lari object bu object in türüde Car tipinde bir object

//    *CLASSES-Örnek-2
// decleration yöntemi ile
class Person {
    constructor(ad, soyad, dogum=1980) {
        this.ad = ad;
        this.soyad = soyad;
        this.dogum = dogum;
    }
    getAge() {
        return new Date().getFullYear() - this.dogum;
    }
}

// expression yöntemi ile
// const Person = class {
//     constructor(ad, soyad, dogum) {
//         this.ad = ad;
//         this.soyad = soyad;
//         this.dogum = dogum;
//     }
//     getAge() {
//         return new Date().getFullYear() - this.dogum;
//     }
// };

const person1 = new Person('Ali')//Person { ad: 'Ali', soyad: undefined, dogum: 1980 }
const person2 = new Person('Veli', 'Rohlfing', 1980)
console.log(person1);//Person { ad: 'Ali', soyad: 'Rohlfing', dogum: 1970 }
console.log(person2);//Person { ad: 'Veli', soyad: 'Rohlfing', dogum: 1980 }

/*------------------------------------------------------- *
//? INHERITANCE: MirasAlma. Başka bir Class'ın tüm özelliklerini devralma (parent-child ilişkisi kurma)
//? THIS: Child Class - SUPER: Parent Class

//en tepeye en genel bir class yazarsiniz orda projenin en temel islerini yaparsiniz sonra user kontrol sisteminde bir tane user class i yazarsiniz en tepedeki classi bu classa inheritance yaparsiniz bu sekilde user class i user islemlerini yapmakla birlikte uygulamaninizin tüm verilerine sahip bir class haline gelir


// bir classin tüm özelliklerini diger bir clas a aktarmak icin extends keywordü kullanilir böylelikle tüm özelliklerini okuyabilir,yazabilir duruma göre degistirilebilir
//Araclar daha genis bir class bu clas in amaci bu aracin türünü belirlemek(araba mi, kamyon mu, motorsiklet mi vb..)

// class Vehicle {
//     vehicleIsActive = false;

//     constructor(vehicleType) {
//         this.vehicleType = vehicleType;
//     }
// }




//arabalar
// class Car extends Vehicle {
//     isRunning = false;

//     constructor(brand, model, year, vehicleType = "Car") {
//         //? super() parametresi en tepede olmalı (Önce parent constructor çalıştırılmalı)
//         super(vehicleType); // run constructor of ParentClass
//         this.brand = brand;
//         this.model = model;
//         this.year = year;
//     }

//     runEngine() {
//         this.isRunning = true;
//         console.log("Motor Çalıştı");
//         return this.isRunning;
//     }
// }
// const ford = new Car("Ford", "Mustang", 1967, "SUV");
// console.log(ford);

// Car classı "extends Vehicle" özelliği ile Vehicle clasına erişebilir ve constructor yapısını çalıştırabilir. Bunu yapmadan önce Car clasına extends Vehicle ve super() bilgisinin yazılması gerekir. super() erişimi aktif hale getirir ve super() terimi constructor hemen altına yazılmalıdır (best practice)

// Accessory; Car ve Vehicle class larinin ikisininde özelliklerini aldi dede baba torun


// extend almanin limiti yok ben Accessory adinda yeni bir class olusturacagim ve hem Car class inin hemde vehicle classinin özelliklerini kullanacagim
// Car Vehicle'in Accessory de Car in özelliklerini miras aldigi icin Accessory Vehicle in da özelliklerini almis olacak dede-baba-torun iliskisi gibi düsünülebilir



//dede class
class Vehicle {
    vehicleIsActive = false;

    constructor(vehicleType) {
        this.vehicleType = vehicleType;
    }
}

//baba class
class Car extends Vehicle {
    isRunning = false;

    constructor(brand, model, year, vehicleType = "Car") {
        //? super() parametresi en tepede olmalı (Önce parent constructor çalıştırılmalı)
        super(vehicleType); // run constructor of ParentClass
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    runEngine() {
        this.isRunning = true;
        console.log("Motor Çalıştı");
        return this.isRunning;
    }
}

const ford = new Car("Ford", "Mustang", 1967, "SUV");
console.log(ford);
    
//torun class
class Accessory extends Car {
    constructor(accessoryName, brand, model, year, vehicleType = "Car") {
        super(brand, model, year, vehicleType); //burdaki super() Car class ini isaret eder
        this.accessoryName = accessoryName;
    }
}
const fordCliamate1 = new Accessory(
    "Bosh Climate",
    "Ford",
    "Mustang",
    1967,
    "SUV"
);
console.log(fordCliamate1);


// daha önce tanimlöanmis ford instance sinin verilerini tekrar tekrar yazmak yerine rest operatörü yardimiyla  torun classdan olusturdugum instance aktarabilirim

// const fordCliamate2 = new Accessory('Bosh Climate', ...Object.values(ford)) 
// console.log(fordCliamate2);
// böyle yapinca sira kaydigi icin degerler karisiyor 
//? Sıralama Önemli.

/*------------------------------------------------------- *
//? Polymorphism: Miras aldığımız sınıfın özellik/methodlarını yeniden yazabilme.
//? Override: Üst metodla aynı isim ve yapıda yeni bir metod yazma. (ezme / iptal etme / önceliğini alma)
//? Overload: Üst metodla aynı isimde ama farklı yapıda (parametre adet/tip) yeni method oluşturma. (aynı anda ikiside aktif)

//? Override
// dede class
class Vehicle {
    vehicleIsActive = false;

    constructor(vehicleType) {
        this.vehicleType = vehicleType;
    }

    getDetails() {
        console.log("Vehicle getDetails çalıştı");
        return this.vehicleType;
    }
}

//baba class

class Car extends Vehicle {
    isRunning = false;

    constructor(brand, model, year, vehicleType = "Car") {
        //? super() parametresi en tepede olmalı (Önce parent constructor çalıştırılmalı)
        super(vehicleType); // run constructor of ParentClass
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    runEngine() {
        this.isRunning = true;
        console.log("Motor Çalıştı");
        return this.isRunning;
    }

//     //? Override: Üstteki method ile aynı isimde. Artık bu geçerli.
    // parentteki methodu child deki class da ayni isimde yazip yeniden tanimlayarak üstteki methodu ezicegez  cikti olarak son yazilancikacak

//     // örnegin getDetails(){} methodu


    getDetails() {
        console.log("Car getDetails çalıştı");
        // return this
        return {
            brand: this.brand,
            model: this.model,
            year: this.year,
            vehicleType: super.getDetails(), // Parent class metodları super ile çalıştırabilir.
            // vehicleIsActive: super.vehicleIsActive // super-constructor bu veriyi this'e aktardı.
            vehicleIsActive: this.vehicleIsActive, // super constructor bu veriyi this'e aktardı.
        };
    }
}

const ford = new Car("Ford", "Mustang", 1967, "SUV");
console.log(ford);
// console.log(ford.getDetails());

// bunu neden yapariz parentteki metod bizim ihtiyaclarimizi karsilamiyor olabilir onu cagirip yeni isimle tekrar tanimlayip ihtiyaclarima göre yeniden düzenleyip kullanabilirim
// ayni komut daha fazla veri veriyor cünkü biz methodu yeniden yazdik ve daha fazla sey istedik



ben 
super(vehicleType) ile parenten consturctor una
super.getDetails() diyerek parent class in methoduna ulasabiliyorum
super calistiktan sonrada child class in bir metodunun icinde this.vehicleIsActive gibi parenten tüm property lereine ulasabiliyorum cünkü super() propertyleri  this e aktardi  

/* ------------------------------------------------------- */

//? Overload:(ES6 ile geldi)
//?  Üst metodla aynı isimde ama farklı yapıda parametre sayisini veya parametre tipini farkli yazarak (parametre adet/tip) yeni method oluşturma. (aynı anda ikiside aktif) iki parametreli ise alttakini 1 parametreli ise üstekini calistracak gibi düsünülebilir

// class Book {
//   constructor(title, author, year) {
//     this.title = title
//     this.author = author
//     this.year = year
//   }
// //   getSummary() {
// //     return `${this.title} was written by ${this.author} in ${this.year}`
// //   }
//   setPrice(price) {
//     const taxRate = 1.1
//     this.price = Math.trunc(price * taxRate)
//   }
// }
// //! Book kalibinda yeni bir ornek (instance) olusturduk.
// const book1 = new Book("Stupid Reseaches", "XYZ", 2022)
// const book2 = new Book("Dummy Reseaches", "ABC", 2023)
// //? Sub-Class tanimlamasi (Inheritance)


// class Magazine extends Book {
//   constructor(title, author, year, month) {
//     super(title, author, year)
//     this.month = month
//   }
//   //? overrided method
//   //! Overrided Metot (Parent class'daki bir metodun farkli
//   //! fonksiyonellikle ve ayni parametre listesi ile yeniden tanimlanmasi)
// //   getSummary() {
// //     return `${this.title} was written by ${this.author} in ${this.year} in ${this.month}`
// //   }
//   //? Overloading method
//   //! Overloaded Metot (Parenttaki bir metodun farkli parametreler ile yeniden kullanilmasi)
//   setPrice(price, taxRate = 1.2) {
//     this.price = price * taxRate
//   }
//   //? Parenttaki bir fonksyionu yeniden cagirmak
// //   getSummaryParent() {
// //     return super.getSummary()
// //   }
// }
// book1.setPrice(100)
// console.log(book1)
// const mag1 = new Magazine("Elle", "Allen McElle", 2023, "June")
// mag1.setPrice(50, 1.5) //? overloaded method cagrildi.
// console.log(mag1)
// // console.log(mag1.getSummary()) //? overrided method cagrildi
// // console.log(mag1.getSummaryParent()) //? parent tan gelen method dolaylı yoldan cagrildi



/* ------------------------------------------------------- *

//? noah hc nin anlatimiyla  örnek

//* =====================================
//*      OOP -  Polymorphism(ES6)
//*=====================================
//* Polymorphism, bir degisken, fonksiyon veya nesnenin çoklu sekiller
//* alabilmesini tanimlayan bir nesne-yonelimli programlama teknigidir.
//* Polymorphism, genellikle Overloading ve Overriding gibi alt kavramlar ile bilinir.

class Book {
  constructor(title, author, year) {
    this.title = title
    this.author = author
    this.year = year
  }
  getSummary() {
    return `${this.title} was written by ${this.author} in ${this.year}`
  }
  setPrice(price) {
    const taxRate = 1.1
    this.price = Math.trunc(price * taxRate)
  }
}
//! Book kalibinda yeni bir ornek (instance) olusturduk.
const book1 = new Book("Stupid Reseaches", "XYZ", 2022)
const book2 = new Book("Dummy Reseaches", "ABC", 2023)
//? Sub-Class tanimlamasi (Inheritance)


class Magazine extends Book {
  constructor(title, author, year, month) {
    super(title, author, year)
    this.month = month
  }
  //? overrided method
  //! Overrided Metot (Parent class'daki bir metodun farkli
  //! fonksiyonellikle ve ayni parametre listesi ile yeniden tanimlanmasi)
  getSummary() {
    return `${this.title} was written by ${this.author} in ${this.year} in ${this.month}`
  }
  //? Overloading method
  //! Overloaded Metot (Parenttaki bir metodun farkli parametreler ile yeniden kullanilmasi)
  setPrice(price, taxRate = 1.2) {
    this.price = price * taxRate
  }
  //? Parenttaki bir fonksyionu yeniden cagirmak
  getSummaryParent() {
    return super.getSummary()
  }
}
book1.setPrice(100)
console.log(book1)
const mag1 = new Magazine("Elle", "Allen McElle", 2023, "June")
mag1.setPrice(50, 1.5) //? overloaded method cagrildi.
console.log(mag1)
console.log(mag1.getSummary()) //? overrided method cagrildi
console.log(mag1.getSummaryParent()) //? parent tan gelen method dolaylı yoldan cagrildi





/* ------------------------------------------------------- */
//? PUBLIC,PRIVATE,PROTECTED propertyler

//? JS PUBLIC: Genel erişime açık.
//? JS PROTECTED: Sadece Tanımlı olduğu class ve Inherit edilen child-class erişebilir.
//? -* JS/ES12 öncesi desteklemiyor: Genel erişime açık ama lütfen dokunmayın :)
//? JS PRIVATE: Sadece tanımlı olduğu class içinde erişim var.

// *PUBLIC:default olarak tanimlanan degiskenler(property) dir bir instance dan child class dan bunlara ulasabilir degistirebilirim

//* _PROTECTED: basina alt tire _ konularak tanimlanan degiskenlere PROTECTED propertyler denir.child class dan ulasabilirsin ama instance dan ulasamazsin (buna dokunma)

//* #PRIVATE:basina kare # konularak tanimlanan degiskenlere PRIVATE propertyler denir. sadece kendi class inin icinden ulasilabilen instance ve child class da ulasilamayan propery ler
//*metodlar icinde ayni sey gecerlidir
//*private methodlar cagrilirken baslarina # koymayi unutmayin

// *örnek
class Vehicle {

    vehicleIsActive = false // PUBLIC PROPERTY
    _protectedProp = true // PROTECTED PROPERTY
    #privateProp = true // PRIVATE PROPERTY

    constructor(vehicleType) {
        this.vehicleType = vehicleType
    }
    // Override yapma lütfen:
    _protectedMethod() {
        console.log('Vehicle protectedMethod çalıştı')
        return true
    }
    #privateMethod() {
        console.log('Vehicle privateMethod çalıştı')
        return true
    }

    getDetails() {
        console.log('Vehicle getDetails çalıştı')
        console.log('privateProp', this.#privateProp)
        console.log(this.#privateMethod())
    }
}


class Car extends Vehicle {
    isRunning = false;

    constructor(brand, model, year, vehicleType = "Car") {
        super(vehicleType);
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    runEngine() {
        this.isRunning = true;
        console.log("Motor Çalıştı");
        return this.isRunning;
    }

    // getDetails() {
    //     console.log("Car getDetails çalıştı");
    //     console.log( 'privateProp', this.#privateProp ) // NO ACCESS
    //     console.log( this.#privateMethod() ) // NO ACCESS
    //     console.log( 'privateProp', super.#privateProp ) // NO ACCESS
    //     console.log( super.#privateMethod() ) // NO ACCESS
    // }
}

const ford = new Car('Ford', 'Mustang', 1967, 'SUV')
console.log ( ford )
console.log ( ford.getDetails() )
// console.log ( ford.#privateProp ) // NO ACCESS

/* ------------------------------------------------------- */