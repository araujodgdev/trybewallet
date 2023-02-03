// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';

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
  payload: currencies,
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
