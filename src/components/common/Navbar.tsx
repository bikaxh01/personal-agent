import { UserButton } from "@clerk/nextjs";
import React from "react";

function Navbar() {
  return (
    <div className=" border-b-2 h-full p-2  flex items-center justify-between ">
      <div >
        <h2 className=" font-medium" >AI AGENT</h2>
      </div>
      <div>
        <UserButton />
      </div>
    </div>
  );
}

export default Navbar;
