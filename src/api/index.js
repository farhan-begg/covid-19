// used to fetch api data
import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

// grab data function 
export const fetchData = async (country) => {
  let changeableUrl = url;
  //   if country exists 
  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    // grab specific data
    const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    return error;
  }
};
// grab daily data function
export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
  } catch (error) {
    return error;
  }
};
// fetch specific countries data 
export const fetchCountries = async () => {
  try {
    const { data: { countries } } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    return error;
  }
};
