import React, { useState } from "react";
import { HiMiniXMark, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

function Gifsearch() {
  const [querry, setQuerry] = useState("");
  const navigate = useNavigate();

  const searchGif = async () => {
    if (querry.trim() === "") return;
    navigate(`/search/${querry}`);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchGif();
    }
  };
  return (
    <div className="flex relative">
      <input
        type="text"
        value={querry}
        onChange={(e) => setQuerry(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search all the GIFs and Stickers"
        className="w-full pl-4 pr-14 py-5 text-xl text-black rounded-tl rounded-bl border border-gray-300 outline-none"
      />
      {querry && (
        <button
          onClick={() => setQuerry("")}
          className="absolute bg-gray-400
         opacity-90 rounded-full right-20 mr-2 top-6"
        >
          <HiMiniXMark size={25} />
        </button>
      )}
      <button
        onClick={searchGif}
        className="bg-gradient-to-tr from-pink-600 to-pink-400 text-white px-4 py-2 rounded-tr rounded-br"
      >
        <HiOutlineMagnifyingGlass size={35} />
      </button>
    </div>
  );
}

export default Gifsearch;
