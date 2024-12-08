import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useEffect, useState } from "react";

const Contextt = createContext();

const ContextProvider = ({ children }) => {
  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favs, setFavs] = useState([]);
  const addTofavs = (id) => {
    if (favs.includes(id)) {
      const updated = favs.filter((item) => item !== id);
      localStorage.setItem("fav", JSON.stringify(updated));
      setFavs(updated);
    } else {
      const updated = [...favs, id];
      localStorage.setItem("fav", JSON.stringify(updated));
      setFavs(updated);
    }
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("fav")) || [];
    setFavs(favorites);
  }, []);

  const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);

  return (
    <Contextt.Provider
      value={{ gf, gifs, setGifs, filter, setFilter, favs, addTofavs }}
    >
      {children}
    </Contextt.Provider>
  );
};

export const Gifstate = () => useContext(Contextt);
export default ContextProvider;
