import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { Gifstate } from "../context/Context";
import Gifsearch from "./Gifsearch";

function Header() {
  const [categories, setCategories] = useState([]);
  const [showcategories, setShowcategories] = useState(false);
  const { gf, favs } = Gifstate();

  const fetchCategories = async () => {
    const { data } = await gf.categories();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <nav>
      <div className="relative flex gap-4 justify-between items-center mb-2">
        <Link to="/" className="flex gap-2">
          <img src="./logo.svg" className="w-8" alt="Giphy" />
          <h1
            className="text-5xl font-bold tracking-tight cursor-pointer
          "
          >
            GIPHY
          </h1>
        </Link>
        <div className="font-bold text-md flex gap-2 items-center">
          {categories?.slice(0, 5)?.map((category) => {
            return (
              <Link
                key={category.name}
                to={`/${category.name_encoded}`}
                className="px-4 py-1 hover:gradient border-b-4 hidden lg:block"
              >
                {category.name}
              </Link>
            );
          })}

          <button onClick={() => setShowcategories(!showcategories)}>
            <HiDotsVertical
              size={35}
              className={`py-0.5 hover:gradient ${
                showcategories ? "gradient" : ""
              } border-b-4 hidden lg:block`}
            />
          </button>
          {favs.length > 0 && (
            <div className="h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded">
              <Link to="/favorites"> Favorite GIFs</Link>
            </div>
          )}
          <button>
            <HiMiniBars3BottomRight
              className="text-sky-400 block lg:hidden"
              size={30}
            />
          </button>
        </div>
        {showcategories && (
          <div className="absolute right-0 top-14 px-10 pt-6 pb-9 w-full gradient z-20">
            <span className="text-3xl font-extrabold">Categories</span>
            <hr className="bg-gray-100 opacity-50 my-5" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {categories?.map((cat) => {
                return (
                  <Link
                    className="font-bold"
                    key={cat.name}
                    to={`/${cat.name_encoded}`}
                    onClick={() => setShowcategories(!showcategories)}
                  >
                    {cat.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {/* search */}
      <Gifsearch></Gifsearch>
    </nav>
  );
}

export default Header;
