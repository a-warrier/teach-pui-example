/* BunBun BakeShop Javascript for Dynamic Updation & Price Computation */

// creating a class for rolls
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
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

// iterating through each glaze and appending back to HTML
let glazeOptions = document.getElementById("glazing-options");
for (i=0; i<glazeArr.length; i++) {
    let glazeElement = document.createElement("option");
    glazeElement.textContent = glazeArr[i].name;
    glazeOptions.appendChild(glazeElement);
}

// iterating through each pack and appending back to HTML
let packOptions = document.getElementById("pack-options");
for (i=0; i < packArr.length; i++) {
    let packElement = document.createElement("option");
    packElement.textContent = packArr[i].name;
    packOptions.appendChild(packElement);
}

// extracting roll information
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');

// extracting base price for roll from the JSON
let basePrice = rolls[rollType].basePrice;

// update cart price for each roll
document.getElementsByClassName('cart-price')[0].innerHTML = '$' + basePrice;

let glazePrice = 0; // initializing default to 0
let packPrice = 1;  // multiplying, so making this default value as 1
let totalPrice = 0; // initializing default to 0

// calculating total price, now that base price is picked up dynamically
function totalChange(element) {
    const selectedName = element.value;

    for (i=0; i<glazeArr.length; i++) {
        if (glazeArr[i].name == selectedName) {
            glazePrice = glazeArr[i].glazePrice;
        }
    }

    for (i=0; i<packArr.length; i++) {
        if (packArr[i].name == selectedName) {
            packPrice = packArr[i].packPrice;
        }
    }

    totalPrice = ((basePrice + glazePrice) * packPrice).toFixed(2);
    document.getElementsByClassName('cart-price')[0].innerHTML = '$' + totalPrice;
}

// updating product detail page elements for roll dynamically

// extracting roll image details from the JSON
let rollImage = rolls[rollType].imageFile;

// update header for each roll
let headingElement = document.getElementById('heading');
headingElement.innerHTML = rollType + " Cinnamon Roll";

// update product detail image source path
let imageElement = document.getElementById('roll-img');
imageElement.src = './assets/products/' + rollImage;

// appending roll selected to cart
function addToCart(){
    let glazeOptions = document.getElementById('glazing-options');
    let packOptions = document.getElementById('pack-options');

    // getting text from option that was selected
    let rollGlazing = glazeOptions.options[glazeOptions.selectedIndex].text;
    let packSize = packOptions.options[packOptions.selectedIndex].text;

    let cart = [];

    /*  referred to the following link to understand how to make arrays that
        store the content (do not clear) even if we reload or close the page:
        https://stackoverflow.com/questions/55328748/how-to-store-and-retrieve-shopping-cart-items-in-localstorage
    */
    if(localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'));
    }

    // create new roll with current selections
    let newRoll = new Roll(rollType, rollGlazing, packSize, basePrice);

    // update cart with this new roll
    cart.push(newRoll);

    localStorage.setItem('cart', JSON.stringify(cart));

    //display updated cart as console log
    console.log('Updated Cart', cart);
}