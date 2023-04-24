import React, { Component } from 'react';
import '../style/Quantidade.css'

class Quantidade extends Component {
  constructor() {
    super();
    this.state = { quantity: 1, disable: false };
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }

  increase = () => {
    this.setState({ disable: false });
    this.setState((prevState) => ({ quantity: prevState.quantity + 1 }));
  }

  decrease = () => {
    const { quantity } = this.state;
    if (quantity === 1) {
      this.setState({ disable: true });
    } else {
      this.setState((prevState) => ({ quantity: prevState.quantity - 1 }));
    }
  }

  render() {
    const { disable, quantity } = this.state;
    return (
      <div className='qty-controller'>

        <button
          onClick={ this.increase }
          name="increase"
          type="button"
          data-testid="product-increase-quantity"
          value="+"
        >
          +
        </button>
        <p data-testid="shopping-cart-product-quantity">{ `${quantity}` }</p>
        <button
          onClick={ this.decrease }
          name="decrease"
          type="button"
          data-testid="product-decrease-quantity"
          value="-"
          disabled={ disable }
        >
          -
        </button>
      </div>
    );
  }
}

export default Quantidade;
