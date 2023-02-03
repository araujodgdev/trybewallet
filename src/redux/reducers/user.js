import { ADD_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ADD_EMAIL:
    return { ...state, email: payload };
  default:
    return state;
  }
};

export default user;
