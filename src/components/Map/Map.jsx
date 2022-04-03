/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */

import MapBox, {
  Marker,
  useMap,
  FullscreenControl,
  ScaleControl,
} from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { Typography, useMediaQuery, Paper } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import mapboxgl from "mapbox-gl";

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
import useStyles from "./styles";

const setBoundsOfMap = (myMap, setBounds) => {
  const { _ne, _sw } = myMap.default.getBounds();
  setBounds({
    bl_latitude: _sw.lat,
    tr_latitude: _ne.lat,
    bl_longitude: _sw.lng,
    tr_longitude: _ne.lng,
  });
};

const Map = ({
  viewPort,
  setViewPort,
  setBounds,
  placesDetails,
  setChildClicked,
  weatherData,
}) => {
  const classes = useStyles();
  const myMap = useMap();
  const isDesktop = useMediaQuery("(min-width: 600px)");

  return (
    <div className={classes.mapContainer}>
      <MapBox
        {...viewPort}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onLoad={() => {
          setBoundsOfMap(myMap, setBounds);
        }}
        onMoveEnd={({ viewState }) => {
          setViewPort({ ...viewState });
          setBoundsOfMap(myMap, setBounds);
        }}
      >
        {placesDetails?.map((place, i) => {
          let lng = place.longitude * 1;
          let lat = place.latitude * 1;
          return (
            lng &&
            lat && (
              <Marker
                draggable
                id={i}
                longitude={lng}
                latitude={lat}
                key={place.location_id}
              >
                {!isDesktop ? (
                  ""
                ) : (
                  <Paper elevation={3} className={classes.paper}>
                    <Typography
                      className={classes.typography}
                      variant="subtitle2"
                      gutterBottom
                    >
                      {place.name}
                    </Typography>
                    <img
                      id={i}
                      onClick={(e) => setChildClicked(e.target.id)}
                      className={classes.pointer}
                      src={
                        place.photo
                          ? place.photo.images.large.url
                          : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                      }
                      alt={place.name}
                    ></img>
                    <Rating
                      size="small"
                      value={Number(place.rating)}
                      readOnly
                    />
                  </Paper>
                )}
              </Marker>
            )
          );
        })}

        <ScaleControl />
        <FullscreenControl />

        {weatherData?.list?.map((data, i) => {
          return (
            <Marker
              key={i}
              longitude={data.coord.lon}
              latitude={data.coord.lat}
            >
              <img
                alt={data.weather[0].main}
                src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              ></img>
            </Marker>
          );
        })}
      </MapBox>
    </div>
  );
};

export default Map;
