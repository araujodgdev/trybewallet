import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Title from './Title';

class Header extends Component {
  render() {
    const { email, expanses, currency } = this.props;
    return (
      <header>
        <Title />
        <section className="expanses-container">
          <p data-testid="total-field">
            Total de Despesas:
            {expanses}
            <span data-testid="header-currency-field">{currency}</span>
          </p>
        </section>
        <p data-testid="email-field">{email}</p>
      </header>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  email: user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expanses: PropTypes.number,
  currency: PropTypes.string,
};

Header.defaultProps = {
  expanses: 0,
  currency: 'BRL',
};

export default connect(mapStateToProps)(Header);
