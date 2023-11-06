import React, {useState} from "react";
import './Weather.css';





const API_KEY = "2b7ecd77cb5c7164d356c5e26164f0c3";


const Weather = () =>{
    const [city, setCity] = useState("");
    const [location, setLocation] = useState ("");
    const [temperature, setTemperature] = useState("");
    const [description, setDescription] = useState("");
    const [weatherIcon, setWeatherIcon] = useState("");



    const updateWeather = (iconCode) =>{
        const iconClassMap ={
      '01d': 'fa-sun',
      '01n': 'fa-moon',
      '02d': 'fa-cloud-sun',
      '02n': 'fa-cloud-moon',
     };

     let weatherIconClass = 'fas';
     if (iconClassMap[iconCode]){
        weatherIconClass += '' + iconClassMap[iconCode];
     }
     setWeatherIcon (weatherIconClass);
    }
    
    const handleSearch = () =>{
        if(city){
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`  
            )
            .then((response) =>{
             if(!response.ok){
                throw new Error("cidade não  encontrada!");
             }
             return response.json();
            })

            .then((data) =>{
                const cityName = data.name;
                const temp = data.main.temp;
                const desc = data.weather[0].description;
                const icon = data.weather[0].icon;

                setLocation(`Cidade: ${cityName}`);
                setTemperature(`temperatura: ${temp.toFixed(1)} °C`);
                setDescription(`Descrição: ${desc}`);
                updateWeather(icon);
            })

            .catch((error) =>{
            console.error("erro ao buscar a previsão do tempo:", error)
            
            setLocation("erro ao verificar a  previsão do tempo, verifique sua cidade."
            
            );

            setTemperature("");
            setDescription("");
            setWeatherIcon("");

            });

        }else{
            setLocation("");
            setTemperature("");
            setDescription("");
            setWeatherIcon("");
        }
    };



return(
    <div className="weather-container">

        <h1>previsão do tempo</h1>
        <input type="text" 
        placeholder="digite o nome da sua cidade"
        value={city}
        onChange={(e)=> setCity(e.target.value)}
        
        />

        <button onClick={handleSearch}>Buscar..</button>

        <div id="weather-info">
        <div id="location">{location}</div>
        <div id="temperature">{temperature}</div>
        <div id="description">{description}</div>
        <div id="weather-icon"> <i className={weatherIcon} id="weather-icon-i"></i></div>

        </div>


    </div>
)





}

export default Weather