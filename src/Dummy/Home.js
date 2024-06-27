import axios from 'axios'
import React, { useState } from 'react'

const Home = () => {
    const [city, setCity] = useState();
    const [weather, setWeather] = useState(null);

    const handlechange = (e) => {
        e.preventDefault()
        const searchInput = e.target.value;
        setCity(searchInput);
        console.log(searchInput);
    }
    console.log(city);
    const handleSubmit = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=5c5702fdc20cd585f747d0d46c58d301`);
            console.log(response.data);
            const responses = response.data;
            setWeather(responses)

            console.log(response.data.city.name);
            console.log(response.data.city.country);
            console.log(response.data.list[0].main.temp)
            console.log(response.data.list[0].weather[0].icon)
        } catch (error) {
            console.error("Data not response");
        }
        console.log("click");
    }
    console.log("weather", weather);
    return (
        <>
            <div className="col-md-12">
                <div className="weather">
                    <h1 className="heading">Weather App</h1>
                    <div className="d-grid gap-3 col-4 mt-4">
                        <input type="text" className="form-control" value={city} name='city' onChange={handlechange}></input>
                        <button className="btn btn-primary" type="button" onClick={handleSubmit} > Search</button>
                    </div>
                </div>

            </div>
            {
                weather &&
                weather.list &&
                weather.list.length > 0 && (


                    <div className="col-md-12 text-center mt-5">
                        <div className="shadow rounded weatherResultBox">
                            {/* <img className=""  src="cloudy_201947.png" alt="logo"></img> */}

                            <img
                                src={`http://openweathermap.org/img/w/${weather.list[0].weather[0].icon}.png`}
                                alt="Weather Icon"
                                className="weatherIcon"
                            />



                            <h5 className="weatherCity">{weather.city.name}</h5>
                            <h5 className="weatherCity">{weather.city.country}</h5>

                            <h6 className="weatherTamp">{weather.list[0].main.temp}°C</h6>


                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Home;
