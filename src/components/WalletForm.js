import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense } from '../redux/actions';

const alimentacao = 'Alimentação';
class WalletForm extends Component {
  state = {
    newExpense: {
      description: '',
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,
      id: 0,
    },
    exchangeRates: {},
  };

  handleChange = ({ target: { name, value } }) => {
    const { newExpense } = this.state;
    this.setState({
      newExpense: {
        ...newExpense,
        [name]: value,
      },
    });
  };

  handleAddExpense = async () => {
    const res = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await res.json();
    delete data.USDT;
    this.setState(
      {
        exchangeRates: data,
      },
      () => {
        const { newExpense, exchangeRates } = this.state;
        const { dispatch } = this.props;
        dispatch(addExpense({ ...newExpense, exchangeRates }));
        this.setState((prevState) => ({
          newExpense: {
            description: '',
            value: '',
            currency: 'USD',
            method: 'Dinheiro',
            tag: alimentacao,
            id: prevState.newExpense.id + 1,
          },
        }));
      },
    );
  };

  render() {
    const { currencies } = this.props;
    const {
      newExpense: { description, currency, method, tag, value },
    } = this.state;
    const expensesCategories = [
      alimentacao,
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
            <input
              name="description"
              value={ description }
              onChange={ (e) => this.handleChange(e) }
              type="text"
              data-testid="description-input"
            />
          </label>
          <label htmlFor="value-input">
            Valor
            <input
              onChange={ (e) => this.handleChange(e) }
              name="value"
              min={ 0 }
              type="number"
              data-testid="value-input"
              value={ value }
            />
          </label>
          <label htmlFor="currency">
            Moeda
            <select
              onChange={ (e) => this.handleChange(e) }
              name="currency"
              value={ currency }
              data-testid="currency-input"
            >
              {currencies.map((code, index) => (
                <option name="currency-input" value={ code } key={ index }>
                  {code}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento
            <select
              onChange={ (e) => this.handleChange(e) }
              name="method"
              value={ method }
              data-testid="method-input"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria da despesa
            <select
              onChange={ (e) => this.handleChange(e) }
              name="tag"
              value={ tag }
              data-testid="tag-input"
            >
              {expensesCategories.map((categorie) => (
                <option value={ categorie } key={ categorie }>
                  {categorie}
                </option>
              ))}
            </select>
          </label>
        </section>
        <button type="button" onClick={ this.handleAddExpense }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet: { currencies, expenses } }) => ({
  currencies,
  expenses,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func.isRequired,
};

WalletForm.defaultProps = {
  currencies: [],
};

export default connect(mapStateToProps)(WalletForm);
