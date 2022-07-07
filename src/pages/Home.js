import React, { Component } from 'react';
import Message from '../components/Message';
import { getCategories } from '../services/api';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      categories: [],
    };
  }

  async componentDidMount() {
    const mlApi = await getCategories();
    console.log(mlApi);
    this.setState({ categories: mlApi });
  }

  render() {
    const { list, categories } = this.state;
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
        <aside>
          { categories.map((category) => (
            <button type="button" data-testid="category" key={ category.id }>
              { category.name }
            </button>
          ))}
        </aside>
        { list.length === 0
          ? <Message />
          : console.log('A lista não está vazia') }
      </div>
    );
  }
}
export default Home;
