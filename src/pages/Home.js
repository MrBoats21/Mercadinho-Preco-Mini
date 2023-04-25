import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import '../style/index.css';
import '../style/pages/Home.css';

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
    if (JSON.parse(localStorage.getItem('firstVisit')) !== false) {
      localStorage.setItem('firstVisit', true);
    }
    if (JSON.parse(localStorage.getItem('firstVisit')) === true) {
      window.alert('Por conta de instabilidades na API, algumas poucas categorias e itens específicos podem não estar funcionando corretamente, caso algum erro aconteça, recarrregue a página ou volte para a página inicial.') // eslint-disable-line
    }
    localStorage.setItem('firstVisit', false);
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
      <div className="full-page">
        <div className="header">
          <h1>Mercado Preço Mini</h1>

          <div className="query-field">
            <input
              type="text"
              placeholder="Pesquisar"
              className="query-input"
              value={ search }
              onChange={ this.handleChange }
            />
            <label htmlFor="search">
              <input
                type="button"
                value="Buscar"
                onClick={ this.buttonClick }
                disabled={ search.length === 0 }
                className="query-button"
              />
            </label>
          </div>

          <Link
            to="/Cart"
            className="cart-field"
          >
            <img
              alt="cart-icon"
              src="https://cdn-icons-png.flaticon.com/512/126/126510.png"
              className="cart-icon"
            />
            Carrinho
          </Link>
        </div>
        <div>

          <aside>
            <div className="category-list">
              { categories.map((category) => (
                <button
                  className="category-btn btn"
                  type="button"
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
                <div className="product-card" key={ index }>
                  <div key={ index } className="product">
                    <Link
                      key={ index }
                      to={ `/details/${item.title}` }
                      className="product-detail-link"
                    >
                      <img
                        className="product-img"
                        src={ item.thumbnail }
                        alt="Product"
                      />
                    </Link>
                    <div className="product-info">
                      <h2 className="product-title">{item.title}</h2>
                      <div className="add-field">
                        <p className="price">{`R$${item.price}`}</p>
                        <button
                          type="button"
                          className="product-add-to-cart btn"
                          onClick={ this.saveOnStorage }
                          name={ item.title }
                        >
                          Adicionar ao carrinho
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          ) : (
            <p className="home-initial-message">
              Digite algum termo no campo de pesquisa ou escolha uma categoria.
            </p>
          ) }
        </div>
      </div>
    );
  }
}

export default Home;
