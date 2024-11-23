import { useMutation, useQueryClient } from "react-query";
import API from "@/api/axios-instance";
import { GET_DOCUMENT_LIST_KEY } from "../../../api/get-documents";

const useUpdateDocument = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { title: string; content: string }) => {
      return API.put(`/documents/document/${id}`, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(GET_DOCUMENT_LIST_KEY);
    },
  });
};

export default useUpdateDocument;
