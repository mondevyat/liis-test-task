import axios from "axios";
import { addDays, currentDate } from "../../utils/date";
import { setHotels, setIsEmpty, setIsFetching } from "../reducers/hotelsReducer";

export const getHotels = (cityName = 'moscow', date = currentDate(), days = 1, limit = 30) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        dispatch(setIsEmpty(false))
        try {
            const response = await axios.get(`https://engine.hotellook.com/api/v2/cache.json?location=${cityName}&currency=rub&checkIn=${date}&checkOut=${addDays(date, days)}&limit=${limit}`)
            response.data.length === 0 ? dispatch(setIsEmpty(true)) : dispatch(setHotels(response.data))
        }
        catch (e) {
            dispatch(setIsEmpty(true))
        }
    }
}