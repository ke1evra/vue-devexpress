import axios from 'axios';

export default async function fetchData(API_URI, dayStart, dayEnd) {
    return axios.get(`${API_URI}?date_from=${dayStart}&date_to=${dayEnd}`)
        .then(receivedData => receivedData.data).catch(e => console.log(e));
}

// export { fetchData };
