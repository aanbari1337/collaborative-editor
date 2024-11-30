import { useMutation, UseMutationResult } from "react-query";
import API from "@/api/axios-instance";
import { LoginFormValues } from "../../../types";

const useLogin = (
  options: any
): UseMutationResult<unknown, unknown, LoginFormValues> =>
  useMutation({
    mutationFn: (body: LoginFormValues) => {
      return API.post("/auth/login", body);
    },
    ...options,
  });

export default useLogin;
