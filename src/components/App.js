
import React, {useEffect, useState} from "react";
import './../styles/App.css';
import API from "../services/api";
import getFormatedData from "../services/getFormatedData";

const App = () => {
  const [data, setData] = useState({ name: "", temp: "", des: "", icon: "" });
  const [value, setValue] = useState("");
  const [intialMount, setInialMount] = useState(true);

  React.useEffect(() => {
    setInialMount(false);
    if (intialMount) return;
    const controller = new AbortController();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=2087e2960bc8f88c1a87fbfdff2ffa1a`,
      { signal: controller.signal }
    )
      .then((res) => res.json())
      .then((d) => {
        const [name, temp, des, icon] = getFormatedData(d);
        setData({ name, temp, des, icon });
        setValue("");
      })
      .catch((e) => e);
    return () => controller.abort();
  }, [value]);

  return (
    <div>
      <input
        type="text"
        className="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <article
        style={{ display: intialMount ? "none" : "initial" }}
        className="weather"
      >
        <p>{data.name}</p>
        <h1>{data.temp}°F</h1>
        <p>{data.des}</p>
        <img
          src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt="img"
        />
      </article>
    </div>
  );
};

export default App;