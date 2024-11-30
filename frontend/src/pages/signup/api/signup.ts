import { useMutation, UseMutationResult } from "react-query";
import API from "@/api/axios-instance";
import { SignupFormValues } from "../../../types";

const useRegister = (
  options: any
): UseMutationResult<unknown, unknown, SignupFormValues> =>
  useMutation({
    mutationFn: (body: SignupFormValues) => {
      return API.post("/auth/signup", body);
    },
    ...options,
  });

export default useRegister;
