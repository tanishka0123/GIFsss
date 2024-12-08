import React, { useEffect } from "react";
import { Gifstate } from "../context/Context";
import Gif from "../components/Gif";
import Filtergif from "../components/Filtergif";

function Home() {
  const { gf, setGifs, filter, gifs } = Gifstate();
  const fetchTrending = async () => {
    const { data } = await gf.trending({
      limit: 30,
      type: filter,
      rating: "g",
    });
    setGifs(data);
  };
  useEffect(() => {
    fetchTrending();
  }, [filter]);

  return (
    <div>
      <img src="./banner.gif" alt="earth" className="mt-2 rounded w-full" />
      <Filtergif showTrending />
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3">
        {gifs.map((gif) => {
          return <Gif gif={gif} key={gif.title}></Gif>;
        })}
      </div>
    </div>
  );
}

export default Home;
