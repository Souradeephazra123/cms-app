import React from "react";
import { FaCirclePlus } from "react-icons/fa6";

const ComprehensiveForm = ({ setOpenForm, setData }) => {
  const [questionTitle, setQuestionTitle] = React.useState("");
  const [options, setOptions] = React.useState(["", "", "", ""]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSave = () => {
    const mcqQuestion = {
      title: questionTitle,
      options: options,
    };
    setData((prevData) => [...prevData, mcqQuestion]);
    console.log("MCQ Question:", mcqQuestion);
    // You can add logic to save the MCQ question here
    setOpenForm(false); // Close the form after saving
  };

  return (
    <div className="p-4 border border-gray-300 rounded-md">
      <h2 className="text-lg font-bold mb-4">Create MCQ Question</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Question Title
        </label>
        <input
          type="text"
          value={questionTitle}
          onChange={(e) => setQuestionTitle(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter the question title"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Options
        </label>
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 mb-2"
            placeholder={`Option ${index + 1}`}
          />
        ))}
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-12 py-1 rounded-md"
      >
        Save
      </button>
    </div>
  );
};

const Comprehensive = ({ data, setData }) => {
  const [openForm, setOpenForm] = React.useState(false);
  return (
    <div className="border-[0.6px] border-gray-300 flex gap-0  rounded-md h-full w-[100%]">
      <div className="p-4 flex flex-col gap-4 w-[100%]">
        <p>Question 3</p>
        <textarea
          className="border border-black p-2 rounded-md w-[70%] h-[70vh] "
          placeholder="Enter your comprehensive story here"
        />

        {data?.length === 0 && (
          <button
            onClick={() => setOpenForm(true)}
            className=" bg-blue-700 rounded-md px-4 py-1 text-white w-fit"
          >
            Add Question
          </button>
        )}

        {/* data */}

        <div className=" flex flex-col gap-4">
          {data?.map((question, index) => (
            <div key={index} className=" flex gap-2">
              <div className=" border border-black rounded-md px-6 py-3 w-[80%]">
                <div className=" flex justify-center items-center">
                  {" "}
                  <p className=" text-center rounded-2xl px-4 py-1 bg-sky-400 text-white w-fit">
                    MCQ
                  </p>
                </div>
                <p>Question 3.{index + 1}</p>
                <p>{question?.title}</p>
                {question?.options?.map((item, idx) => (
                  <div key={idx} className=" flex gap-2">
                    <input
                      type="radio"
                      id={item}
                      name={question.title}
                      value={item}
                    />
                    <label for="htmlFor">{item}</label>
                    <br />
                  </div>
                ))}
              </div>
              {index === data?.length - 1 && (
                <div>
                  <FaCirclePlus
                    size={20}
                    color="#152642"
                    className=" cursor-pointer"
                    onClick={() => setOpenForm(true)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* form */}
        {openForm && (
          <ComprehensiveForm setOpenForm={setOpenForm} setData={setData} />
        )}
      </div>
    </div>
  );
};

export default Comprehensive;
