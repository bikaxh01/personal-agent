"use client";
import { createConversation } from "@/apis/ConversationApi";
import Textarea from "@/components/common/Textarea";
import { useInitialPromptStore } from "@/store/store";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

function page() {
  const [input, setInput] = useState("");
  const router = useRouter();
  const { addInitialPrompt } = useInitialPromptStore();

  const conversationMutation = useMutation({
    mutationFn: createConversation,
    onSuccess: (data) => {
      router.push(`/conversation/${data.data.id}`);
      addInitialPrompt(input);
    },
    onError: (err) => {
      console.log("🚀 ~ page ~ err:", err);
    },
  });
  const handleSubmit = (value: string) => {
    setInput(value);
    conversationMutation.mutateAsync(value);
  };
  return (
    <div className="flex flex-col h-full">
      <div className=" flex gap-3 h-full justify-center  flex-col items-center">
        <h1 className=" text-2xl font-semibold ">What can I help with?</h1>
        <Textarea handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default page;
