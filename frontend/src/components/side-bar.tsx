import React from "react";
import DocumentComponent from "./document-component";

const SideBar = () => {
  return (
    <div className='h-full flex flex-col justify-start border-r border-r-gray-300 shadow'>
      <DocumentComponent id='1' />
    </div>
  );
};

export default SideBar;
