"use strict";

// variable = 5
// console.log(variable);

// ?yukardaki kod var,const veya let gibi herhangi bir keyword ile tanimlanmamasina ragmen, hata vermesi gerekirken  calisti iste bu tip gevseklikleri ortadan kaldirmak icin use strict ifadesi kullanilir

/* -------------------------------------------------------
    OBJECTS
------------------------------------------------------- *

const exampleObject = {

    propertyName: 'value', // object icindeki degiskene property, field yada  attribute denir

    object icindeki fonksiyona metod denir 
    methodName: function () {  
        return 'This is Method'
    }
}



console.log( exampleObject.propertyName )
console.log( exampleObject.methodName() )

/* ------------------------------------------------------- *





const Car = {

    brand: 'Ford',
    model: 'Mustang',
    year: 1967,
    isAutoGear: true,
    colors: ['white', 'red'],
    details: {
        color1: 'red',
        color2: 'white',
        engineSize: 4900
    },
    startEngine: function () {
        return 'Motor çalişti'
    }
}


const ali = 'brands'

// console.log( Car.brand )
// console.log( Car.colors )
// console.log( Car.colors[0] )
// console.log( Car.details )
// console.log( Car.details.engineSize )
// console.log( Car.startEngine() )  //*metod cagirirken  parantezi unutma

console.log( Car[ali] )
console.log( Car['brands'] )
console.log( Car.details['engineSize'] )
console.log( Car['details']['engineSize'] )
console.log( Car['startEngine']() )

/* ------------------------------------------------------- *
//? "THIS" KEYWORD
//* this keyword ü bulundugu object i isaret eder
const Car = {

    brand: 'Ford',
    model: 'Mustang',
    year: 1967,
    isAutoGear: true,
    colors: ['white', 'red'],
    details: {
        color1: 'red',
        color2: 'white',
        engineSize: 4900
    },
    startEngine: function () {
        return 'Motor çalişti'
    },
    getDetails: function () {

        // return this
        // return this.brand + ' ' + this.model + ' ' + this.year
        // return this.startEngine()//bu metodda object icindeki baska bir methodu calistirdim

    },
    arrowFunc: () => {
    //? Arrow functions is globalScope. (Not working this keyword in here) expres.js de bir fonksiyondan baska bir fonksiyona veri göndermem gerekecek o nedenle veriyi global scobe tasiyacak bir fonk lazim olacakki veriyi localscobe dan cikarsin orada arrow un bu özelliginden yararlanacagiz var gibi düsünebiliriz
        return this
        // return this.brand
    }
}

// console.log( Car.getDetails() )
console.log( Car.arrowFunc() )

/* ------------------------------------------------------- *
//? ARRAY DESTRUCTURING

const testArray = [ 'value0', 'value1', 'value2', 'value3' ]
const arr1 = testArray;
console.log(arr1===testArray)//*true  gölge copy yaptik yani heap kisminda  ayni yeri refere ettik

const arr2 = [...testArray]
console.log(arr2);
console.log(arr2===testArray)//*false deepcopy yaptik stack dede heap dede farkli yerler tuttugu icin

// const var0 = testArray[0]
// const var1 = testArray[1]

//? Sıralama Önemli!
const [ firstItem, secondItem ] = testArray
console.log(firstItem, secondItem)//value0 value1

//? RestOperator (Toplayıcı) (En sonda olmak zorunda):
let [ first, second, ...others ] = testArray
console.log(first, second, others)//value0 value1 [ 'value2', 'value3' ]

//? SpreadOperator (Dağıtıcı):
const newArr = [ ...testArray, 'new-value', 'new-value2' ] //[ 'value0', 'value1', 'value2', 'value3', 'new-value', 'new-value2' ]
// console.log( newArr )



/* ------------------------------------------------------- *
//? OBJECT DESTRUCTURING

const Car = {
    brand: "Ford",
    model: "Mustang",
    year: 1967,
    isAutoGear: true,
    colors: ["white", "red"],
    details: {
        color1: "red",
        color2: "white",
        engineSize: 4900,
    },
    startEngine: function () {
        return "Motor çalişti";
    },
};

//* Rest:
// const { year, model, brand, ...otherItems } = Car
// console.log( year, model, brand )
// console.log( otherItems )

const { year: modelYear, model: newName, brand } = Car;
console.log(modelYear, newName, brand);
console.log(Car); // Orjinal değişmiyor.

//* Spread:
const newObj = {
    ...Car,
    newKey: "new-value",
};
console.log(newObj);

const newObj1 = {
    ...Car.colors,
    newKey: "new-value",
};
console.log(newObj1);

const newObj2 = {
    ...Car.details,
    newKey: "new-value",
};
console.log(newObj2);

/* ------------------------------------------------------- *
//*object to JSON,JSON to object and  Object to Array:

const Car = {
    brand: "Ford",
    model: "Mustang",
    year: 1967,
    isAutoGear: true,
    colors: ["white", "red"],
    details: {
        color1: "red",
        color2: "white",
        engineSize: 4900,
    },
    startEngine: function () {
        return "Motor çalişti";
    },
};

// *Object to JSON:
// const json = JSON.stringify(Car);
// console.log ( typeof json, json )

//* JSON to Object:
// const newObj3 = JSON.parse(json);
// console.log(typeof newObj3, newObj3)

//* Object to Array:
// const arr = [ ...Car ] //hata json verileri iterable degil
const arr = Object.entries(Car)
console.log( arr )
const arr2 = Object.values(Car)
console.log(arr2)
const arr3 = Object.keys(Car)
console.log(arr3)

/* -------------------------------------------------------/
    Object Constructor
------------------------------------------------------- */

// const PascalCaseNamed = function () {
//     this.property = "value";
// };

/* ------------------------------------------------------- *
//? "NEW" KEYWORD

const CarConstructor = function (brand, model, year = 2011) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.isRunning = false;
    this.startEngine = function () {
        this.isRunning = true;
        return "Motor çalıştı";
    };
};

const newCar = new CarConstructor("Ford", "Mustang", 1967);
console.log(newCar);

const newCar2 = new CarConstructor("Toyota", "Corolla");
console.log(newCar2);

console.log(newCar2.isRunning);
console.log(newCar2.startEngine());
console.log(newCar2.isRunning);




/* ------------------------------------------------------- */
// not:Bir instanxe oluşturduğumuzda propertyler direkt aktarılır, methodlar ile bağ kurulur (aktarılmaz). Methodlar direk görünmese de erişilebilir vaziyette dururlar.
