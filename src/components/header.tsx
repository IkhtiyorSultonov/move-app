import Image from "next/image";
import Link from "next/link";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineSearch } from "react-icons/ai";
import { RxExit } from "react-icons/rx";
import { BiBellMinus } from "react-icons/bi";
import {  useEffect, useState } from "react";
import { useAuth } from "src/hooks/useAuth";
import NavMenu from "./nav-menu/navmenu";
const Header = () => {
  const [scrolled, setscrolled] = useState(false);
  const { logOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setscrolled(true);
      } else {
        setscrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className={`${scrolled && "bg-[#000000]/50"}`}>
      <div className="flex item-center  space-x-2  md:space-x-10">
        <Image
          src={"/logo.svg"}
          alt={"logo"}
          width={56}
          height={56}
          className="cursor-pointer object-contain"
        />
        <NavMenu/>
        <ul className="ul items-center space-x-4 md:flex hidden">
          <li>Home</li>
          <li>Movies</li>
          <li>TV Shows</li>
          <li>New</li>
          <li>Popular</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 font-light">
        <AiOutlineSearch className="h-6 w-6 cursor-pointer" />
        <p className="hidden lg:inline">Kids</p>
        <BiBellMinus className="h-6 w-6 cursor-pointer" />
        <Link href={"/account"}>
          <VscAccount className="h-6 w-6 cursor-pointer" />
        </Link>
        <RxExit className="h-6 w-6 cursor-pointer" onClick={logOut} />
      </div>
    </header>
  );
};

export default Header;
