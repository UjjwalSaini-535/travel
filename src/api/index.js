/* eslint-disable no-undef */
import axios from "axios";

export const getPlacesData = async (bounds, type) => {
  const URL = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`;

  try {
    const data = await axios.get(URL, {
      headers: {
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      params: { ...bounds },
    });

    return data.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherData = async (lat, lon) => {
  const URL = "https://community-open-weather-map.p.rapidapi.com/find";

  try {
    const data = await axios.get(URL, {
      headers: {
        "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      params: { lat, lon },
    });

    return data.data;
  } catch (error) {
    console.log(error);
  }
};
