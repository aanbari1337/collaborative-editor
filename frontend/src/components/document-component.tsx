import React from "react";
import { Link } from "react-router-dom";

interface Props {
  id: string;
}
const DocumentComponent = ({ id }: Props) => {
  return (
    <Link to={`/documents/${id}`}>
      <div className='p-2 border-b border-b-gray-300 cursor-pointer'>
        <h3 className='text-base font-semibold'>Task One</h3>
        <span className='text-xs text-gray-500'>Created at: 14/11/2024</span>
      </div>
    </Link>
  );
};

export default DocumentComponent;
