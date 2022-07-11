import React, { Component } from 'react';

export default class Cart extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
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
