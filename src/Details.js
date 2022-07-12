import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from './services/api';

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
    // let counter = 0;
    const { product } = this.state;
    const storage = sessionStorage;
    const intitial = JSON.parse(storage.getItem('productList'));
    // console.log(array);
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
        <Link
          to="/Cart"
          data-testid="shopping-cart-button"
        >
          <input
            type="button"
            value="carrinho"
          />

        </Link>

        <h1 data-testid="product-detail-name">{product.title}</h1>
        <img src={ product.thumbnail } alt="Product" />
        <p>{`${product.price} R$`}</p>
        <p>{`Quantidade disponível: ${product.available_quantity}`}</p>
        <p>{`Código do produto: ${product.id}`}</p>
        <Link
          to="/Cart"
        >
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ this.saveOnStorage }
          >
            Adicionar ao carrinho
          </button>
        </Link>
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
