import Link from "next/link";
import React from "react";

const NavBar = () => {
  const arr = [
    { name: "Home", path: "/" },
    { name: "Content", path: "/content" },
  ];


  return (
    <div className=" h-screen py-10 px-5 flex flex-col gap-2 fixed top-0 left-0 bg-gray-200">
      {arr?.map((item, index) => (
        <Link  key={index} href={item.path} className=" hover:bg-gray-400 px-3 py-1">
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default NavBar;
