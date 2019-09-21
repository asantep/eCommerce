var productList = window.localStorage.getItem('product-list');
productList = productList === null || productList === '' ? [] : productList;
productList = productList.length > 0 ? JSON.parse(productList) : [];

var totalCount = 0;
    for (let i = 0; i < productList.length; i++) {
        const element = productList[i].count; 
        totalCount = totalCount + productList.length;       
    }
cart_count.innerText = totalCount;