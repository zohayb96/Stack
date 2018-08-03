// import axios from 'axios';

const initialState = {
  user: {},
  allFriends: {},
};

// Action Type to get logged in user from the server
const GET_USER = 'GET_USER';
const GET_ALL_FRIENDS = 'GET_ALL_FRIENDS';

// ACTION CREATORS
const getAllFriends = allFriends => ({ type: GET_ALL_FRIENDS, allFriends });

// THUNKS
export const fetchAllFriends = () => async dispatch => {
  try {
    const allFriends = await axios.get(`/api/users/friends/${id}`);
    dispatch(getAllFriends(allFriends.data));
  } catch (err) {
    console.log(err);
  }
};

// LOGIN STUFF

const gotMe = user => ({
  type: GET_USER,
  user,
});

export const getMe = () => dispatch => {
  return axios
    .get('/auth/me')
    .then(res => res.data)
    .then(user => dispatch(gotMe(user)))
    .catch(console.error.bind(console));
};

export const login = formData => {
  return async dispatch => {
    try {
      const response = await axios.put('/auth/login', formData);
      dispatch(gotMe(user));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.user,
      };
    case GET_ALL_FRIENDS:
      return {
        ...state,
        allFriends: action.allFriends,
      };
    default:
      return state;
  }
}
