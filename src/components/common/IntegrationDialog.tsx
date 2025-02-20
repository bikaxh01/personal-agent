"use client";
import { Cable, Copy, Mail, Unplug } from "lucide-react";

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

export function IntegrationComponent() {


  const handleGmailConnect = async () => {
    const res = await axios.get("/api/connect-gmail");
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
        <div className="flex items-center hover:bg-gray-100  gap-2">
          <Mail className=" size-4" /> Connect Gmail Account
          <div className="grid flex-1 bg-red-200 gap-2"></div>
          <Button
            onClick={handleGmailConnect}
            type="submit"
            size="sm"
            className="px-3  hover:bg-slate-700"
          >
            <Unplug />
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
