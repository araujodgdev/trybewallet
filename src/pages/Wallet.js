import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    document.title = 'Carteira';
    const { email } = this.props;
    return (
      <div>
        <p>TrybeWallet</p>
        <p>{ email }</p>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  email: user.email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
