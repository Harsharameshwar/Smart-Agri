import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Slider,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  WiDaySunny,
  WiRain,
  WiCloudy,
  WiStrongWind,
  WiThermometer,
  WiDayCloudyHigh,
} from "react-icons/wi";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  card: {
    textAlign: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    padding: theme.spacing(2),
    background: "#1e1e1e",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  cardIcon: {
    fontSize: "48px",
    marginBottom: theme.spacing(2),
  },
}));

const WeatherCard = ({ weather }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card className={classes.card}>
        <CardContent>
          {weather.weatherIcon}
          <Typography variant="h6" component="div">
            {weather.day}
          </Typography>
          <Typography variant="body2" component="div" color="text.secondary">
            <WiThermometer className={classes.cardIcon} /> {weather.temperature}
            &deg;C
          </Typography>
          <Typography variant="body2" component="div" color="text.secondary">
            {weather.humidity}
          </Typography>
          <Typography variant="body2" component="div" color="text.secondary">
            {weather.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

const WeatherPage = () => {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [weatherData, setweatherData] = useState([]);

  useEffect(() => {
    async function fetch() {
      const res = await axios.get(
        "https://mydesk.tk:5001/generate-weatherreport"
      );
      console.log(res.data.json_data);
      const json_data = JSON.parse(res.data.json_data);
      let itemobj = [];
      var j = 0;
      json_data.forEach((i) => {
        j++;
        itemobj.push({
          slno: j + "",
          day: new Date(i.date).toDateString() + "",
          temperature: i.Temperature + "",
          humidity: i.Humidity + "",
          description: i.Weather_Report + "",
          weatherIcon:
            i.Weather_Report === "Cloudless and Hot" ? (
              <WiDaySunny className={classes.cardIcon} />
            ) : i.Weather_Report === "Sunny Day" ? (
              <WiDaySunny className={classes.cardIcon} />
            ) : i.Weather_Report === "Warm day with scattered clouds" ? (
              <WiDayCloudyHigh className={classes.cardIcon} />
            ) : i.Weather_Report === "Cloudy Day, mostly overcast" ? (
              <WiCloudy className={classes.cardIcon} />
            ) : (
              <WiRain className={classes.cardIcon} />
            ),
        });
      });
       setweatherData(itemobj)
    }
    fetch();
  },[]);

//   const weatherData = [
//     {
//       day: "Monday",
//       temperature: 25,
//       description: "Sunny",
//       weatherIcon: <WiDaySunny className={classes.cardIcon} />,
//       //   graphData: {
//       //     x: [1, 2, 3, 4, 5],
//       //     y: [20, 22, 24, 25, 26],
//       //   },
//     },
//     {
//       day: "Tuesday",
//       temperature: 18,
//       description: "Rainy",
//       weatherIcon: <WiRain className={classes.cardIcon} />,
//       graphData: {
//         x: [1, 2, 3, 4, 5],
//         y: [16, 17, 18, 18, 19],
//       },
//     },
//     {
//       day: "Wednesday",
//       temperature: 30,
//       description: "Cloudy",
//       weatherIcon: <WiCloudy className={classes.cardIcon} />,
//       graphData: {
//         x: [1, 2, 3, 4, 5],
//         y: [28, 30, 32, 29, 31],
//       },
//     },
//     {
//       day: "Thursday",
//       temperature: 22,
//       description: "Windy",
//       weatherIcon: <WiStrongWind className={classes.cardIcon} />,
//       graphData: {
//         x: [1, 2, 3, 4, 5],
//         y: [21, 23, 22, 24, 25],
//       },
//     },
//     {
//       day: "Thursday",
//       temperature: 22,
//       description: "Windy",
//       weatherIcon: <WiStrongWind className={classes.cardIcon} />,
//       graphData: {
//         x: [1, 2, 3, 4, 5],
//         y: [21, 23, 22, 24, 25],
//       },
//     },
//     {
//       day: "Thursday",
//       temperature: 22,
//       description: "Windy",
//       weatherIcon: <WiStrongWind className={classes.cardIcon} />,
//       graphData: {
//         x: [1, 2, 3, 4, 5],
//         y: [21, 23, 22, 24, 25],
//       },
//     },
//     {
//       day: "Thursday",
//       temperature: 22,
//       description: "Windy",
//       weatherIcon: <WiStrongWind className={classes.cardIcon} />,
//       graphData: {
//         x: [1, 2, 3, 4, 5],
//         y: [21, 23, 22, 24, 25],
//       },
//     },
//     {
//       day: "Thursday",
//       temperature: 22,
//       description: "Windy",
//       weatherIcon: <WiStrongWind className={classes.cardIcon} />,
//       graphData: {
//         x: [1, 2, 3, 4, 5],
//         y: [21, 23, 22, 24, 25],
//       },
//     },
//   ];

  const handleSlideChange = (event, newIndex) => {
    setCurrentIndex(newIndex);
  };

  const renderWeatherCards = () => {
    const totalCards = weatherData.length;
    const cardsPerPage = 4;
    const totalPages = Math.ceil(totalCards / cardsPerPage);

    const handlePrevious = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? totalPages - 1 : prevIndex - 1
      );
    };

    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
    };

    const startIndex = currentIndex * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    const visibleWeatherData = weatherData.slice(startIndex, endIndex);

    return (
      <>
        <Grid container spacing={2}>
          {visibleWeatherData.map((weather, index) => (
            <WeatherCard key={index} weather={weather} />
          ))}
        </Grid>
        <Box mt={2} display="flex" justifyContent="center">
          <Button variant="contained" color="primary" onClick={handlePrevious}>
            Previous
          </Button>
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        </Box>
      </>
    );
  };

  return (
    <div>
      <Box mt={4}>
        <Grid container spacing={1}>
          {renderWeatherCards()}
        </Grid>
      </Box>
      <Box mt={4} display="flex" justifyContent="center">
        <Slider
          value={currentIndex}
          min={0}
          max={weatherData.length - 1}
          step={1}
          onChange={handleSlideChange}
        />
      </Box>
    </div>
  );
};

export default WeatherPage;
