import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style/Quantidade.css';

class Quantidade extends Component {
  constructor() {
    super();
    this.state = { quantity: 1 };
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }

  increase = () => {
    this.setState((prevState) => ({ quantity: prevState.quantity + 1 }));
  }

  decrease = () => {
    this.setState((prevState) => ({ quantity: prevState.quantity - 1 }));
  }

  render() {
    const { quantity } = this.state;
    const { limit } = this.props;
    return (
      <div className="qty-controller">

        <button
          onClick={ this.increase }
          name="increase"
          type="button"
          className="control-btn"
          value="+"
          disabled={ quantity >= limit }
        >
          +
        </button>
        <p className="shopping-cart-product-quantity">{ `${quantity}` }</p>
        <button
          onClick={ this.decrease }
          name="decrease"
          type="button"
          className="control-btn"
          value="-"
          disabled={ quantity <= 1 }
        >
          -
        </button>
      </div>
    );
  }
}

Quantidade.propTypes = {
  limit: PropTypes.number.isRequired,
};

export default Quantidade;
