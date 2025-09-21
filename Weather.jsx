import React, { useEffect, useState } from "react";
import styles from "./style.module.css";

const Weather = () => {
    const [search, setSearch] = useState("");
    const [clue, setClue] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [weather, setWeather] = useState(null);

    const handleChangeSearch = async (e) => {
        try {
            setSearch(e.target.value);
            const resSearch = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${e.target.value},RU&limit=5&appid=4841d6c54ff9976a8984497d734c60fd&lang=ru`
            );
            const res = await resSearch.json();
            setClue(res);
        } catch (error) {
            console.log("Error");
        }
    };

    const handleSelectCity = (city) => {
        setSelectedCity(city);
        setSearch(city.name);
        setClue([]);
    };

    const getWeather = async (lat, lon) => {
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4841d6c54ff9976a8984497d734c60fd&lang=ru&units=metric`
            );
            let data = await res.json();
            setWeather(data);
        } catch (error) {
            console.log("Error");
        }
    };

    useEffect(() => {
        if (selectedCity) {
            getWeather(selectedCity.lat, selectedCity.lon);
        }
    }, [selectedCity]);

    return (
        <div className={styles.app}>
            <div className={styles.container}>
                <div className={styles.searchBox}>
                    <input
                        className={styles.searchInput}
                        placeholder="Введите город"
                        type="text"
                        onChange={handleChangeSearch}
                        value={search}
                    />
                    {clue.length > 0 && (
                        <ul className={styles.suggestionsList}>
                            {clue.map((city) => (
                                <li
                                    key={`${city.lat}-${city.lon}`}
                                    className={styles.suggestionItem}
                                    onClick={() => handleSelectCity(city)}
                                >
                                    {city.name}, {city.country}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {weather && (
                    <div className={styles.weatherCard}>
                        <h2 className={styles.cityName}>{weather.name}</h2>
                        <p className={styles.temperature}>
                            {Math.round(weather.main.temp)}°C
                        </p>
                        <p className={styles.description}>
                            {weather.weather[0].description}
                        </p>
                        <img
                            className={styles.weatherIcon}
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Weather;
