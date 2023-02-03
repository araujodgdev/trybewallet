import React from 'react';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    document.title = 'Carteira';
    return (
      <div className="wallet-container">
        <Header />
      </div>
    );
  }
}

export default Wallet;
