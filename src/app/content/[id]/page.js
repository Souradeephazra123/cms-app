import React from "react";
import { getContentById } from "../../../lib/model/content/content.model";
import RenderedUI from "./RenderedUI";
import { connectToDB } from "../../../lib/db";

const page = async ({ params }) => {
  const { id } = await params;
  await connectToDB();
  const content = await getContentById(id);

  return (
    <div className=" pl-10">
      <RenderedUI data={content} />
    </div>
  );
};

export default page;
