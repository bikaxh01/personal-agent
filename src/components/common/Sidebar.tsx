import { CircleFadingPlus, NotebookPen, Settings } from "lucide-react";
import React from "react";

const history = [
  { title: "how are you" },
  { title: "how are you" },
  { title: "how are you" },
  { title: "how are you" },
  { title: "how are you" },
  { title: "how are you" },
  { title: "how are you" },
  { title: "how are you" },
  { title: "how are you" },
  { title: "how are you" },
  { title: "how are you" },
  { title: "how are you" },
  { title: "how are you" },
  { title: "how are you" },
  { title: "how are you" },
  { title: "how are you" },
  { title: "how are you" },
];

function Sidebar() {
  return (
    <div className=" h-screen grid-rows-12 grid p-3 border-r-2">
      <div className=" flex row-span-1 h-12  items-center justify-between">
        <Settings />
        <CircleFadingPlus />
      </div>
      <div className="  overflow-auto row-span-9 justify-center h-full  flex flex-col gap-3 ">
        {history.map((item, index) => (
          <div className="  p-2 hover:bg-gray-200  rounded-lg" key={index}>
            {item.title}
          </div>
        ))}
      </div>

      <div className="row-span-2   items-center justify-center flex">
        <h1 className=" text-xl ">Your Personal Assistant</h1>
      </div>
    </div>
  );
}

export default Sidebar;
