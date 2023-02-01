import React from 'react';

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
    this.setState({
      [name]: value,
    }, () => {
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
    });
  };

  render() {
    document.title = 'TrybeWallet - Login';
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
            <button disabled={ disabled } type="submit">
              Entrar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
