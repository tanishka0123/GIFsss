import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Gifstate } from "../context/Context";
import Filtergif from "../components/Filtergif";
import Gif from "../components/Gif";

function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const { gf, filter } = Gifstate();
  const { query } = useParams();

  const fetchResults = async () => {
    const { data } = await gf.search(query, {
      sort: "relevant",
      lang: "en",
      type: filter,
      limit: 30,
    });
    setSearchResults(data);
  };

  useEffect(() => {
    fetchResults();
  }, [filter]);
  return (
    <div className="my-4">
      <h2 className="text-5xl pb-3 font-extrabold">{query}</h2>
      <Filtergif alignLeft={true} />
      {searchResults.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3">
        {searchResults.map((gif) => {
          return <Gif gif={gif} key={gif.id}></Gif>;
        })}
      </div>
      ) : (
        <span>
          No GIFs found for {query}. Try searching for something else instead?
        </span>
      )}
    </div>
  );
}

export default Search;
