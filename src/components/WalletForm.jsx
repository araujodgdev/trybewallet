import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense, editExpense } from '../redux/actions';
import { generateExpenseObject } from '../services/wallet';
import Table from './Table';

const alimentacao = 'Alimentação';
class WalletForm extends Component {
  state = {
    editingExpense: false,
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

  handleEditBtn = (id) => {
    this.setState({
      newExpense: generateExpenseObject(id),
      editingExpense: true,
    });
  };

  handleEdit = (id) => {
    const { newExpense, exchangeRates } = this.state;
    const { expenses, dispatch } = this.props;
    const indexToBeEdited = expenses.indexOf(
      expenses.find((expense) => expense.id === id),
    );
    expenses.splice(indexToBeEdited, 1, { ...newExpense, exchangeRates });
    dispatch(editExpense(expenses));
    this.setState({
      editingExpense: false,
      newExpense: {
        description: '',
        value: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: alimentacao,
        id: expenses.length,
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
      editingExpense,
    } = this.state;
    const expensesCategories = [
      alimentacao,
      'Lazer',
      'Trabalho',
      'Transporte',
      'Saúde',
    ];
    return (
      <>
        <form action="POST">
          <label htmlFor="description">
            Descrição da despesa
            <input
              name="description"
              id="description"
              value={ description }
              onChange={ (e) => this.handleChange(e) }
              type="text"
              data-testid="description-input"
            />
          </label>
          <label htmlFor="value">
            Valor
            <input
              onChange={ (e) => this.handleChange(e) }
              name="value"
              id="value"
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
              id="currency"
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
              id="method"
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
              id="tag"
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
          <button
            type="button"
            onClick={ () => {
              const { newExpense: { id } } = this.state;
              if (editingExpense === true) return this.handleEdit(id);
              return this.handleAddExpense();
            } }
          >
            {editingExpense ? 'Editar despesa' : 'Adicionar despesa'}
          </button>
        </form>
        <Table handleEditBtn={ this.handleEditBtn } />
      </>
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
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

WalletForm.defaultProps = {
  currencies: [],
};

export default connect(mapStateToProps)(WalletForm);
