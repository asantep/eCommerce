// JS for product page

var queryString = location.search.split('?');
var productId = queryString[1];

var img_preview = $('#preview');
var imgPreview = document.createElement('img');
var preview_details = document.getElementById('preview-details');
var cart_button = document.getElementById('addToCart');
var cart_count = document.getElementById('cart_count');
var products = document.getElementById('product_photo');
var cart_icon = $('.material-icons');

cart_button.addEventListener('click',()=>{
    let counter =  parseInt(cart_count.innerText);
    cart_count.innerText = ++counter;
});
cart_icon.click(()=>{
    document.location.href = '/pages/checkout.html';
});

function updateProductImage(newSrc) {
    
}

function createProductPreviewNode(response){
    var image = document.createElement('div');
    image.className = 'img_preview';
    imgPreview.src = response.preview;
    image.appendChild(imgPreview);
    return image;
}

function createProductDetailNode(response) {
    var allDetails = document.createElement('div');
    allDetails.className = 'product_detail';

    var productName = document.createElement('h3');
    productName.className = 'product_name';
    let productNameText = document.createTextNode(response.name);
    productName.appendChild(productNameText);
    allDetails.appendChild(productName);

    var productBrand = document.createElement('span');
    productBrand.className = 'product_brand';
    let productBrandText = document.createTextNode(response.brand);
    productBrand.appendChild(productBrandText);
    allDetails.appendChild(productBrand);

    var productPrice = document.createElement('p');
    productPrice.className = 'product_price';
    let productPriceText = document.createTextNode('Price: Rs '+response.price);
    productPrice.appendChild(productPriceText);
    allDetails.appendChild(productPrice);

    var descriptionTag = document.createElement('h4');
    descriptionTag.className = 'tag_name';
    var tagText = document.createTextNode('Description');
    descriptionTag.appendChild(tagText);
    allDetails.appendChild(descriptionTag);

    var productDescription = document.createElement('p');
    productDescription.className = 'description_text';
    let productDescriptionText = document.createTextNode(response.description);
    productDescription.appendChild(productDescriptionText);
    allDetails.appendChild(productDescription);

    var productPreviewTag = document.createElement('h4');
    productPreviewTag.className = 'previewTag';
    var previewTagText = document.createTextNode('Product Preview');
    productPreviewTag.appendChild(previewTagText);
    allDetails.appendChild(productPreviewTag);
    
    var productPhotos = document.createElement('div');
    productPhotos.id = 'product_photo';
    for (let i = 0; i < response.photos.length; i++) {
        const element = response.photos[i];
        let photo_wrapper = document.createElement('div');
        //photo_wrapper.className = 'photos'
        let photo = document.createElement('img')
        //photo.className = 'photos';
        photo.src = element;
        photo_wrapper.appendChild(photo);
        productPhotos.appendChild(photo_wrapper);
        allDetails.appendChild(productPhotos);
    }    

    return allDetails;
}

function getProductDetails() {
    var productURL = 'https://5d76bf96515d1a0014085cf9.mockapi.io/product/'+productId;
    var http = new XMLHttpRequest();
    http.onreadystatechange = function(){
        if(this.readyState === 4){
            if (this.status === 200) {
                var responseText = JSON.parse(this.responseText);
                img_preview.append(createProductPreviewNode(responseText)); 
                preview_details.insertBefore(createProductDetailNode(responseText),cart_button);                                           
            } else {
                console.log('Items loading error');
            }
        }
    };
    http.open('GET',productURL,true);
    http.send();
}

getProductDetails();