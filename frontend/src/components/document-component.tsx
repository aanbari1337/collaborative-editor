import React from "react";
import { Link } from "react-router-dom";
import TrashIcon from "@/assets/icons/trash-icon.svg?react";
import useDeleteDocument from "@/pages/document/api/delete-document";

interface Props {
  id: number;
  title: string;
  createdAt: string;
}
const DocumentComponent = ({ id, title, createdAt }: Props) => {
  const { mutate: deleteDocument } = useDeleteDocument({ id });

  const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deleteDocument();
  };
  return (
    <Link
      to={`/documents/${id}`}
      className='flex justify-between items-center p-2 border-b border-b-gray-200 font-fira '
    >
      <div className='flex flex-col'>
        <h3 className='text-base font-semibold'>{title}</h3>
        <span className='text-xs text-gray-500'>{createdAt}</span>
      </div>
      <button className='text-gray-500' onClick={onDelete}>
        <TrashIcon width={20} height={20} />
      </button>
    </Link>
  );
};

export default DocumentComponent;
