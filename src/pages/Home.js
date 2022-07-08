import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      list: undefined,
      categories: [],
      search: '',
      notFound: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    this.handleCategories = this.handleCategories.bind(this);
  }

  async componentDidMount() {
    const mlApi = await getCategories();
    console.log(mlApi);
    this.setState({ categories: mlApi });
  }

  handleChange({ target }) {
    const { value } = target;
    this.setState({ search: value });
    this.setState({ notFound: '' });
  }

  async handleCategories({ target }) {
    const { value } = target;
    const products = await getProductsFromCategoryAndQuery(value, 'q');
    console.log(products.results);
    const { results } = products;
    this.setState({ list: results });
  }

  async buttonClick() {
    const { search } = this.state;
    const products = await getProductsFromCategoryAndQuery(search, 'q');
    const { results } = products;
    this.setState({ list: results });
    console.log(results);
    if (results.length === 0) {
      this.setState({ notFound: 'Nenhum produto foi encontrado' });
    }
  }

  render() {
    const { list, categories, search, notFound } = this.state;
    return (
      <div>
        <input
          type="text"
          placeholder="Pesquisar"
          data-testid="query-input"
          value={ search }
          onChange={ this.handleChange }
        />
        <label htmlFor="search">
          <input
            type="button"
            value="Pesquisar"
            onClick={ this.buttonClick }
            data-testid="query-button"
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
        <aside>
          { categories.map((category) => (
            <button
              type="button"
              data-testid="category"
              key={ category.id }
              onClick={ this.handleCategories }
              value={ category.name }
            >
              { category.name }
            </button>
          ))}
        </aside>
        { list ? (
          <div>
            <h2>{notFound}</h2>
            {list.map((item, index) => (
              <Link
                key={ index }
                to={ `/details/${item.title}` }
                data-testid="product-detail-link"
              >
                <div key={ index } data-testid="product">
                  <h2>{item.title}</h2>
                  <img src={ item.thumbnail } alt="Product" />
                  <p>{`${item.price} R$`}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        ) }
      </div>
    );
  }
}

export default Home;
