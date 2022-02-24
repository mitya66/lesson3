'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

 let getRequest = (url) => {
     return new Promise((resolve, reject) => {
         let xhr = new XMLHttpRequest();
         xhr.open("GET", url, true);
         xhr.onreadystatechange = () => {
             if(xhr.readyState === 4){
                 if(xhr.status !== 200){
                     reject('Error');
                 } else {
                     resolve(xhr.responseText);
                 }
             }
         };
         xhr.send();
    })
 };


class ProductList {
  constructor(container = '.products') {
    this._container = document.querySelector(container);
    this._goods = [];
    this._allProducts = [];

    this.getProducts()
        .then((data) => {
          this._goods = data;
          this._render();
        });

    // this._fetchGoods(); // DONT TOUCH PLZ
    // this._render();
  }

  // _fetchGoods() {
  //   console.log('fetching data...')
  //   getRequest(`${API}/catalogData.json`, (data) => {
  //     console.log('request complete');
  //     // console.log(data);
  //     this._goods = JSON.parse(data);
  //     this._render();
  //     console.log(this._goods);
  //   });
  // }

  sum() {
    return this._allProducts.reduce((sum, { price }) => sum + price, 0);
  }

  getProducts() {
   return fetch(`${API}/catalogData.json`)
       .then((response) => response.json())
       .catch((err) => console.log(err));
  }

  _render() {
    console.log('rendering data...');
    for (const product of this._goods) {
      const productObject = new ProductItem(product);

      this._allProducts.push(productObject);
      this._container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
    }
  }
}

class ProductItem {
  constructor(product, img = 'https://via.placeholder.com/200x150') {
    this.id = product.id;
    this.title = product.title;
    this.price = product.price;
    this.img = img;
  }

  getHTMLString() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
  }
}

new ProductList();

fetch("https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json")
    .then(text => text.json())
    .then(data => {
        document.querySelector('.btn-cart')
        .insertAdjacentHTML('beforeend', `<p>${data.contents[0].id_product},
    ${data.contents[0].product_name}, ${data.contents[0].price}, ${data.contents[0].quantity}</p>`)
         document.querySelector('.btn-cart')
         .insertAdjacentHTML('beforeend', `<p>${data.contents[1].id_product},
    ${data.contents[1].product_name}, ${data.contents[1].price}, ${data.contents[1].quantity}</p>`)
    });