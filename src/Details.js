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
  }

  componentDidMount() {
    this.getProduct();
  }

  async getProduct() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const product = await getProductsFromCategoryAndQuery(id, 'q');
    console.log(product.results[0]);
    const productDetails = product.results.find((item) => item.title === id);
    this.setState({ product: productDetails });
  }

  render() {
    const { product } = this.state;
    return (
      <div>
        <Link
          to="/Cart"
        >
          <input
            type="button"
            data-testid="shopping-cart-button"
            value="carrinho"
          />

        </Link>
        <h1 data-testid="product-detail-name">{product.title}</h1>
        <img src={ product.thumbnail } alt="Product" />
        <p>{`${product.price} R$`}</p>
        <p>{`Quantidade disponível: ${product.available_quantity}`}</p>
        <p>{`Código do produto: ${product.id}`}</p>
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
