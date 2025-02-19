import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";
import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className=" grid grid-cols-12">
        <div className="col-span-2 ">
          <Sidebar />
        </div>
        <div className="col-span-10 grid grid-rows-12 ">
          <div className="row-span-1">
            <Navbar />
          </div>
          <div className="row-span-11">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default layout;
