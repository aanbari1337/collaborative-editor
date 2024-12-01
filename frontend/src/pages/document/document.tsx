import { useParams } from "react-router-dom";
import useGetDocumentDetails from "./api/get-document-details";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useEffect, useState } from "react";
import { connectedUser, Document as DocumentType } from "../../types";
import useSaveDocument from "./api/save-document";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import useUpdateDocument from "./api/update-document";
import Input from "../../components/ui/input";
import {
  connectSocket,
  disconnectSocket,
  sendMessage,
} from "../../api/socket-client";
import { USER } from "../../helpers/constants";

const Document = () => {
  const user: connectedUser = JSON.parse(localStorage.getItem(USER) || "");
  const { id } = useParams();
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const { mutate: saveDocument } = useSaveDocument();
  const { mutate: updateDocument } = useUpdateDocument({
    id: parseInt(id as string),
  });
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

  useEffect(() => {
    if (id === "new") {
      setTitle("");
      setContent("");
    }
    connectSocket((data) => {
      if (user.id !== data.sender) {
        setTitle(data.title);
        setContent(data.content);
      }
    });

    return () => {
      disconnectSocket();
    };
  }, [id]);

  if (!id) return <div>Not found</div>;
  if (isLoading) return <div>loading...</div>;
  if (error) {
    console.log(error);
    return;
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const message = {
      sender: user.id,
      title: title,
      content: e.target.value,
    };
    setContent(e.target.value);
    sendMessage(message);
  };
  const onSaveDocument = () => {
    if (id === "new")
      saveDocument({
        title,
        content,
      });
    else
      updateDocument({
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
            <Input
              name='title'
              type='text'
              value={title}
              onChange={handleTitleChange}
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
            onChange={handleContentChange}
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
            components={{
              code(props) {
                const { children, className, node, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    {...rest}
                    PreTag='div'
                    children={String(children).replace(/\n$/, "")}
                    language={match[1]}
                    className='bg-gray-500'
                  />
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Document;
