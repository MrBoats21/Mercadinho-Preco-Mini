import React, { Component } from 'react';

export default class Cart extends Component {
state= {
  products: [],
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
        console.log('')) }
    </div>
  );
}
}
