import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';
import '../style/pages/Details.css';

class Details extends React.Component {
  constructor() {
    super();

    this.state = {
      product: {},
    };

    this.getProduct = this.getProduct.bind(this);
    this.saveOnStorage = this.saveOnStorage.bind(this);
  }

  componentDidMount() {
    this.getProduct();
  }

  async getProduct() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const product = await getProductsFromCategoryAndQuery(id, 'q');
    console.log(localStorage);
    const productDetails = product.results.find((item) => item.title === id);
    this.setState({ product: productDetails });
  }

  saveOnStorage() {
    const { product } = this.state;
    const storage = sessionStorage;
    const intitial = JSON.parse(storage.getItem('productList'));
    let array = [intitial];
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
    const { product } = this.state;
    return (
      <div>
        <div className="header">
          <h1>Mercado Preço Mini</h1>
          <h3>Detalhes do Produto</h3>
          <Link to="/" className="home-link">
            <img
              alt="arrow"
              src="https://cdn-icons-png.flaticon.com/512/271/271220.png"
              className="arrow-icon"
            />
            Voltar
          </Link>
        </div>

        <div className="details-body">
          <img className="details-img" src={ product.thumbnail } alt="Product" />
          <div className="details-info">
            <h1 className="product-detail-name">{product.title}</h1>
            <p>{`R$ ${product.price}`}</p>
            <p>{`Quantidade disponível: ${product.available_quantity}`}</p>
            <p>{`Código do produto: ${product.id}`}</p>
            <Link
              to="/Cart"
            >
              <button
                type="button"
                className="product-detail-add-to-cart btn"
                onClick={ this.saveOnStorage }
              >
                Adicionar ao carrinho
              </button>
            </Link>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Details;
