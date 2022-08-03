const express = require("express");
const https = require("https");

const app = express();

app.get("/", function (req, res) {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=new york&appid=a56ba77734d54a64a5b17b8a6f45c5a2&units=metric";
    https.get(url, function (response) {

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const city = weatherData.name;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<h1> The temperature in " + city + " is " + temp + " degree celcius.</h1>");
            res.write("<h3>The Weather is currently " + desc + "</h3>");
            res.write("<img src=" + imageURL + ">");
            res.send()
            console.log(weatherData)
        })
    })
})

app.listen(3000, function () {
    console.log("server is running on port 3000.");
})