import Link from "next/link";
import React from "react";

const Allcontents = ({data}) => {
  return (
    <div className=" flex flex-col gap-4">
      {data?.map((item, idx) => (
        <Link
          href={`/content/${item?.id}`}
          key={idx}
          className=" px-10 py-4 shadow-md rounded-md w-fit"
        >
          {item?.contentName}
        </Link>
      ))}
    </div>
  );
};

export default Allcontents;
