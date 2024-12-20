"use client";
import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";

const RenderedUI = ({ data }) => {
  const [taskItems, setTaskItems] = useState(data?.taskItems || []);
  const [categorize, setCategorize] = useState(data?.categorize || []);
  const [modal, setModal] = useState(false);
  const colorPalette = ["bg-rose-300", "bg-yellow-400"];
  const [dashedStore, setDashedStore] = useState([]);
  const dashedArr = data?.clozeHeader?.split(" ").map((item) => item);
  const [dashedArrStore, setDashedArrStore] = useState(
    data?.cloze?.filter((item) => item.content !== "")
  );

  const [comprehensionstate, setComprehensionState] = useState(
    new Array(data?.comprehension?.length).fill(false)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeIndex = taskItems.findIndex((item) => item.id === active.id);
    const overIndex = categorize.findIndex((item) => item.id === over.id);

    if (overIndex !== -1) {
      const newCategorize = [...categorize];
      newCategorize[overIndex].taskItems =
        newCategorize[overIndex].taskItems || [];
      newCategorize[overIndex].taskItems.push(taskItems[activeIndex].content);
      setCategorize(newCategorize);
    }
  };

  const habdleDragDashedEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeIndex = taskItems.findIndex((item) => item.id === active.id);
    const overIndex = over.id;

    if (overIndex !== -1) {
      setDashedStore([...dashedStore, dashedArr[overIndex]]);
      setDashedArrStore(
        dashedArrStore.filter(
          (item) => item.content.trim() !== dashedArr[overIndex]
        )
      );
      // const newCategorize = [...categorize];
      // newCategorize[overIndex].taskItems =
      //   newCategorize[overIndex].taskItems || [];
      // newCategorize[overIndex].taskItems.push(taskItems[activeIndex].content);
      // setCategorize(newCategorize);
    }
  };

  const doesThiswordExist = (word) => {
    const wordExist = data?.cloze?.some((item) => item.content === word + " ");
    // console.log("word exists", word, wordExist);
    return wordExist;
  };

  const changeComprehensiveState = (idx) => {
    setComprehensionState(
      comprehensionstate.map((item, index) => (index === idx ? !item : item))
    );
  };

  const handleSubmit = () => {
    setModal(true);
  };

  return (
    <>
      {!modal ? (
        <div className="flex flex-col gap-6 justify-center items-center">
          <p className="  text-2xl font-bold">{data.contentName}</p>
          <div className=" shadow-lg p-5 rounded-lg bg-white w-[60%]">
            <p>Question 1</p>
            <DndContext onDragEnd={handleDragEnd}>
              <div className=" flex justify-center items-center flex-col gap-5">
                <div className=" flex gap-3">
                  {data?.taskItems
                    ?.filter((item) => item.content !== "")
                    .map((item) => (
                      <Draggable key={item.id} id={item.id}>
                        <div
                          key={item.id}
                          className=" px-4 py-1 bg-transparent rounded-md border border-black"
                        >
                          {item?.content !== "" && item?.content}
                        </div>
                      </Draggable>
                    ))}
                </div>
                <div className="flex gap-3">
                  {data?.categorize?.map((item) => (
                    <Droppable key={item.id} id={item.id}>
                      <div
                        key={item.id}
                        className={`p-4 m-4 ${
                          colorPalette[item.id - 1]
                        } rounded-lg`}
                      >
                        {item.content}
                      </div>
                      <div
                        className={`p-1 ${
                          colorPalette[item.id - 1]
                        } rounded-lg line min-w-48 min-h-48`}
                      ></div>
                    </Droppable>
                  ))}
                </div>
              </div>
            </DndContext>
          </div>

          <div className=" shadow-lg p-5 rounded-lg bg-white w-[60%]">
            <p>Question 2</p>
            <DndContext onDragEnd={habdleDragDashedEnd}>
              <div className=" flex justify-center items-center flex-col gap-5">
                <div className=" flex gap-3">
                  {dashedArrStore?.map((item) => (
                    <Draggable key={item.id} id={item.id}>
                      <div
                        key={item.id}
                        className=" px-4 py-1 bg-[#7c43cc] rounded-md border text-white "
                      >
                        {item?.content !== "" && item?.content}
                      </div>
                    </Draggable>
                  ))}
                </div>
                <div className="flex gap-3">
                  {data?.clozeHeader?.split(" ")?.map((item, idx) => (
                    <div key={idx} className=" flex gap-1 ">
                      {!doesThiswordExist(item) && (
                        <p className="text-black">{item}</p>
                      )}

                      <Droppable key={idx} id={idx}>
                        {doesThiswordExist(item) &&
                          (!dashedStore.includes(item) ? (
                            <div
                              className={`p-1 line min-w-12  bg-gray-400 rounded min-h-5`}
                            ></div>
                          ) : (
                            <p className=" bg-[#7c43cc] px-2 py-1 rounded">
                              {item}
                            </p>
                          ))}
                      </Droppable>
                    </div>
                  ))}
                </div>
              </div>
            </DndContext>
          </div>

          <div className=" shadow-lg p-5 rounded-lg bg-white w-[60%]">
            <p>Question 3</p>
            <p>{data?.comprehensionHeader}</p>
            {data?.comprehension?.map((item, idx) => (
              <div key={idx} className=" shadow-md p-3 flex flex-col gap-3">
                <div className=" border-b-2 border-gray-400 flex gap-2">
                  <IoIosArrowDown
                    size={20}
                    color="#152642"
                    onClick={() => changeComprehensiveState(idx)}
                    className={`${comprehensionstate[idx] ? "rotate-180" : ""}`}
                  />
                  <span>Question {idx + 1}</span>
                </div>
                {comprehensionstate[idx] && (
                  <div>
                    <p>{item?.title}</p>
                    {item?.options?.map((item, idx) => (
                      <div key={idx} className=" flex gap-2">
                        <input
                          type="radio"
                          id={item}
                          name={item}
                          value={item}
                        />
                        <label for="htmlFor">{item}</label>
                        <br />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className=" bg-violet-500 text-black px-5 py-1.5 rounded-md"
          >
            Submit
          </button>
        </div>
      ) : (
        <div className=" h-screen flex justify-center items-center gap-2">
          <Image
            src={"/tick.png"}
            width={60}
            height={60}
            alt="tick"
            className=" rounded-full"
          />
          <div className=" flex flex-col gap-2">
            <p className="text-3xl font-bold">Test Completed</p>
            <p className=" text-sm text-gray-400">
              Congratulations, your response has been submitted
            </p>
            <Link href="/content" className=" bg-gray-700 text-white px-4 py-1 w-fit rounded">
              <button>Go Back</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

const Draggable = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};

const Droppable = ({ id, children }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return <div ref={setNodeRef}>{children}</div>;
};

export default RenderedUI;

{
  /* <Droppable key={item.id} id={item.id}> */
}
{
  /* </Droppable> */
}
