"use client";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { RxDragHandleDots2 } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

export const Task = ({
  id,
  title,
  updateContent,
  addTask,
  removeTask,
  length,
  readOnly,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const [inputValue, setInputValue] = React.useState(title);

  React.useEffect(() => {
    setInputValue(title);
  }, [title]);

  const handleChange = (event) => {
    console.log(event.target.value);
    setInputValue(event.target.value);
    updateContent(id, event.target.value);
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className=" flex gap-2 items-center">
        <div {...listeners} className="cursor-grab">
          <RxDragHandleDots2 size={20} color="#152642" />
        </div>
        {readOnly && (
          <input type="checkbox" readOnly checked={true}/>
        )}
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          readOnly={readOnly}
          onClick={(e) => {
            e.stopPropagation();
            if (id === length) {
              addTask();
            }
          }}
          onMouseDown={(e) => e.stopPropagation()}
          placeholder={`Category ${id}(optional)`}
          className=" text-black w-64 bg-Black  p-2 placeholder:text-Grey-7 border border-black"
        />
        {!readOnly && (
          <IoClose
            size={20}
            color="#152642"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              removeTask(id);
            }}
          />
        )}
      </div>
    </div>
  );
};
