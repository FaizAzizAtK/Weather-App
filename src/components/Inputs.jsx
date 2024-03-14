import React, { useState } from "react";
import { GrLocation, GrSearch } from "react-icons/gr";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./profile";
import { useAuth0 } from "@auth0/auth0-react";

const Inputs = ({ setCity, unit, setUnit }) => {
  const [cityInput, setCityInput] = useState("");
  const {isLoading, error} = useAuth0();

  const handleCitySearch = () => {
    if (!cityInput) return;
    setCity(cityInput);
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setCity(lat + "," + lon);
      });
    }
  };

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row items-center justify-center space-x-4 mx-2">
        <input
          type="text"
          placeholder="Search Location"
          className="text-l text-gray-500 rounded-md font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <GrSearch
          onClick={handleCitySearch}
          size={25}
          className="cursor-pointer transition ease-out hover:scale-125"
        />
        <GrLocation
          onClick={handleLocationClick}
          size={25}
          className="cursor-pointer transition ease-out hover:scale-125"
        />
      </div>

      <div className="flex flex-row items-center justify-center mx-2">
        <button
          onClick={() => setUnit(unit === "c" ? "f" : "c")}
          className="text-l font-light border rounded-md px-3 py-1 transition hover:scale-105"
        >
          {`°${unit === "c" ? "F" : "C"}`}
        </button>
      </div>
      <div className="flex flex-row  items-center justify-center space-x-4 mx-">
        {error && <p>Authentication Error</p>}
          {!error && isLoading && <p>Loading...</p>}
          {!error && !isLoading && (
            <>
              <LoginButton />
              <LogoutButton />
              <Profile />
            </>
          )}
      </div>
    </div>
  );
};

export default Inputs;
