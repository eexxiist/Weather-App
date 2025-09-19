import React, { useState } from "react";

const Weather = () => {
    const [search, setSearch] = useState("");
    const [clue, setClue] = useState([]);
    const [selectedCity, setSelectedCity] = useState([]);

    const handleChangeSearch = async (e) => {
        try {
            setSearch(e.target.value);
            const resSearch = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${e.target.value},RU&limit=5&appid=4841d6c54ff9976a8984497d734c60fd&lang=ru`
            );

            const res = await resSearch.json();
            setClue(res);
            console.log(res);
        } catch (error) {
            console.log("Error");
        }
    };

    const handleSelectCity = (city) => {
        setSelectedCity(city);
        setSearch(city.name);
        setClue([]);
        console.log(selectedCity.lat, selectedCity.lon);
    };

    return (
        <div>
            <div>
                <input
                    placeholder="Введите город"
                    type="text"
                    onChange={handleChangeSearch}
                    value={search}
                />
                <div>
                    {clue.length > 0 && (
                        <ul>
                            {clue.map((city) => (
                                <li onClick={() => handleSelectCity(city)}>
                                    {city.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Weather;
