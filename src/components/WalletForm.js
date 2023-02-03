import React, { Component } from 'react';

class WalletForm extends Component {
  render() {
    return (
      <form action="POST">
        <section className="inputs-container">
          <label htmlFor="description-input">
            Descrição da despesa
            <input type="text" data-testid="description-input" />
          </label>
          <label htmlFor="value-input">
            Valor
            <input type="number" data-testid="value-input" />
          </label>
          {/* <label htmlFor="currency-input">
            Moeda
            <select name="currency-input" data-testid="currency-input">
            </select>
          </label> */}
        </section>
      </form>
    );
  }
}

export default WalletForm;
