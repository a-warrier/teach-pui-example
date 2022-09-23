class Roll {
    name;
    basePrice;
    totalPrice;
    constructor(name, price) {
        this.name = name;
        this.basePrice = price;
        this.totalPrice = 0.0;
    }
}

const originalRoll = new Roll('Original Cinnamon Roll', 2.49);

class Glaze {
    name;
    glazePrice;
    constructor(name, price) {
        this.name = name;
        this.glazePrice = price;
    }
}

class Pack {
    name;
    packPrice;
    constructor(name, price) {
        this.name = name;
        this.packPrice = price;
    }
}
const original = new Glaze('Keep Original', 0.0);
const sugarMilk = new Glaze('Sugar Milk', 0.0);
const vanillaMilk = new Glaze('Vanilla Milk', 0.50);
const doubleChocolate = new Glaze('Double Chocolate', 1.50);

const pack1 = new Pack('1', 1);
const pack3 = new Pack('3', 3);
const pack6 = new Pack('6', 5);
const pack12 = new Pack('12', 10);


let glazeArr = [original, sugarMilk, vanillaMilk, doubleChocolate];
let packArr = [pack1, pack3, pack6, pack12];

let glazeOptions = document.getElementById("glazing-options");
for (i=0; i<glazeArr.length; i++) {
    let glazeElement = document.createElement("option");
    glazeElement.textContent = glazeArr[i].name;
    glazeOptions.appendChild(glazeElement);
}

let packOptions = document.getElementById("pack-options");
for (i=0; i < packArr.length; i++) {
    let packElement = document.createElement("option");
    packElement.textContent = packArr[i].name;
    packOptions.appendChild(packElement);
}

let basePrice = originalRoll.basePrice;
let glazePrice = 0;
let packPrice = 1;  //multiplying, so making this default value as 1
let totalPrice = 0;

function totalChange(element) {
    const priceChange = element.value;

    for (i=0; i<glazeArr.length; i++) {
        if (glazeArr[i].name == priceChange) {
            glazePrice = glazeArr[i].glazePrice;
        }
    }

    for (i=0; i<packArr.length; i++) {
        if (packArr[i].name == priceChange) {
            packPrice = packArr[i].packPrice;
        }
    }
    
    totalPrice = ((basePrice + glazePrice) * packPrice).toFixed(2);
    document.getElementsByClassName('cart-price')[0].innerHTML = '$' + totalPrice;
}