import { useEffect, useState } from "react";
import "./styles.css";

function Card({ image, name }) {
  return (
    <div className="countryCard">
      <img src={image} alt={name} />
      <h2>{name}</h2>
    </div>
  );
}

export default function App() {
  const [countries, setCountries] = useState([]);
  const [searchRes, setSearchRes] = useState("");
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCountries(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="App">
      <div className="navbar">
        <input
          type="text"
          placeholder="Search for countries..."
          onChange={(e) => setSearchRes(e.target.value)}
        />
      </div>
      {countries
        .filter((country) => {
          if (searchRes === "") {
            return country;
          } else if (country.name.common.toLowerCase().includes(searchRes.toLowerCase())) {
            return country;
          }
        })
        .sort()
        .map((country) => (
          <Card
            key={country.cca3}
            image={country.flags.png}
            name={country.name.common}
          />
        ))}
    </div>
  );
}
