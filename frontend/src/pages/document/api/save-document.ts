import { useMutation, useQueryClient } from "react-query";
import API from "@/api/axios-instance";
import { GET_DOCUMENT_LIST_KEY } from "../../../api/get-documents";

const useSaveDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { title: string; content: string }) => {
      return API.post("/documents", body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(GET_DOCUMENT_LIST_KEY);
    },
  });
};

export default useSaveDocument;
