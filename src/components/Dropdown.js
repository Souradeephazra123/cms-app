import React from "react";
import { IoIosArrowDown } from "react-icons/io";

const Dropdown = ({ options }) => {
  return (
    <div className="relative inline-block ">
      <select className="border border-black p-2 rounded-md appearance-none w-32">
        {options.map((option) => (
          <option key={option.id} value={option.content} className="hover:bg-sky-400">
            {option.content}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <IoIosArrowDown size={20} color="#152642" />
      </div>
    </div>
  );
};

export default Dropdown;



{/* <div>
      <select className="border border-black p-2 flex gap-10 rounded-md" onChange={(e) => console.log(e.target.value)}>
        {options.map((option) => (
          <option
            key={option.id}
            value={option.content}
            className=" hover:bg-sky-400"
          >
            {option.content}
          </option>
        ))}
        <div className=" flex gap-1">
          <div className=" h-4 w-[1px]"></div>
          <IoIosArrowDown size={20} color="#152642" />
        </div>
      </select>
    </div> */}