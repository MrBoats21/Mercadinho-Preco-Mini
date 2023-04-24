import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import '../style/index.css'
import '../style/pages/Home.css'

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
    this.saveOnStorage = this.saveOnStorage.bind(this);
  }

  async componentDidMount() {
    const mlApi = await getCategories();
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
    const { results } = products;
    this.setState({ list: results });
  }

  async buttonClick() {
    const { search } = this.state;
    const products = await getProductsFromCategoryAndQuery(search, 'q');
    const { results } = products;
    this.setState({ list: results });
    if (results.length === 0) {
      this.setState({ notFound: 'Nenhum produto foi encontrado' });
    }
  }

  async saveOnStorage({ target }) {
    const { name } = target;
    const product = await getProductsFromCategoryAndQuery(name, 'q');
    const productDetails = product.results.find((item) => item.title === name);
    const storage = sessionStorage;
    const intitial = JSON.parse(storage.getItem('productList'));
    let array = [intitial];
    if (intitial === undefined || intitial === null) {
      array = [productDetails];
      storage.setItem('productList', JSON.stringify(array));
    } else {
      for (let index = 0; index < intitial.length; index += 1) {
        array[index] = intitial[index];
      }
      array.push(productDetails);
      storage.setItem('productList', JSON.stringify(array));
    }
  }

  render() {
    const { list, categories, search, notFound } = this.state;
    return (
      <div className='full-page'>
        <div className="header">
          <h1>Mercado Preço Mini</h1>
          <Link
            to="/Cart"
            className='cart-link'
          >
            <input
              type="button"
              data-testid="shopping-cart-button"
              value="carrinho"
            />
          </Link>
        </div>
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

          <aside>
            <h2>Categorias</h2>
            <div className='category-list'>
              { categories.map((category) => (
                <button
                  className="category-btn"
                  type="button"
                  data-testid="category"
                  key={ category.id }
                  onClick={ this.handleCategories }
                  value={ category.name }
                >
                  { category.name }
                </button>
              ))}
            </div>
          </aside>
          { list ? (
            <div>
              <h2>{notFound}</h2>
              {list.map((item, index) => (
                <>
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
                  <div>
                    <button
                      type="button"
                      data-testid="product-add-to-cart"
                      onClick={ this.saveOnStorage }
                      name={ item.title }
                    >
                      Adicionar ao carrinho
                    </button>
                  </div>
                </>
              ))}
            </div>
          ) : (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          ) }
        </div>
      </div>
    );
  }
}

export default Home;
