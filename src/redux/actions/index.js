// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DEL_EXPENSE = 'DEL_EXPENSE';

const CURRENCIES_API_URL = 'https://economia.awesomeapi.com.br/json/all';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

const saveCurrencies = (currencies) => ({
  type: SAVE_CURRENCIES,
  payload: Object.keys(currencies),
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const delExpense = (id) => ({
  type: DEL_EXPENSE,
  payload: parseFloat(id),
});

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(requestCurrencies());
    return fetch(CURRENCIES_API_URL)
      .then((res) => res.json())
      .then((data) => {
        delete data.USDT;
        dispatch(saveCurrencies(data));
      });
  };
}
