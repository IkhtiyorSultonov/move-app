import { useRef, useState } from "react";
import Thumbnull from "../thumbnull/thumbnull";
import { RowProps } from "./row.props";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
const Row = ({ title, movies, isBig=false }: RowProps): JSX.Element => {
  const [moved, setmoved] = useState<Boolean>(false);
  const caruselRef = useRef<HTMLDivElement>(null);
  const handleClick = (direction: "left" | "right") => {
    setmoved(true);
    
    if (caruselRef.current) {
      const { scrollLeft, clientWidth } = caruselRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      caruselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });

      if (direction === "left" && scrollTo === 0) {
        setmoved(false);
      }
    }
  };
  return (
    <div className="md:h-[600px] space-y-3 md:space-y-2  md:mt-0">
      <h2 className="w-56 cursor-pointer mt-4  text-lg md:text-2x1   font-semibold text-[#e5e5e5] hover:text-white transition duration-200  ">
        {title}
      </h2>
      {/* {} */}
      <div className=" group relative -ml-2 md:ml-2:">
        <AiOutlineArrowLeft
          onClick={() => handleClick("left")}
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-6 w-6 cursor-pointer opacity-0 group-hover:opacity-100 transi duration-200 scale-125 /*false*/ ${
            !moved && "hidden"
          }`}
        />

        <div
          ref={caruselRef}
          className={`flex scrollbar-hide space-x-3 md:space-x-0 items-center ${!isBig && ' space-x-3 md:space-x-4'} overflow-hidden `}
        >
          {movies.map((movie) => (
            <Thumbnull key={movie.id} movie={movie} isBig={isBig} />
          ))}
        </div>
        <AiOutlineArrowRight
          onClick={() => handleClick("right")}
          className={`absolute top-0 bottom-0 right-2 z-40 m-auto h-6 w-6 cursor-pointer opacity-0  group-hover:opacity-100 transition duration-200 scale-125 `}
        />
      </div>
    </div>
  );
};

export default Row;
