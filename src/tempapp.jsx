import React, { useEffect, useState } from "react";
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStreetView } from '@fortawesome/free-solid-svg-icons';
import '@dotlottie/player-component';


const Tempapp = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Mumbai");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=f016a9805f3c2d07475b1f4613842fac`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("City not found");
        }
        const resjson = await response.json();
        setCity(resjson.main);
      } catch (error) {
        setError(error.message);
        setCity(null);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, [search]);

  return (
    <>
      <div className="box">
        <div className="inputData">
          <input
            type="search"
            className="inputField"
            placeholder="Find here"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : !city ? (
          <p>No Data Found</p>
        ) : (
          <div>
            <div className="info">
              <h2 className="location">
                <FontAwesomeIcon icon={faStreetView} /> {search}
              </h2>
              <h1 className="temp">
                {city.temp}°Cel
              </h1>
              <h3 className="tempmin_max">
                Min : {city.temp_min}°Cel | Max : {city.temp_max}°Cel
              </h3>
            </div>
            <dotlottie-player
              src="https://lottie.host/7da184ba-420a-447b-bbd2-defe292de6e1/vSgjyrgBzQ.json"
              background="transparent"
              speed="1"
              style={{ width: '300px', height: '300px'}}
              loop
              autoplay>
            </dotlottie-player>
          </div>
        )}
      </div>
    </>
  );
};

export default Tempapp;
