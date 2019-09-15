$(document).ready(()=>{
    $('#slide-show .slick').slick({
        autoplay: true,
        fade: true,
        autoplaySpeed: 2000,
        speed: 2000,
        dots: true,
    });
});

var clothing = document.getElementById('cloth-items');
var accessories = document.getElementById('gadgets');

function createProductNode(item_name, item_brand, item_photo, item_price, item_id) {
    var anchor = document.createElement('a');
    anchor.href = '/pages/product.html?'+ item_id;
    anchor.className = 'anchor';
    var newClothingDiv = document.createElement('div');
    newClothingDiv.className = 'list-items';
    var newClothingImg = document.createElement('img');
    var newClothingNameP = document.createElement('h5');
    newClothingNameP.className = 'item-names';
    var newClothingPriceP = document.createElement('p');
    newClothingPriceP.className = 'item-prices';
    var newClothingBrandP = document.createElement('p');
    newClothingBrandP.className = 'item-brands';

    newClothingImg.src = item_photo;
    newClothingDiv.appendChild(newClothingImg);

    let nameText = document.createTextNode(item_name);
    newClothingNameP.appendChild(nameText);
    newClothingDiv.appendChild(newClothingNameP);

    let brandText = document.createTextNode(item_brand);
    newClothingBrandP.appendChild(brandText);
    newClothingDiv.appendChild(newClothingBrandP);

    let priceText = document.createTextNode(item_price);
    newClothingPriceP.appendChild(priceText);
    newClothingDiv.appendChild(newClothingPriceP);

    anchor.appendChild(newClothingDiv);

    return anchor;
}

function getItemsForHomepage(){
    var product_url = "https://5d76bf96515d1a0014085cf9.mockapi.io/product"
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                var responseText = JSON.parse(this.responseText);
                for (let i = 0; i < responseText.length; i++) {
                    const element = responseText[i];
                    let item_name = element.name;
                    let item_price = 'Rs ' + element.price;
                    let item_brand = element.brand;
                    let item_id = element.id;
                    let item_photo = element.preview;
                    if (element.isAccessory != true) {
                        clothing.appendChild(createProductNode(item_name,item_brand,item_photo,item_price,item_id));
                    } else {
                        accessories.appendChild(createProductNode(item_name,item_brand,item_photo,item_price,item_id));
                    }                    
                }          
            } else {
                console.log("Call failed")
            }
              
        } 
    };
    http.open('GET',product_url,true);
    http.send();
}

getItemsForHomepage();