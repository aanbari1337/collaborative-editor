import React from "react";
import DocumentComponent from "./document-component";
import useGetDocuments from "../api/get-documents";
import { Document } from "../types";
import moment from "moment";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes/constants";

const SideBar = () => {
  const { data, error } = useGetDocuments();

  if (error) return <div>Something went wrong! try later</div>;
  return (
    <div className='h-full flex flex-col justify-start gap-5  border-r border-r-gray-300 shadow'>
      <header className='p-2'>
        <Link
          to={ROUTES.document("new")}
          className='w-fit text-sm p-1 px-2 bg-blue-600 text-white rounded'
        >
          New Document
        </Link>
      </header>
      <div className='flex flex-col flex-grow'>
        {data?.map((document: Document) => (
          <DocumentComponent
            key={document.id}
            id={document.id}
            title={document.title}
            createdAt={moment(document.createdAt).format("ll")}
          />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
