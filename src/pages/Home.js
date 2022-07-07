import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      categories: [],
    };
  }

  async componentDidMount() {
    const mlApi = await getCategories();
    console.log(mlApi);
    this.setState({ categories: mlApi });
  }

  render() {
    const { list, categories } = this.state;
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
        <aside>
          { categories.map((category) => (
            <button type="button" data-testid="category" key={ category.id }>
              { category.name }
            </button>
          ))}
        </aside>
      </div>
    );
  }
}
export default Home;
