import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testes da página de login', () => {
  const email = 'test@mail.com';
  const password = '112233';

  test('A página de Login é renderizada corretamente', () => {
    renderWithRouterAndRedux(<App />);

    const title = screen.getByRole('heading', { name: /trybe wallet/i });
    const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
    const passwordInput = screen.getByLabelText(/senha/i);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    expect(title).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
  });

  test('É possível digitar nos campos de e-mail e senha', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
    const passwordInput = screen.getByLabelText(/senha/i);

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);

    expect(emailInput.value).toBe('test@mail.com');
    expect(passwordInput.value).toBe('112233');
  });

  test('Ao clicar no é redirecionado para a página da Wallet', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
    const passwordInput = screen.getByLabelText(/senha/i);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, '11223');

    expect(loginBtn.disabled).toBeTruthy();

    userEvent.type(passwordInput, password);
    userEvent.click(loginBtn);

    const { pathname } = history.location;

    expect(pathname).toBe('/carteira');
  });
});
