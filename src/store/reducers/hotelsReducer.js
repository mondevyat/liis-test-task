const SET_HOTELS = "SET_HOTELS";
const SET_IS_FETCHING = "SET_IS_FETCHING";
const SET_IS_EMPTY = "SET_IS_EMPTY";

export const FETCH_HOTELS = "FETCH_HOTELS";

const defaultState = {
  hotels: [],
  isFetching: true,
  isEmpty: false,
};

export const hotelsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_HOTELS:
      return {
        ...state,
        hotels: action.payload,
        isFetching: false,
      };
    case SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    case SET_IS_EMPTY:
      return {
        ...state,
        isEmpty: action.payload,
      };
    default:
      return state;
  }
};

export const setHotels = (results) => {
  return { type: SET_HOTELS, payload: results };
};
export const setIsFetching = (bool) => {
  return { type: SET_IS_FETCHING, payload: bool };
};
export const setIsEmpty = (bool) => {
  return { type: SET_IS_EMPTY, payload: bool };
};

export const fetchHotels = (cityName, date, days, limit) => {
  return { type: FETCH_HOTELS, payload: {cityName: cityName, date: date, days: days, limit: limit}};
};
