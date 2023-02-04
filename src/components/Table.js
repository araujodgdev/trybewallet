import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    const expensesData = expenses.map((expense) => (
      <tr key={ expense.id }>
        <td>{expense.description}</td>
        <td>{expense.tag}</td>
        <td>{expense.method}</td>
        <td>{parseFloat(expense.value).toFixed(2)}</td>
        <td>{expense.exchangeRates[expense.currency].name}</td>
        <td>{parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
        <td>
          {(parseFloat(expense.value)
            * parseFloat(expense.exchangeRates[expense.currency].ask)).toFixed(2)}
        </td>
        <td>Real</td>
      </tr>
    ));
    return (
      <table>
        <thead>
          <tr><th>Descrição</th></tr>
          <tr><th>Tag</th></tr>
          <tr><th>Método de pagamento</th></tr>
          <tr><th>Valor</th></tr>
          <tr><th>Moeda</th></tr>
          <tr><th>Câmbio utilizado</th></tr>
          <tr><th>Valor convertido</th></tr>
          <tr><th>Moeda de conversão</th></tr>
          <tr><th>Editar/Excluir</th></tr>
        </thead>
        <tbody>{expensesData}</tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})),
};

Table.defaultProps = {
  expenses: [],
};

export default connect(mapStateToProps)(Table);
