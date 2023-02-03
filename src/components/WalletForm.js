import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletForm extends Component {
  render() {
    const { currencies } = this.props;
    const expensesCategories = [
      'Alimentação',
      'Lazer',
      'Trabalho',
      'Transporte',
      'Saúde',
    ];
    return (
      <form action="POST">
        <section className="inputs-container">
          <label htmlFor="description-input">
            Descrição da despesa
            <input type="text" data-testid="description-input" />
          </label>
          <label htmlFor="value-input">
            Valor
            <input min={ 0 } type="number" data-testid="value-input" />
          </label>
          <label htmlFor="currency-input">
            Moeda
            <select name="currency-input" data-testid="currency-input">
              {currencies.map((code, index) => (
                <option name="currency-input" value={ code } key={ index }>
                  {code}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method-input">
            Método de pagamento
            <select name="method-input" data-testid="method-input">
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de Crédito">Cartão de crédito</option>
              <option value="Cartão de Débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Categoria da despesa
            <select name="tag-input" data-testid="tag-input">
              {expensesCategories.map((tag) => (
                <option value={ tag } key={ tag }>
                  {tag}
                </option>
              ))}
            </select>
          </label>
        </section>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet: { currencies } }) => ({
  currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
};

WalletForm.defaultProps = {
  currencies: [],
};

export default connect(mapStateToProps)(WalletForm);
