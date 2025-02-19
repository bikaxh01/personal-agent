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
    <div className=" h-screen  p-3 border-r-2">
      <div className=" flex items-center justify-between">
        <Settings />
        <CircleFadingPlus />
      </div>
      <div className=" mt-7 overflow-auto  justify-center h-[35rem]  flex flex-col gap-3 ">
        {history.map((item, index) => (
          <div className="  p-2 hover:bg-gray-200  rounded-lg" key={index}>
            {item.title}
          </div>
        ))}
      </div>

      <div className="  items-center justify-center flex">
        <h1 className=" text-xl ">Your Personal Assistant</h1>
      </div>
    </div>
  );
}

export default Sidebar;
