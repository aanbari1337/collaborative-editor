import React from "react";
import { Link } from "react-router-dom";

interface Props {
  id: number;
  title: string;
  createdAt: string;
}
const DocumentComponent = ({ id, title, createdAt }: Props) => {
  return (
    <Link to={`/documents/${id}`}>
      <div className='p-2 border-b border-b-gray-300 cursor-pointer'>
        <h3 className='text-base font-semibold'>{title}</h3>
        <span className='text-xs text-gray-500'>{createdAt}</span>
      </div>
    </Link>
  );
};

export default DocumentComponent;
