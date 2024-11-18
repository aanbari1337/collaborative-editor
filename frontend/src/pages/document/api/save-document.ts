import { useMutation } from "react-query";
import API from "@/api/axios-instance";

const useSaveDocument = () => {
  return useMutation({
    mutationFn: (body: { title: string; content: string }) => {
      return API.post("/documents", body);
    },
  });
};

export default useSaveDocument;
