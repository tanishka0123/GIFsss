import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Gifstate } from "../context/Context";
import Gif from "../components/Gif";
import {
  HiMiniChevronDown,
  HiMiniChevronUp,
  HiMiniHeart,
} from "react-icons/hi2";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa";
import { IoCodeSharp } from "react-icons/io5";

const contentType = ["gifs", "stickers", "texts"];

function Singlegif() {
  const { type, slug } = useParams();
  const { gf, favs, addTofavs } = Gifstate();
  const [giff, setGif] = useState({});
  const [relatedGif, setRelatedGifs] = useState([]);
  const [read, setRead] = useState(false);

  const shareGif = () => {};
  const EmbedGif = () => {};

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid Content Type");
    }
    const fetchGif = async () => {
      const gifId = slug.split("-");
      const { data } = await gf.gif(gifId[gifId.length - 1]);
      const { data: related } = await gf.related(gifId[gifId.length - 1], {
        limit: 20,
      });
      setGif(data);
      console.log(giff);
      setRelatedGifs(related);
    };

    fetchGif();
  }, [slug]);

  //source  source_post_url

  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block">
        {giff && (
          <>
            <div className="flex gap-1">
              <img
                src={giff?.user?.avatar_url}
                alt={giff?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{giff?.user?.display_name}</div>
                <div className="faded-text">@{giff?.user?.username}</div>
              </div>
            </div>
            {giff?.alt_text && (
              <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                {read ? giff.alt_text : giff.alt_text.slice(0, 100) + "..."}
                <div
                  className="flex items-center faded-text cursor-pointer"
                  onClick={() => setRead(!read)}
                >
                  {read ? (
                    <>
                      Read less <HiMiniChevronUp size={20} />
                    </>
                  ) : (
                    <>
                      Read more <HiMiniChevronDown size={20} />
                    </>
                  )}
                </div>
              </p>
            )}
          </>
        )}
        <div className="divider"></div>
        {giff.source && (
          <div>
            <span className="faded-text">Source</span>
            <div className="flex items-center text-sm font-bold gap-1">
              <HiOutlineExternalLink size={25} />
              <a href={giff.source} target="_blank" className="truncate">
                {giff.source}
              </a>
            </div>
          </div>
        )}
      </div>
      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="faded-text truncate mb-2">{giff.title}</div>
            <Gif gif={giff} hover={false}></Gif>
            <div className="flex sm:hidden gap-1">
              <img
                src={giff?.user?.avatar_url}
                alt={giff?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{giff?.user?.display_name}</div>
                <div className="faded-text">@{giff?.user?.username}</div>
              </div>
              <button className="ml-auto" onClick={shareGif}>
                <FaPaperPlane size={25} />
              </button>
            </div>
          </div>
          <div className="hidden sm:flex flex-col gap-5 mt-6">
            <button
              onClick={() => addTofavs(giff.id)}
              className="flex gap-5 items-center font-bold text-lg "
            >
              <HiMiniHeart
                size={30}
                className={`${favs.includes(giff.id) ? "text-red-500" : ""}`}
              />
              Favorite
            </button>
            <button
              onClick={shareGif}
              className="flex gap-6 items-center font-bold text-lg"
            >
              <FaPaperPlane size={25} />
              Share
            </button>
            <button
              onClick={EmbedGif}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <IoCodeSharp size={30} />
              Embed
            </button>
          </div>
        </div>
        <div>
          <span className="font-extrabold">Related gifs</span>
          <div className="columns-2 md:columns-3 gap-2">
            {relatedGif.slice(1).map((gif)=>(
                <Gif gif={gif} key={gif.id}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Singlegif;
