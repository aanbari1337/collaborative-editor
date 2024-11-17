import { useParams } from "react-router-dom";

const Document = () => {
  const { id } = useParams();
  return <div>Document Id: {id}</div>;
};

export default Document;
