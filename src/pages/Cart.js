import React, { Component } from 'react';

export default class Cart extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
      product: {},
    };
  }

  componentDidMount() {
    this.getProductFromStorage();
  }

  getProductFromStorage() {
    const storage = sessionStorage;
    const productList = JSON.parse(storage.getItem('productList'));
    if (productList) {
      this.setState({
        products: productList,
      });
    }
  }

  saveOnStorage = () => {
    // let counter = 0;
    const { product } = this.state;
    const storage = sessionStorage;
    const intitial = JSON.parse(storage.getItem('productList'));
    // console.log(array);
    let array = [intitial];
    if (intitial === undefined || intitial === null) {
      console.log(product);
      array = [product];
      storage.setItem('productList', JSON.stringify(array));
    } else {
      for (let index = 0; index < intitial.length; index += 1) {
        array[index] = intitial[index];
      }
      array.push(product);
      storage.setItem('productList', JSON.stringify(array));
    }
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        { products.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        ) : (
          products.map((item, index) => (
            <div key={ index }>
              <h3 data-testid="shopping-cart-product-name">{item.title}</h3>
              <img src={ item.thumbnail } alt="Product" />
              <p>{`${item.price} R$`}</p>
              <p>{`Quantidade disponível: ${item.available_quantity}`}</p>
              <p data-testid="shopping-cart-product-quantity">1</p>
            </div>
          ))) }
      </div>
    );
  }
}
