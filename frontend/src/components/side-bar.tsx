import React from "react";
import DocumentComponent from "./document-component";
import useGetDocuments from "../api/get-documents";
import { Document } from "../types";
import moment from "moment";
import { Link } from "react-router-dom";

const SideBar = () => {
  const { data } = useGetDocuments();
  return (
    <div className='h-full flex flex-col justify-start border-r border-r-gray-300 shadow'>
      <Link to={"/documents/new"}>New document</Link>
      {data?.map((document: Document) => (
        <DocumentComponent
          key={document.id}
          id={document.id}
          title={document.title}
          createdAt={moment(document.createdAt).format("ll")}
        />
      ))}
    </div>
  );
};

export default SideBar;
