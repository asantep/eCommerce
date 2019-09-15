var checkout = document.getElementById('checked_items');
var total_qty = document.getElementById('total_qty');
var cart_count = document.getElementById('cart_count');
var total_amount = document.getElementById('total_amount');
var place_order = document.getElementById('place_order');

function createItemsNode(price,imgSrc,crdName,crdQty) {
    var totalItemsElement = document.createElement('div');

    var itemCardElement = document.createElement('div');
    itemCardElement.className = 'card_element';

    var cardImage = document.createElement('img');
    cardImage.className = 'card_image';
    cardImage.src = imgSrc;
    itemCardElement.appendChild(cardImage);

    var cardDetails = document.createElement('div');
    cardDetails.className = 'card_details';

    var cardName = document.createElement('h5');
    cardName.className = 'card_name';
    var cardNameText = document.createTextNode(crdName);
    cardName.appendChild(cardNameText);
    cardDetails.appendChild(cardName);
    itemCardElement.appendChild(cardDetails);

    var cardQty = document.createElement('p');
    cardQty.className = 'card_qty';
    var cardQtyText = document.createTextNode(crdQty);
    cardQty.appendChild(cardQtyText);
    cardDetails.appendChild(cardQty);
    itemCardElement.appendChild(cardDetails);

    var cardAmount = document.createElement('p');
    cardAmount.className = 'card_amount';
    var cardAmountText = document.createTextNode('Amount: Rs '+price)
    cardAmount.appendChild(cardAmountText);
    cardDetails.appendChild(cardAmount);
    itemCardElement.appendChild(cardDetails);

    totalItemsElement.appendChild(itemCardElement);
    return totalItemsElement;
}

function addAmountNode(prices) {   
    var sum = 0;
    for (var i = 0; i < prices.length; i++) {
        sum += prices[i];
    }
    return sum;
}
var products = [];

function getCheckedoutItem() {
    var productURL = 'https://5d76bf96515d1a0014085cf9.mockapi.io/product'
    var http = new XMLHttpRequest();
    http.onreadystatechange = function(){
        if (this.readyState === 4) {
            if (this.status === 200) {
                var responseText = JSON.parse(this.responseText);
                total_qty.innerText = total_qty.innerText + "5";
                cart_count.innerText = 5;
                var prices = [];
                var names = [];
                var images = [];
                var preview = [];
                var brand = [];
                var description = [];
                var isAccessory = [];
                var size = [];
                var id = [];
                var product_item = [];
                for (let i = 2; i < 7; i++) {
                    const element = responseText[i];          
                    let item_name = element.name;
                    let item_img = element.preview;
                    let item_price = element.price;
                    let item_qty = '1x';
                    prices.push(item_price);
                    names.push(item_name);
                    images.push(element.photos);
                    preview.push(element.preview);
                    brand.push(element.brand);
                    description.push(element.description);
                    isAccessory.push(element.isAccessory);
                    size.push(element.size);
                    id.push(element.id);
                    product_item = [prices,names,images,preview,brand,description,isAccessory,size,id];                                       
                    checkout.appendChild(createItemsNode(item_price,item_img,item_name,item_qty));                    
                }                
            } else {
                console.log('Contact Administator, data unable to load');                
            }
            total_amount.innerText = addAmountNode(prices);
            products.push(product_item);
        }
    };

    http.open('GET',productURL,true);
    http.send();
}
getCheckedoutItem();

place_order.addEventListener('click',function () {
    postCheckedoutItems();
})

function postCheckedoutItems() {
    console.log('clicked');
    var orderURL = 'https://5d76bf96515d1a0014085cf9.mockapi.io/order';
    var http = new XMLHttpRequest();
    
    http.onreadystatechange = function(){
        if (this.readyState === 4) {
            if (this.status === 201) {
                document.location.href = '/pages/order.html';
            } else{
                console.log('Contact Admin. Unable to save');                
            }
        }
    }

    http.open('POST',orderURL,true);
    var response = JSON.stringify({
        amount: total_amount.innerText,
        products: products
    });        
    http.send(response);
}