let weather = {
    apiKey: "6c656d85ea1a4e11bdbf3bb3819c2f6e",
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=metric&appid=" 
        + this.apiKey
    )
        .then((response) => {
        if (!response.ok){
            alert("No Weather found.");
            throw new Error("No Weather found.");
        }
        response.json();
    })
        .then((data) => this.displayWeather(data));

    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon , description} = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity +  "%";
        document.querySelector(".wind").innerText = "Wind Speed:  " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600×900/?"  + name + "')";
        document.body
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();

});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function(event){
        if(event.key == "Enter"){
            weather.search();
    }
});

weather.fetchWeather("Denver");