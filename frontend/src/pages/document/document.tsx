import { useParams } from "react-router-dom";
import useGetDocumentDetails from "./api/get-document-details";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useState } from "react";
import { Document as DocumentType } from "../../types";
import useSaveDocument from "./api/save-document";

const Document = () => {
  const { id } = useParams();

  if (!id) return <div>Not found</div>;
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const { mutate: saveDocument } = useSaveDocument();
  const { isLoading, error } = useGetDocumentDetails(
    {
      id,
    },
    {
      enabled: id !== "new",
      onSuccess: (data: DocumentType) => {
        setContent(data.content);
        setTitle(data.title);
      },
    }
  );

  if (isLoading) return <div>loading...</div>;
  if (error) {
    console.log(error);
    return;
  }

  const onSaveDocument = () => {
    saveDocument({
      title,
      content,
    });
  };
  return (
    <div className='font-fira flex gap-5 divide-x h-full'>
      <div className='flex flex-col flex-grow gap-5'>
        <header className='flex justify-between'>
          <label htmlFor='title' className='flex flex-col gap-1 text-sm'>
            Title:
            <input
              name='title'
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm/6 focus-visible:outline-none'
            />
          </label>
        </header>
        <label
          htmlFor='content'
          className='flex flex-col flex-grow gap-1 text-sm'
        >
          Description:
          <textarea
            className='block w-full h-full resize-none rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm/6 focus-visible:outline-none'
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
        </label>
        <button
          className='ml-auto w-fit text-sm p-1 px-3 bg-blue-600 text-white rounded'
          onClick={onSaveDocument}
        >
          Save
        </button>
      </div>
      <div className='flex flex-col flex-grow gap-5 pl-5'>
        <h3 className='font-bold'>Preview</h3>
        <div className='flex-grow bg-gray-100 p-2 rounded-md'>
          <Markdown
            children={content}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            className='grow'
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default Document;
