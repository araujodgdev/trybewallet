// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  SAVE_CURRENCIES,
  ADD_EXPENSE,
  DEL_EXPENSE,
  EDIT_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SAVE_CURRENCIES:
    return {
      ...state,
      currencies: payload,
    };

  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, payload],
    };

  case DEL_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== payload),
    };

  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: [...payload],
    };
  default:
    return {
      ...state,
    };
  }
};

export default wallet;
