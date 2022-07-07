import React, { Component } from 'react';
import Message from '../components/Message';

export default class Home extends Component {
  state = {
    list: [],
  }

  render() {
    const { list } = this.state;
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

        { list.length === 0
          ? <Message />
          : console.log('A lista não está vazia') }
      </div>
    );
  }
}
