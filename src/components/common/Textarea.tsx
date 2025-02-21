import React, { useState } from "react";
import { Loader, PaperclipIcon, SendHorizonal } from "lucide-react";

function Textarea({
  handleSubmit,
  isLoading,
}: {
  handleSubmit: (value: string) => void;
  isLoading: boolean;
}) {
  const [inputValue, setInputValue] = useState("");


  return (
    <div className="  h-[8rem] w-[50rem] p-2 border-2 bg-white rounded-md">
      <textarea
      value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (!isLoading) {
            if (e.key === "Enter") {
              setInputValue('')
              const trimmedStr = inputValue.trim();
              e.preventDefault();
              if (trimmedStr) {
                handleSubmit(trimmedStr);
                return;
              }
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
          className={`hover:bg-gray-200 h-10  p-3 border gap-2 flex items-center justify-center rounded-xl ${
            isLoading && "text-gray-400"
          }`}
          disabled={isLoading}
          onClick={(e) => {
            setInputValue('')
            const trimmedStr = inputValue.trim();

            if (trimmedStr) {
              handleSubmit(trimmedStr);
              return;
            }
          }}
        >
          submit
          {isLoading ? (
            <Loader className=" size-5 animate-spin" />
          ) : (
            <SendHorizonal className="size-5" />
          )}
        </button>
      </div>
    </div>
  );
}

export default Textarea;
