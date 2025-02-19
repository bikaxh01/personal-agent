"use client";
import { ChatComponent, Message } from "@/components/common/ChatComponent";
import Textarea from "@/components/common/Textarea";

import { useInitialPromptStore } from "@/store/store";
import React, { useEffect, useState } from "react";

function ConversationPage() {
  const [messages, setMessages] = useState<Message[] | []>([]);
   
  const {initialPrompt,removeInitialPrompt} = useInitialPromptStore()
  
  useEffect(()=>{
    console.log("🚀 ~ ConversationPage ~ initialPrompt:", initialPrompt)
   
  },[initialPrompt])



  const handleSubmit = async (value: string) => {
    // append message
    const userMessage: Message = { type: "user", content: value };

    setMessages((prev) => [...prev, userMessage]);

    //send request
    console.log("🚀 ~ handleSubmit ~ value:", value);
  };
  return (
    <div className=" flex flex-col h-full ">
   
        <div className=" relative">
          <div className="">
            <ChatComponent messages={messages} />
          </div>
          <div className=" absolute z-10  w-full items-center justify-center flex top-[31rem]">
            <Textarea handleSubmit={handleSubmit} />
          </div>
        </div>
    
    </div>
  );
}

export default ConversationPage;
