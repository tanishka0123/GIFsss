import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { Gifstate } from "../context/Context";

const filters = [
  {
    title: "GIFs",
    value: "gifs",
    background:
      "bg-gradient-to-tr from-purple-400  to-purple-800 ",
  },
  {
    title: "Stickers",
    value: "stickers",
    background: "bg-gradient-to-tr from-teal-400  to-teal-800 ",
  },
  {
    title: "Text",
    value: "text",
    background: "bg-gradient-to-tr from-blue-400  to-blue-800 ",
  },
];
const Filtergif = ({ alignLeft = false, showTrending = false }) => {
  const { filter, setFilter } = Gifstate();
  return (
    <div
      className={`flex my-3 gap-3 ${alignLeft ? "" : "justify-end"} ${
        showTrending
          ? "justify-between flex-col sm:flex-row sm:items-center"
          : ""
      }`}
    >
      {showTrending && (
        <span className="flex gap-2">
          {showTrending && (
            <HiMiniArrowTrendingUp size={25} className="text-teal-400 " />
          )}
          <span className="font-semibold text-gray-400">Trending</span>
        </span>
      )}
      <div className="flex min-w-80 rounded-full bg-gray-800">
        {filters.map((f) => {
          return (
            <span
              onClick={() => setFilter(f.value)}
              className={`${
                filter === f.value ? f.background : ""
              } font-semibold py-2 w-1/3 text-center rounded-full cursor-pointer`}
              key={f.title}
            >
              {" "}
              {f.title}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Filtergif;
