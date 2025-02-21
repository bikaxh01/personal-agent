"use client";
import {
  Cable,
  CircleCheckBig,
  Copy,
  Mail,
  Presentation,
  Unplug,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";

import { redirect } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { checkIntegrations } from "@/apis/Integrations";
import { useEffect, useState } from "react";

export function IntegrationComponent() {
  const [isGmailConnected, setGmailConnected] = useState(false);
  const [isMeetConnected, setMeetConnected] = useState(false);

  const { data, isFetching, error } = useQuery({
    queryFn: checkIntegrations,
    queryKey: ["checkIntegrations"],
  });
 

  useEffect(() => {
    if (data) {
      setGmailConnected(data.gmailConnection);
      setMeetConnected(data.meetConnection);
    }
  }, [data]);

  const handleGmailConnect = async () => {
    const res = await axios.get("/api/connect-gmail");
    redirect(res.data.data);
  };
  const handleMeetConnect = async () => {
    const res = await axios.get("/api/connect-meet");
    redirect(res.data.data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Cable />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Integration's</DialogTitle>
          <DialogDescription>Connect your account</DialogDescription>
        </DialogHeader>
        <div className="flex items-center hover:bg-gray-200    gap-2">
          <Mail className=" size-4" /> Connect Gmail Account
          <div className="grid flex-1 bg-red-200 gap-2"></div>
          <Button
            onClick={handleGmailConnect}
            disabled={isGmailConnected}
            type="submit"
            size="sm"
            className={`px-3 hover:bg-slate-700 ${
              isGmailConnected ? "bg-green-500 hover:bg-green-400" : ""
            }`}
          >
            {isGmailConnected ? <CircleCheckBig /> : <Unplug />}
          </Button>
        </div>
        <div className="flex items-center hover:bg-gray-200  gap-2">
          <Presentation className=" size-4" /> Connect google meet
          <div className="grid flex-1 bg-red-200 gap-2"></div>
          <Button
            variant={"default"}
            onClick={handleMeetConnect}
            disabled={isMeetConnected}
            type="submit"
            size="sm"
            className={`px-3 hover:bg-slate-700 ${
              isMeetConnected ? "bg-green-500 hover:bg-green-400" : ""
            }`}
          >
            {isMeetConnected ? <CircleCheckBig /> : <Unplug />}
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
