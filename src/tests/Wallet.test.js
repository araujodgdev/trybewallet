import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testa a página da carteira', () => {
  const email = 'test@mail.com';
  const password = '112233';
  const expense = {
    description: 'Cinema',
    currency: 'CAD',
    method: 'Cartão de crédito',
    tag: 'Lazer',
  };

  test('A página é renderizada corretamente', () => {
    const columnHeaders = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
    const passwordInput = screen.getByLabelText(/senha/i);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.click(loginBtn);

    expect(screen.getByRole('heading', { name: /trybe wallet/i }));
    expect(screen.getByText('test@mail.com')).toBeInTheDocument();

    columnHeaders.forEach((colHeader) => expect(screen.getByRole('columnheader', { name: colHeader })));

    const descriptionInput = screen.getByLabelText(/descrição da despesa/i);
    const valueInput = screen.getByLabelText(/valor/i);
    const currencyInput = screen.getByLabelText(/moeda/i);
    const methodInput = screen.getByLabelText(/método de pagamento/i);
    const tagInput = screen.getByLabelText(/categoria da despesa/i);

    expect(descriptionInput).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
  });

  test('É possível adicionar uma despesa ao estado global', async () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    const descriptionInput = screen.getByLabelText(/descrição da despesa/i);
    const valueInput = screen.getByLabelText(/valor/i);
    const currencySelect = await screen.findByLabelText(/moeda/i);
    const methodSelect = screen.getByLabelText(/método de pagamento/i);
    const tagSelect = screen.getByLabelText(/categoria da despesa/i);
    const addBtn = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(descriptionInput).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(currencySelect).toBeInTheDocument();
    expect(methodSelect).toBeInTheDocument();
    expect(tagSelect).toBeInTheDocument();
    expect(addBtn).toBeInTheDocument();

    const currency = await screen.findByText(expense.currency);

    userEvent.type(descriptionInput, expense.description);
    userEvent.type(valueInput, '20');
    await userEvent.selectOptions(currencySelect, currency);
    userEvent.selectOptions(methodSelect, screen.getByText(expense.method));
    userEvent.selectOptions(tagSelect, screen.getByText(expense.tag));
    userEvent.click(addBtn);
  });
});
