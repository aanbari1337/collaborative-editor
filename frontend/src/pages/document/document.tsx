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
    <div className='flex flex-col gap-5'>
      <header className='flex justify-between'>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={onSaveDocument}>Save</button>
      </header>
      <section className='flex gap-2'>
        <textarea
          className='grow border rounded-md border-gray-400'
          rows={6}
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <Markdown
          children={content}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          className='grow'
        />{" "}
      </section>
    </div>
  );
};

export default Document;
