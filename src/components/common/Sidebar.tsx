"use client";
import { getConversations } from "@/apis/ConversationApi";
import { useQuery } from "@tanstack/react-query";
import { CircleFadingPlus, Loader, NotebookPen, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";

function Sidebar() {
  const { data, isFetching } = useQuery({
    queryFn: getConversations,
    queryKey: ["conversations"],
    initialData: [],
  });

  return (
    <div className=" h-screen    grid-rows-12 grid p-3 border-r-2">
      <div className=" flex   row-span-1 h-12  items-center justify-between">
        <Link href={"/setting"}>
          <Settings />
        </Link>
        <Link href={"/conversation"}>
          <CircleFadingPlus />
        </Link>
      </div>
      <div className="   row-span-9  h-full p-2   flex flex-col  ">
        <h1 className=" border-b-2 ">History</h1>
        <div className="overflow-auto gap-1  ">

        
        {isFetching ? (
          <div className="flex items-center  justify-center">
            <Loader className=" size-7 text-gray-400  animate-spin " />
          </div>
        ) : data.length > 0 ? (
          data.map((item: any, index: number) => (
            <Link
              href={`/conversation/${item.id}`}
              className={`max-h-10 hover:bg-gray-200  w-52  flex p-2 rounded-lg `}
            >
              <div className="  truncate" key={index}>
                {item.title}
              </div>
            </Link>
          ))
        ) : (
          <h2>No history</h2>
        )}
        </div>
      </div>

      <div className="row-span-2   items-center justify-center flex">
        <h1 className=" text-xl ">Your Personal Assistant</h1>
      </div>
    </div>
  );
}

export default Sidebar;
