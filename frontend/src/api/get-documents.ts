import { useQuery } from "react-query";
import API from "./axios-instance";
import type { AxiosError } from "axios";

export const GET_DOCUMENT_LIST_KEY = "GET_DOCUMENT_LIST_KEY";

const useGetDocuments = () =>
  useQuery(
    GET_DOCUMENT_LIST_KEY,
    async () => {
      try {
        const response = await API.get("/documents");
        return response.data;
      } catch (error) {
        const err = error as AxiosError | Error;

        throw new Error(err.message);
      }
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );

export default useGetDocuments;
