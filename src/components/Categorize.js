"use client";
import React from "react";
// import { useFormStatus } from "react-dom";
// import { Controller, useForm, useFormState } from "react-hook-form";
// import { RxDragHandleDots2 } from "react-icons/rx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Task } from "./Task";
import Dropdown from "./Dropdown";
import { CiImageOn } from "react-icons/ci";
import Image from "next/image";
import { GrUnderline } from "react-icons/gr";
import Comprehensive from "./Comprehensive";
import { useRouter } from "next/navigation";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

const Categorize = () => {

  const router=useRouter();
  // const { setValue, handleSubmit, control, formState, trigger, watch } =
  //   useForm({ mode: "onChange" });

  // const { pending } = useFormStatus({ mode: "onChange" });

  // const { isDirty, isValid, errors } = useFormState({ control });

  // const onSubmit = (formData) => {
  //   console.log(formData);
  // };

  const [tasks, setTasks] = React.useState([
    { id: 1, content: "Task1" },
    { id: 2, content: "Task2" },
    { id: 3, content: "" },
  ]);

  const [items, setItems] = React.useState([
    { id: 1, content: "Item1", belongTo: "Task1" },
    { id: 2, content: "Item2", belongTo: "Task2" },
    { id: 3, content: "", belongTo: "" },
  ]);

  const [compresensive, setComprehensive] = React.useState([]);

  const [dashed, setDashed] = React.useState([]);
  const [image, setImage] = React.useState({});
  const [contentName, setContentName] = React.useState("Untitled Quiz");

  const [dashedElement, setDashedElement] = React.useState([]);
  const [isEditor, setIsEditor] = React.useState(false);
  const [activeUnderLine, setActiveUnderLine] = React.useState(false);
  const [selectedText, setSelectedText] = React.useState("");
  const [inputText, setInputText] = React.useState("");
  const [previewText, setPreviewText] = React.useState("");
  const [comprehensionText, setComprehensionText] = React.useState("");

  const isActive = (el) => {
    return dashedElement.includes(el);
  };

  // console.log(JSON.stringify(image, null, 2));

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDrag = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    const startPOs = getTaskPos(active.id);
    const endPos = getTaskPos(over.id);

    setTasks((tasks) => {
      return arrayMove(tasks, startPOs, endPos);
    });
  };

  const handleDragItems = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    const startPOs = getTaskPos(active.id);
    const endPos = getTaskPos(over.id);

    setItems((items) => {
      return arrayMove(items, startPOs, endPos);
    });
  };

  const handleDragDashedItems = (e) => {
    const { active, over } = e;
    if (active.id === over.id) return;
    const startPos = getTaskPos(active.id);
    const endPos = getTaskPos(over.id);
    setDashed((dashed) => {
      return arrayMove(dashed, startPos, endPos);
    });
  };

  const updateTaskContent = (id, newContent) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, content: newContent } : task
      )
    );
  };

  const updateItemContent = (id, newContent) => {
    setItems((prevItem) =>
      prevItem.map((task) =>
        task.id === id ? { ...task, content: newContent } : task
      )
    );
  };

  const removeTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const removeItem = (id) => {
    setTasks((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const addTask = () => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: prevTasks.length + 1, content: "", belongTo: "" },
    ]);
  };

  const addItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      { id: prevItems.length + 1, content: "", belongTo: "" },
    ]);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage((prevImages) => ({ ...prevImages, Question1: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelect = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      const selectedText = selection.toString();
      console.log("selectedtext", selectedText);
      setSelectedText(selectedText);
      setIsEditor(true);
      console.log("selectedText after selecting", selectedText);
      setActiveUnderLine(isActive(selectedText));
    } else {
      setIsEditor(false);
    }
  };

  const addElement = () => {
    console.log("add element is triggered", selectedText);
    const selection = window.getSelection();

    // //getting range of text
    // if (!selection.rangeCount) return;

    // const range = selection.getRangeAt(0);
    // const selectText = selection.toString();

    // console.log("selection", selectedText);
    if (selectedText) {
      const isExist = dashedElement.includes(selectedText);

      // //modyfying the selected text to underlined text
      // const newSpan = document.createElement("span");
      // newSpan.className = isExist ? "" : "underline";
      // newSpan.textContent = selectedText;

      // range.deleteContents();
      // range.insertNode(newSpan);

      if (isExist) {
        setDashedElement((prev) =>
          prev.filter((element) => element !== selectedText)
        );
        setDashed((prev) =>
          prev.filter((element) => element.content !== selectedText)
        );
      } else {
        setDashedElement((prev) => [...prev, selectedText]);
        setDashed((prev) => [
          ...prev,
          { id: prev.length + 1, content: selectedText },
        ]);
      }
      setIsEditor(false);
    }
  };

  React.useEffect(() => {
    let modifiedText = inputText;
    for (let i = 0; i < dashedElement.length; i++) {
      const selectedText = dashedElement[i];
      const regex = new RegExp(`\\b${selectedText}\\b`, "g");
      modifiedText = modifiedText.replace(regex, "_____");
    }
    setPreviewText(modifiedText);
  }, [inputText, dashedElement]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (tasks.length === 0) {
        toast.error("Please add tasks");
        return;
      }
      if (dashed.length === 0) {
        toast.error("Please add dashed items");
        return;
      }
      if (compresensive.length === 0) {
        toast.error("Please add comprehensive items");
        return;
      }

      const body = {
        contentName,
        categorize: tasks.filter((task) => task.content !== ""), //filtering empty task
        taskItems: items,
        cloze: dashed,
        clozeText: inputText,
        Comprehension: compresensive,
        comprehensionText: comprehensionText,
      };

      await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      console.log("submitted", body);
      toast.success("Submitted successfully");
      router.push("/content");
    } catch (error) {
      console.log("error in Submitting data", error);
    }
  };

  return (
    <div className=" px-20 h-full flex flex-col gap-10  ">
      <input
        value={contentName}
        onChange={(e) => setContentName(e.target.value)}
        className=" w-96 border-b-0 border-black"
      />
      <div className="border-[0.6px] border-gray-300 flex gap-0  rounded-md h-full">
        {/* <div className=" w-5 h-[100%] bg-sky-300 empty-div border-l-4 border-sky-400"></div> */}
        <div className="p-4 flex flex-col gap-4">
          <p>Question 1</p>
          <div className=" flex gap-4 items-end">
            <div className=" flex flex-col gap-2">
              <input
                type="text"
                placeholder="Description(optional)"
                className=" border border-black w-96 rounded-sm p-1"
              />
              <input type="file" />
            </div>
            <CiImageOn size={30} onClick={handleFileChange} />
          </div>
          {image.Question1 && (
            <Image src={image.Question1} width={150} height={100} alt="image" />
          )}

          <div>Categorize options</div>
          {/* tasks */}
          <DndContext onDragEnd={handleDrag}>
            <SortableContext
              items={tasks.map((i) => i.id)}
              strategy={verticalListSortingStrategy}
            >
              {tasks.map((task) => (
                <Task
                  key={task.id}
                  id={task.id}
                  title={task.content}
                  updateContent={updateTaskContent}
                  addTask={addTask}
                  removeTask={removeTask}
                  length={tasks.length}
                />
              ))}
            </SortableContext>
          </DndContext>

          <div className=" mt-10 flex gap-[416px]">
            <p>Item</p>
            <p>Belongs To</p>
          </div>
          {/* items */}
          <DndContext onDragEnd={handleDragItems}>
            <SortableContext
              items={items.map((i) => i.id)}
              strategy={verticalListSortingStrategy}
            >
              {items.map((item) => (
                <div className=" flex gap-40">
                  <Task
                    key={item.id}
                    id={item.id}
                    title={item.content}
                    updateContent={updateItemContent}
                    addTask={addItem}
                    removeTask={removeItem}
                    length={items.length}
                  />
                  <Dropdown
                    options={tasks.filter((item) => item.content !== "")}
                  />
                </div>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
      <div className="border-[0.6px] border-gray-300 flex gap-0  rounded-md h-full">
        <div className="p-4 flex flex-col gap-4">
          <p>Question 2</p>
          <label htmlFor="preview">
            Preview <span className=" text-red-500">*</span>
          </label>

          <input
            type="text"
            required
            value={previewText}
            readOnly
            className=" w-96 rounded border border-black p-1"
            placeholder="Preview"
          />

          <label htmlFor="preview">
            Sentence <span className=" text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              required
              onSelect={handleSelect}
              className=" w-96 rounded border border-black p-1 "
              placeholder="Preview"
            />

            {isEditor && (
              <div
                className={`${
                  activeUnderLine ? "bg-gray-400" : "bg-white"
                } absolute bottom-10 rounded left-0 border border-black p-1 `}
              >
                <GrUnderline onClick={addElement} size={20} />
              </div>
            )}
          </div>

          {/* tasks */}
          <DndContext onDragEnd={handleDragDashedItems}>
            <SortableContext
              items={dashed.map((i) => i.id)}
              strategy={verticalListSortingStrategy}
            >
              {dashed.map((task) => (
                <Task
                  key={task.id}
                  id={task.id}
                  title={task.content}
                  updateContent={updateTaskContent}
                  readOnly={true}
                  // addTask={addTask}
                  // removeTask={removeTask}
                  length={tasks.length}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
      <Comprehensive
        data={compresensive}
        setData={setComprehensive}
        setComprehensionText={setComprehensionText}
      />

      <button
        type="submit"
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-12 py-1 rounded-md w-fit"
      >
        Save
      </button>
      <ToastContainer />
    </div>
  );
};

export default Categorize;

{
  /* <Controller
name={"first_name"}
control={control}
defaultValue={""}
rules={{
  required: "First Name is required",
}}
render={({ field }) => (
  <div className=" flex flex-col gap-2">
    <input
      {...field}
      type="text"
      required
      placeholder="First Name"
      className=" w-64 bg-Black  p-2 placeholder:text-Grey-7 border border-black"
    />
    {errors.first_name && (
      <p className=" text-red-600">{errors.first_name.message}</p>
    )}
  </div>
)}
/> */
}
