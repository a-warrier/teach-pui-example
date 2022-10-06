// HOMEWORK 5

// new array to store the 4 rolls
let cart = [];

// creating a class for rolls
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice, calculatedPrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
        this.calculatedPrice = calculatedPrice;
    }
}

// creating a class for glaze information
class Glaze {
    name;
    glazePrice;
    constructor(name, price) {
        this.name = name;
        this.glazePrice = price;
    }
}

// storing drop down glaze information
const original = new Glaze('Keep Original', 0.0);
const sugarMilk = new Glaze('Sugar Milk', 0.0);
const vanillaMilk = new Glaze('Vanilla Milk', 0.50);
const doubleChocolate = new Glaze('Double Chocolate', 1.50);

// creating a class for pack information
class Pack {
    name;
    packPrice;
    constructor(name, price) {
        this.name = name;
        this.packPrice = price;
    }
}

// storing drop down pack information
const pack1 = new Pack('1', 1);
const pack3 = new Pack('3', 3);
const pack6 = new Pack('6', 5);
const pack12 = new Pack('12', 10);

// saving all of the drop down elements as arrays
let glazeArr = [original, sugarMilk, vanillaMilk, doubleChocolate];
let packArr = [pack1, pack3, pack6, pack12];

let glazePrice = 0; // initializing default to 0
let packPrice = 1;  // multiplying, so making this default value as 1

// compute calculated price for each roll
function createRoll(rollType, rollGlazing, packSize) {
    // extracting price for given roll glazing
    for (i=0; i<glazeArr.length; i++) {
        if (glazeArr[i].name == rollGlazing) {
            glazePrice = glazeArr[i].glazePrice;
        }
    }

    // extracting price for given roll pack size
    for (i=0; i<packArr.length; i++) {
        if (packArr[i].name == packSize) {
            packPrice = packArr[i].packPrice;
        }
    }

    // extracting base price for roll from the JSON
    let basePrice = rolls[rollType].basePrice;

    let calculatedPrice = ((basePrice + glazePrice) * packPrice).toFixed(2);

    // create new roll with current selections
    const newRoll = new Roll(rollType, rollGlazing, packSize, basePrice, calculatedPrice);

    // update cart with this new roll
    cart.push(newRoll);

    //return roll with price data
    return newRoll;
}

// update the total price
function updateTotalPrice() {
    let totalPrice = 0;
    for (i=0; i<cart.length; i++) {
        totalPrice = totalPrice + parseFloat(cart[i].calculatedPrice);
    }
    const billTotalPriceElement = document.querySelector('.total-price');
    billTotalPriceElement.innerText = "$" + totalPrice.toFixed(2);
}

// function to remove each roll and update price
function removeRoll(billItemElement, roll) {
    billItemElement.remove();
    let idx = cart.indexOf(roll);
    /*  Reference: Removing specific items of array
        https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
    */
    if (idx > -1) { // only splice when roll is found
        cart.splice(idx, 1); // remove roll
    }
    updateTotalPrice();
}

//creating the bill

// creating the 4 rolls for initial cart updation
const originalRoll =  createRoll('Original', 'Sugar Milk', '1');
const walnutRoll = createRoll('Walnut', 'Vanilla Milk', '12');
const raisinRoll = createRoll('Raisin', 'Sugar Milk', '3');
const appleRoll = createRoll('Apple', 'Original', '3');

// DEBUGGING : updated cart with above rolls
// console.log(cart);

// updating template for each roll of cart
for (i=0; i<cart.length; i++) {
    const template = document.querySelector('#bill-template');
    const clone = template.content.cloneNode(true);
    let billItemElement = clone.querySelector('.bill-item');

    const btnRemove = billItemElement.querySelector('.remove-item');

    let roll = cart[i]; // saving each roll

    /*  Reference: Adding parameters for functions in addEventListener
        https://stackoverflow.com/questions/13570770/how-to-pass-some-parameters-to-function-called-in-addeventlistener
     */
    btnRemove.addEventListener('click', () => {
        removeRoll(billItemElement, roll);
    });

    const billElement = document.querySelector('#bill');
    billElement.append(billItemElement);

    const rollImageElement = billItemElement.querySelector('.item-img img'); //refers to image in HTML
    let rollImage = rolls[cart[i].type].imageFile; // extracting image name from JSON
    rollImageElement.src = './assets/products/' + rollImage;

    const rollTypeElement = billItemElement.querySelector('.roll-type');
    rollTypeElement.innerText = cart[i].type + " Cinnamon Roll";

    const rollGlazingElement = billItemElement.querySelector('.roll-glazing');
    rollGlazingElement.innerText = "Glazing: " + cart[i].glazing;

    const rollPackSizeElement = billItemElement.querySelector('.roll-packsize');
    rollPackSizeElement.innerText = "Pack size: " + cart[i].size;

    const rollPriceElement = billItemElement.querySelector('.roll-price');
    rollPriceElement.innerText = "$" + cart[i].calculatedPrice;
}

// update total price for the bill
updateTotalPrice();