import React, { Component } from 'react';
import Quantidade from '../Components/Quantidade';
import { Link } from 'react-router-dom';
import '../style/index.css'


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
      });
    }
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        <div class="header">
          <h1>Mercado Preço Mini</h1>
          <Link to="/" className='home-link'>Voltar</Link>
        </div>

        { products.length !== 0 && (
          <button>
            Finalizar compra
          </button>
        )}

        { products.length === 0 ? (
          <p>Seu carrinho está vazio</p>
        ) : (
          products.map((item) => (
            <div key={ item.id } className='cart-product-card'>
              <div>
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
