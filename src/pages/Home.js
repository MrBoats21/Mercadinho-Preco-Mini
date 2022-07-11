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
      product: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    this.handleCategories = this.handleCategories.bind(this);
    this.saveOnStorage = this.saveOnStorage.bind(this);
    this.getProduct = this.getProduct.bind(this);
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

  async getProduct(id) {
    const product = await getProductsFromCategoryAndQuery(id, 'q');
    console.log(localStorage);
    const productDetails = product.results.find((item) => item.title === id);
    this.setState({ product: productDetails });
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

  async saveOnStorage({ target }) {
    // let counter = 0;
    const { name } = target;
    await this.getProduct(name);
    const { product } = this.state;
    const storage = sessionStorage;
    const intitial = JSON.parse(storage.getItem('productList'));
    // console.log(array);
    let array = [intitial];
    console.log(product);
    if (intitial === undefined || intitial === null) {
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
                  <div>
                    <Link
                      to="/Cart"
                    >
                      <button
                        type="button"
                        data-testid="product-add-to-cart"
                        onClick={ this.saveOnStorage }
                        name={ item.title }
                      >
                        Adicionar ao carrinho
                      </button>
                    </Link>
                  </div>
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
