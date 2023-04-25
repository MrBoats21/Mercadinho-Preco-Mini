import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Quantidade from '../Components/Quantidade';
import '../style/index.css';
import '../style/pages/Cart.css';

class Cart extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    const productList = JSON.parse(sessionStorage.getItem('productList'));
    this.getProductFromStorage();
    if (!productList) {
      console.log('Carrinho Vazio!');
    } else if (productList.length === 0) {
      sessionStorage.clear();
    }
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

  removeItem(id) {
    let productList = JSON.parse(sessionStorage.getItem('productList'));
    for (let i = 0; i < productList.length; i += 1) {
      const target = productList[i];
      if (target.id === id) {
        productList.splice(i, 1);
        break;
      }
    }

    productList = JSON.stringify(productList);
    console.log(productList[0].length);

    sessionStorage.setItem('productList', productList);
    window.location.reload();
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        <div className="header">
          <h1>Mercado Preço Mini</h1>
          <h3>Carrinho</h3>
          <Link to="/" className="home-link">
            <img
              alt="arrow"
              src="https://cdn-icons-png.flaticon.com/512/271/271220.png"
              className="arrow-icon"
            />
            Voltar
          </Link>
        </div>

        { products.length !== 0 && (
          <button
            className="checkout-btn"
            type="button"
            onClick={ () => {
              sessionStorage.clear();
              window.alert('Compra finalizada!'); // eslint-disable-line
              window.location.href = '/';
            } }
          >
            Finalizar compra
          </button>
        )}

        { products.length === 0 ? (
          <p className="empty-cart-message">Seu carrinho está vazio</p>
        ) : (
          products.map((item) => (
            <div key={ item.id }>
              <div className="cart-product-card">
                <img className="product-cart-img" src={ item.thumbnail } alt="Product" />
                <div className="product-cart-info">
                  <h3>{item.title}</h3>
                  <p><spam className="cart-price">{`R$ ${item.price}`}</spam></p>
                  <p>{`Quantidade disponível: ${item.available_quantity}`}</p>
                  <button
                    type="button"
                    className="remove-product-btn"
                    onClick={ () => this.removeItem(item.id) }
                  >
                    Remover
                  </button>
                  <Quantidade limit={ item.available_quantity } />
                </div>
              </div>
              <hr />
            </div>
          ))) }

      </div>
    );
  }
}

export default Cart;
