import * as React from "react";
import SideBar from "./side-bar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-screen h-screen flex'>
      <div>
        <SideBar />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default AppLayout;
