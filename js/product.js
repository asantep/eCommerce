// JS for product page

var queryString = location.search.split('?');
var productId = queryString[1];
var responseText = null;

var img_preview = $('#preview');
var preview_details = document.getElementById('preview-details');
var cart_button = document.getElementById('addToCart');
var cart_count = document.getElementById('cart_count');
var product_photos = $('.product_photo');
var cart_icon = $('.material-icons');

function createProductPreviewNode(response){
    var image = $('.img_preview');
    var imgPreview = $('#imgPre');
    imgPreview.attr('src',response.preview);
    image.append(imgPreview);
    return image;
}

function createImageNode(pos,scr) {
    var productPhotos = document.createElement('div');
    productPhotos.className = 'product_photo';
    let photo = document.createElement('img');
    photo.src = scr;
    if(pos === 0){
        photo.classList.add('active-photo');
    }
    photo.onclick = function (e) {
        e.preventDefault();
        $('.product_photo img').removeClass('active-photo');
        photo.classList.add('active-photo');
        $('#imgPre').attr('src',scr);
    }
    productPhotos.appendChild(photo);
    return productPhotos;
}

function createProductDetailNode(response) {
    var allDetails = document.getElementById('product_detail');

    var productName = document.getElementById('product_name');
    productName.innerText = response.name;
    allDetails.appendChild(productName);

    var productBrand = document.getElementById('product_brand');
    productBrand.innerText = response.brand;
    allDetails.appendChild(productBrand);

    var product_price = document.getElementById('product_price');
    var productPrice = document.getElementById('price');
    productPrice.innerText = response.price;
    product_price.appendChild(productPrice)
    allDetails.appendChild(product_price);

    var tag_name = document.getElementById('tag_name');
    var productDescription = document.getElementById('description_text');
    productDescription.innerText = response.description; 
    tag_name.appendChild(productDescription);  
    allDetails.appendChild(tag_name);   

    var previewTag = document.getElementById('previewTag');
    var photo_wrapper = document.getElementById('photo_wrapper');
    for (let i = 0; i < response.photos.length; i++) {
        const element = response.photos[i];

        photo_wrapper.appendChild(createImageNode(i,element));
        previewTag.appendChild(photo_wrapper);
        allDetails.appendChild(previewTag);
    }

    return allDetails;
}

function getProductDetails() {
    var productURL = 'https://5d76bf96515d1a0014085cf9.mockapi.io/product/'+productId;
    var http = new XMLHttpRequest();
    http.onreadystatechange = function(){
        if(this.readyState === 4){
            if (this.status === 200) {
                responseText = JSON.parse(this.responseText);
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

cart_button.addEventListener('click',()=>{
    //let counter =  parseInt(cart_count.innerText);

    var productList = window.localStorage.getItem('product-list');
    productList = productList === null || productList === '' ? [] : productList;
    productList = productList.length > 0 ? JSON.parse(productList) : [];
    var locatedAt = -1;
    for (var i = 0; i < productList.length; i++) {
        const element = parseInt(productList[i].id);
        if (element == parseInt(responseText.id)) {
            locatedAt = i;
        }        
    }
    
    if (locatedAt > -1) {
        productList[locatedAt].count =  productList[locatedAt].count + 1;
        window.localStorage.setItem('product-list', JSON.stringify(productList));        
    } else {
        responseText.count = 1;
        productList.push(responseText);
        window.localStorage.setItem('product-list', JSON.stringify(productList));
    }
    var totalCount = 0;
    for (let i = 0; i < productList.length; i++) {
        const element = productList[i].count; 
        totalCount = totalCount + productList.length;       
    }
    cart_count.innerText = totalCount;
});
cart_icon.click(()=>{
    document.location.href = '/pages/checkout.html';
});
