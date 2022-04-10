import moment from "moment"

export const currentDate = () => {
    let yourDate = new Date()
    return yourDate.toISOString().split('T')[0]
}

export const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().split('T')[0];
  }

export const infoFormat = (date = currentDate()) => {
    return moment(date, 'YYYY/MM/DD').format('D MMMM YYYY')
}

export const cardFormat = (date) => {
    return moment(date, 'YYYY/MM/DD').format('D MMMM, YYYY')
}