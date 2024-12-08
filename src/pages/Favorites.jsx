import React, { useEffect, useState } from "react";
import { Gifstate } from "../context/Context";
import Gif from "../components/Gif";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const { gf, favs } = Gifstate();

  const fetchFavorites = async () => {
    const { data: gifs } = await gf.gifs(favs);
    setFavorites(gifs);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);
  return (
    <div className="mt-7">
      <center className="text-gray-400 font-bold text-3xl mb-4">My Favorites</center>
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 mt-2">
        {favorites.map((gif) => (
          <Gif gif={gif} key={gif.id} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
