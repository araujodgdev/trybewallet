import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Title from './Title';

class Header extends Component {
  render() {
    const { email, expenses, currency } = this.props;
    const totalExpenses = expenses
      .map(
        (expense) => (
          parseFloat(expense.value)
           * parseFloat(expense.exchangeRates[expense.currency].ask)
        ),
      )
      .reduce((acc, crr) => acc + crr, 0);
    return (
      <header>
        <Title />
        <section className="expenses-container">
          <p>
            Total de Despesas:
            <span data-testid="total-field">
              {Number.parseFloat(totalExpenses).toFixed(2)}
            </span>
            <span data-testid="header-currency-field">{currency}</span>
          </p>
        </section>
        <p data-testid="email-field">{email}</p>
      </header>
    );
  }
}

const mapStateToProps = ({ user, wallet: { expenses } }) => ({
  email: user.email,
  expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  currency: PropTypes.string,
};

Header.defaultProps = {
  currency: 'BRL',
};

export default connect(mapStateToProps)(Header);
