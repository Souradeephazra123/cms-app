import React from "react";
import { getAllContentFromDB } from "../../lib/model/content/content.model";
import Allcontents from "./Allcontents";

const page = async () => {
  const getAllContent = await getAllContentFromDB();

  return (
    <div  className=" pl-36">
      <Allcontents data={getAllContent} />
    </div>
  );
};

export default page;
