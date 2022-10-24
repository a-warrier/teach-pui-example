// HOMEWORK 6

// array to store the rolls
let cart = JSON.parse(localStorage.getItem('cart'));

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

let glazeDict = {
    "Keep Original": 0,
    "Sugar Milk": 0,
    "Vanilla Milk": 0.5,
    "Double chocolate": 1.5
}

let packDict = {
    "1": 1,
    "3": 3,
    "6": 5,
    "12": 10
}

let glazePrice = 0; // initializing default to 0
let packPrice = 1;  // multiplying, so making this default value as 1

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
    localStorage.setItem('cart', JSON.stringify(cart));

    // update total price after deletion
    updateTotalPrice();

    //display updated cart as console log
    console.log('Updated Cart', cart);
}

// updating template for each roll of cart
for (i=0; i<cart.length; i++) {
    const template = document.querySelector('#bill-template');
    const clone = template.content.cloneNode(true);
    let billItemElement = clone.querySelector('.bill-item');

    // remove selected roll from the cart
    const btnRemove = billItemElement.querySelector('.remove-item');

    let roll = cart[i]; // saving each roll

    /*  Reference: Adding parameters for functions in addEventListener
        https://stackoverflow.com/questions/13570770/how-to-pass-some-parameters-to-function-called-in-addeventlistener
     */
    btnRemove.addEventListener('click', () => {
        removeRoll(billItemElement, roll);
    });

    // append bill with new roll element
    const billElement = document.querySelector('#bill');
    billElement.append(billItemElement);

    // roll image for template
    const rollImageElement = billItemElement.querySelector('.item-img img'); //refers to image in HTML
    let rollImage = rolls[cart[i].type].imageFile; // extracting image name from JSON
    rollImageElement.src = './assets/products/' + rollImage;

    // roll type for template
    const rollTypeElement = billItemElement.querySelector('.roll-type');
    rollTypeElement.innerText = cart[i].type + " Cinnamon Roll";

    // roll glazing for template
    const rollGlazingElement = billItemElement.querySelector('.roll-glazing');
    rollGlazingElement.innerText = "Glazing: " + cart[i].glazing;

    // roll pack size for template
    const rollPackSizeElement = billItemElement.querySelector('.roll-packsize');
    rollPackSizeElement.innerText = "Pack size: " + cart[i].size;

    // rollPrice = (basePrice + glazePrice) * packPrice
    let rollPrice = (cart[i].basePrice + glazeDict[cart[i].glazing])*packDict[cart[i].size];
    cart[i].calculatedPrice = rollPrice.toFixed(2);
    const rollPriceElement = billItemElement.querySelector('.roll-price');
    rollPriceElement.innerText = "$" + cart[i].calculatedPrice;
}

// update total price for the bill
updateTotalPrice();