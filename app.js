/*
    npm init
    npm install express
*/
const express = require("express"); // adding express to our app.js
const https = require("https");

const app = express(); // adding express app from express

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "ae46afe994ad15fcd4df2c7ba7739287";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;

  https.get(url, function (response) {
    console.log("Status code: " + response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      //   console.log(weatherData);
      const temp = weatherData.main.temp;
      console.log("temp: " + temp);

      const desc = weatherData.weather[0].description;
      console.log("description: " + desc);

      const icon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + icon + ".png";

      res.write(
        "<h1>The weather in "+req.body.cityName+" is: " + temp + " degrees celsius</h1>"
      );
      res.write("<p>The weather have currently " + desc + "</p>");
      res.write("<img src=" + imgURL + " width = 7%>");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server started at 127.0.0.0 port:3000");
});
