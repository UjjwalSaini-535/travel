import { useEffect, useState } from "react";
import { CssBaseline, Grid, Box } from "@material-ui/core";
import { getPlacesData, getWeatherData } from "./api/index";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { useMap } from "react-map-gl";

const App = () => {
  const [viewPort, setViewPort] = useState({});
  const [isLocationChanged, setIsLocationChanged] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [bounds, setBounds] = useState({});
  const [placesDetails, setPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [childClicked, setChildClicked] = useState([]);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(0);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const myMap = useMap();

  useEffect(() => {
    const success = (position) => {
      setViewPort({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
        zoom: 14,
      });
    };

    const fail = () => {
      alert("Give permission to the location and load the page again.");
    };

    navigator.geolocation.getCurrentPosition(success, fail, {
      enableHighAccuracy: true,
    });
  }, []);

  useEffect(() => {
    if (isLocationChanged) {
      const { _ne, _sw } = myMap.default.getBounds();
      setBounds({
        bl_latitude: _sw.lat,
        tr_latitude: _ne.lat,
        bl_longitude: _sw.lng,
        tr_longitude: _ne.lng,
      });
    }
    setIsLocationChanged(false);
  }, [isLocationChanged, myMap]);

  useEffect(() => {
    const filteredPlaces = placesDetails?.filter(
      (place) => place.rating > rating
    );

    setFilteredPlaces(filteredPlaces);
  }, [rating, placesDetails]);

  useEffect(() => {
    setIsDataLoading(true);

    const fetchData = async () => {
      const weatherData = await getWeatherData(
        viewPort.latitude,
        viewPort.longitude
      );
      setWeatherData(weatherData);

      const placesDetails = await getPlacesData(bounds, type);
      setPlaces(placesDetails);
      setFilteredPlaces([]);
      setIsDataLoading(false);
    };

    fetchData();
  }, [bounds, type]);

  return (
    <>
      <CssBaseline />
      <Header
        setViewPort={setViewPort}
        setIsLocationChanged={setIsLocationChanged}
      />
      <Box m={1.5} pl={2}>
        <Grid container spacing={2} style={{ width: "100%" }}>
          <Grid
            item
            xs={12}
            md={4}
            style={{
              backgroundColor: "Lavender",
              marginTop: "12px",
              height: "88vh",
              overflow: "hidden",
            }}
          >
            <List
              placesDetails={
                filteredPlaces?.length > 0 ? filteredPlaces : placesDetails
              }
              childClicked={childClicked}
              isLoading={isDataLoading}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
            />
          </Grid>
          <Grid item xs={12} md={8} style={{ padding: "7px" }}>
            <Map
              viewPort={viewPort}
              setViewPort={setViewPort}
              setBounds={setBounds}
              placesDetails={
                filteredPlaces?.length > 0 ? filteredPlaces : placesDetails
              }
              setChildClicked={setChildClicked}
              weatherData={weatherData}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default App;
