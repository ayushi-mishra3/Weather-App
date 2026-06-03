const apiKey = "c10433995f1090684e9901bc177540fb";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const searchBar = document.querySelector("#search-bar");
const searchBtn = document.querySelector("#btn");


async function checkWeather(city){
    if(!city){
        alert("Enter city name.");
        return;
    }
    const response = await fetch(`${apiUrl}?q=${encodeURIComponent(city)},IN&units=metric&appid=${apiKey}`);
    const data= await response.json();
    console.log(data);


    if(!response.ok){
        alert(data.message);
        return;
    }


    document.querySelector(".cityName").innerHTML = data.name;
    document.querySelector(".temp + p").innerHTML =  data.main.temp + "°C";
    document.querySelector(".humidity + p").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind + p").innerHTML =  data.wind.speed + " km/h";

    let precipitation = "No Precipitation";
    if (data.rain) {
        if (data.rain["1h"]) precipitation = data.rain["1h"] + " mm";
        else if (data.rain["2h"]) precipitation = data.rain["2h"] + " mm";
    }
    
    document.querySelector(".precipitation + p").innerHTML = precipitation;


    const weatherImg = document.querySelector(".weather-img img");
    const weatherMain = data.weather[0].main;
    const windSpeed = data.wind.speed;

    if (weatherMain === "Rain" || weatherMain === "Drizzle") {
        weatherImg.src = "./images/rainy weather.jpeg";
    } 
    else if (weatherMain === "Clouds") {
        weatherImg.src = "./images/cold weather.jpeg";
    } 
    else if (windSpeed > 3) { 
        weatherImg.src = "./images/windy weather.webp";
    } 
    else {
        weatherImg.src = "./images/hot weather.avif";
    }
}



searchBtn.addEventListener("click", () => {
    checkWeather(searchBar.value.trim());
});