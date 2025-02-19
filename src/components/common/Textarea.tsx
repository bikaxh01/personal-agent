import React, { useState } from "react";
import { PaperclipIcon, SendHorizonal } from "lucide-react";

function Textarea({ handleSubmit }: { handleSubmit: (value: string) => void }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="  h-[8rem] w-[50rem] p-2 border-2 bg-white rounded-md">
      <textarea
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const trimmedStr = inputValue.trim();
            e.preventDefault();
            if (trimmedStr) {
              handleSubmit(trimmedStr);
              return;
            }
          }
        }}
        placeholder="Enter your message"
        className=" w-full border-none outline-none p-2 resize-none"
      />
      <div className=" flex justify-between">
        <div className=" border hover:bg-gray-200 p-3  rounded-full ">
          <PaperclipIcon className="size-5" />
        </div>
        <button
          className="hover:bg-gray-200 h-10  p-3 border gap-2 flex items-center justify-center rounded-xl"
          onClick={(e) => {
            const trimmedStr = inputValue.trim();

            if (trimmedStr) {
              handleSubmit(trimmedStr);
              return;
            }
          }}
        >
          submit
          <SendHorizonal className="size-5" />
        </button>
      </div>
    </div>
  );
}

export default Textarea;
