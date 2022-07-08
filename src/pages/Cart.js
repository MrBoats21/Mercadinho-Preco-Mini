import React, { Component } from 'react';

export default class Cart extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
    };
  }

  getProductFromStorage() {
    const storage = sessionStorage;
    const productList = JSON.parse(storage.getItem('productList'));
    this.setState({
      products: productList,
    });
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
              {item.title}
            </div>
          ))) }
      </div>
    );
  }
}
