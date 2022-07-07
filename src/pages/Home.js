import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  state = {
    list: [],
  }

  render() {
    const { list } = this.state;
    return (
      <div>
        <input
          type="text"
          placeholder="Pesquisar"
        />
        <label htmlFor="search">
          <input
            type="button"
            value="Pesquisar"
          />
        </label>
        <Link
          to="/Cart"
        >
          <input
            type="button"
            data-testid="shopping-cart-button"
            value="carrinho"
          />

        </Link>

        { list.length === 0 ? (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        ) : (
          console.log('A lista não está vazia')) }
      </div>
    );
  }
}
