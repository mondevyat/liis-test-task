import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { addDays, currentDate } from "../../utils/date";
import { FETCH_HOTELS, setHotels, setIsEmpty, setIsFetching } from "../reducers/hotelsReducer";

function* fetchHotelsSaga({payload: {cityName = "Moscow", date = currentDate(), days = 1, limit = 30}}) {
  yield put(setIsFetching(true));
  yield put(setIsEmpty(false));
  try {
    const response = yield axios.get(`http://engine.hotellook.com/api/v2/cache.json?location=${cityName}&currency=rub&checkIn=${date}&checkOut=${addDays(date, days)}&limit=${limit}`);
    response.data.length === 0
      ? yield put(setIsEmpty(true))
      : yield put(setHotels(response.data));
  } catch (e) {
    yield put(setIsEmpty(true));
  }
}

export function* hotelsSaga() {
  yield takeLatest(FETCH_HOTELS, fetchHotelsSaga);
}