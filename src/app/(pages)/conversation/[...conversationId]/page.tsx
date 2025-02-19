"use client";
import { getAllMessages, getSystemResponse } from "@/apis/Message";
import { ChatComponent, Message } from "@/components/common/ChatComponent";
import Textarea from "@/components/common/Textarea";

import { useInitialPromptStore } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function ConversationPage() {
  const [messages, setMessages] = useState<Message[] | []>([]);
  const params = useParams<{ conversationId: string }>();
  const { initialPrompt, removeInitialPrompt } = useInitialPromptStore();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: getSystemResponse,
    onSuccess: (data) => {
      const systemMessage: Message = { content: data.data, role: "SYSTEM" };
      setMessages((prev) => [...prev, systemMessage]);
    },
    onError: (error) => {
      alert("something went wrong");
    },
  });
  const fetchAllMsgMutation = useMutation({
    mutationFn: getAllMessages,
    onSuccess: (data) => {
      
      setMessages((prev) => [...data.data]);
    },
    onError: (error) => {
      alert("something went wrong");
    },
  });

  useEffect(() => {
    if (initialPrompt) {
      // send request and
      const userMessage: Message = { content: initialPrompt, role: "USER" };
      setMessages((prev) => [...prev, userMessage]);
      mutateAsync({
        userPrompt: initialPrompt,
        conversationId: params.conversationId,
      });
      removeInitialPrompt();
    } else {
     
      fetchAllMsgMutation.mutateAsync({conversationId:params.conversationId});
    }
  }, []);

  const handleSubmit = async (value: string) => {
    // append message
    const userMessage: Message = { content: value, role: "USER" };
    setMessages((prev) => [...prev, userMessage]);
    mutateAsync({
      userPrompt: value,
      conversationId: params.conversationId,
    });
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
