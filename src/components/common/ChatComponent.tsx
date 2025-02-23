"use client";
import Image from "next/image";
import { useRef, useState,useEffect, Ref } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark.css";
import { UserButton } from "@clerk/nextjs";

export type Message = {
  role: "USER" | "SYSTEM";
  content: string;
};

export function ChatComponent({ messages }: { messages: Message[] }) {
  const chatComponent = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (chatComponent.current) {
      chatComponent.current.scrollTop = chatComponent.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div
        ref={chatComponent}
        className="  h-full  pl-16 flex scroll-smooth  flex-col gap-4 pr-16 overflow-auto"
      >
        {messages.map((item, index) =>
          item.role === "USER" ? (
            <div className=" flex  items-end gap-3 justify-end p-2" key={index}>
              <div className=" overflow-hidden  bg-gray-200  rounded-lg  flex items-center max-w-[30rem]  p-2 justify-center">
                <h2 className="  text-l">{item.content}</h2>
              </div>
            </div>
          ) : (
            <ReactMarkdown
              key={index}
              className={""}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-2xl font-bold mt-4">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl font-semibold mt-3">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-medium mt-2">{children}</h3>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold">{children}</strong>
                ),
                em: ({ children }) => <em className="italic">{children}</em>,
                ul: ({ children }) => (
                  <ul className="list-disc pl-5">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-5">{children}</ol>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-gray-500 pl-4 italic text-gray-300">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {item.content}
            </ReactMarkdown>
          )
        )}
      </div>
    </>
  );
}
