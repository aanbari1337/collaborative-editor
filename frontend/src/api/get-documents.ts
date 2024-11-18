import { useQuery } from "react-query";
import API from "./axios-instance";

export const GET_DOCUMENT_LIST_KEY = "GET_DOCUMENT_LIST_KEY";

const useGetDocuments = () =>
  useQuery(GET_DOCUMENT_LIST_KEY, async () => {
    try {
      const response = await API.get("/documents");
      return response.data;
    } catch (error) {
      return error;
    }
  });

export default useGetDocuments;
