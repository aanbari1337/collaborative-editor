import * as React from "react";
import SideBar from "./side-bar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-screen h-screen flex'>
      <div className='w-52'>
        <SideBar />
      </div>
      <div className='flex-grow'>{children}</div>
    </div>
  );
};

export default AppLayout;
