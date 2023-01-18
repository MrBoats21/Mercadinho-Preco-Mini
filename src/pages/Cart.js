import React, { Component } from 'react';
import Quantidade from '../Components/Quantidade';

class Cart extends Component {
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
      // productsQuantities: [],
      });
    }
  }

  render() {
    const { products } = this.state;
    console.log(products);
    return (
      <div>
        { products.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        ) : (
          products.map((item) => (
            <div key={ item.id }>
              <div data-testid="shopping-cart-product-name">
                <h3>{item.title}</h3>
              </div>
              <img src={ item.thumbnail } alt="Product" />
              <p>{`${item.price} R$`}</p>
              <p>{`Quantidade disponível: ${item.available_quantity}`}</p>
              <Quantidade />
            </div>
          ))) }
      </div>
    );
  }
}

export default Cart;
