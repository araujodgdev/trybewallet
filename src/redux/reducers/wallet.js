// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SAVE_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: {},
};

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SAVE_CURRENCIES:
    return {
      ...state,
      currencies: payload,
    };

  default:
    return {
      ...state,
    };
  }
};

export default wallet;
