// console.log('hüseyin');
// const a = 5
// const b = 5
// console.log((a+b));




function orderPizza(type, ingredients, callback) {
    console.log("Pizza ordered...");
    console.log("Pizza is for preparation");
    setTimeout(function () {
        let msg = `Your ${type} ${ingredients} Pizza is ready! The total bill is
$10`;
        callback(msg);
    }, 3000);
}
orderPizza("Vegeterian", "Cheese", function (message) {
    console.log(message);
});

answer
//*  Pizza ordered
//*  Pizza is for preparation
//*  Your Vegeterian Cheese Pizza is ready! The total bill is $10 