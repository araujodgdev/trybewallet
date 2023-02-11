import store from '../redux/store';

export function getExpenseFromState(id) {
  const { expenses } = store.getState().wallet;
  return expenses.find((expense) => expense.id.toString() === id);
}

export function generateExpenseObject(id) {
  const { description, currency, value, tag, method } = getExpenseFromState(id);
  const expenseObject = {
    description,
    value,
    currency,
    method,
    tag,
    id: parseFloat(id),
  };
  return expenseObject;
}
