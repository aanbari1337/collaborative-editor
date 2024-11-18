import { useQuery } from "react-query";
import API from "@/api/axios-instance";

export const GET_DOCUMENT_DETAILS_KEY = "GET_DOCUMENT_DETAILS_KEY";

const useGetDocumentDetails = (
  body: { id: string | undefined },
  options: any
) =>
  useQuery(
    [GET_DOCUMENT_DETAILS_KEY, body],
    async () => {
      try {
        const response = await API.get(`/documents/${body.id}`);
        return response.data;
      } catch (error) {
        return error;
      }
    },
    {
      refetchOnWindowFocus: false,
      retry: 0,
      ...options,
    }
  );

export default useGetDocumentDetails;
