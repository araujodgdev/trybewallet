import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: true,
      password: '',
      email: '',
    };
  }

  validateFields = (email, password) => {
    const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const validEmail = EMAIL_REGEX.test(email);
    const minPasswdLength = 6;
    const validPasswd = password.length >= minPasswdLength;
    return validEmail && validPasswd;
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        const { email, password } = this.state;
        if (this.validateFields(email, password)) {
          this.setState({
            disabled: false,
          });
          return;
        }
        this.setState({
          disabled: true,
        });
      },
    );
  };

  render() {
    document.title = 'Login';
    const { dispatch, history } = this.props;
    const { disabled, email, password } = this.state;
    return (
      <div>
        <form action="">
          <h1>
            Trybe
            <span>Wallet</span>
          </h1>
          <div>
            <label htmlFor="email">
              E-mail
              <input
                type="email"
                name="email"
                onChange={ (e) => this.handleChange(e) }
                value={ email }
                id="email"
                data-testid="email-input"
              />
            </label>
            <label htmlFor="password">
              Senha
              <input
                value={ password }
                name="password"
                type="password"
                onChange={ (e) => this.handleChange(e) }
                data-testid="password-input"
                minLength={ 6 }
              />
            </label>
            <button
              disabled={ disabled }
              onClick={ (e) => {
                e.preventDefault();
                dispatch(addEmail(email));
                history.push('/carteira');
              } }
              type="button"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
