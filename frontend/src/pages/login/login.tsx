import { Controller, useForm } from "react-hook-form";
import FormField from "@/components/ui/form-field";
import { Link } from "react-router-dom";
import useLogin from "./api/login";
import { ROUTES } from "../../routes/constants";
import { LoginFormValues } from "../../types";

const Login = () => {
  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate: login, isLoading } = useLogin({
    onSuccess: (data) => {
      localStorage.setItem("token", data.data);
      return (window.location.href = ROUTES.home);
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    login({
      email: values.email,
      password: values.password,
    });
  };
  return (
    <div className='w-1/3 mx-auto mt-6 p-5 border border-gray-200 rounded-lg'>
      <form
        className='font-fira flex flex-col gap-3'
        onSubmit={handleSubmit(onSubmit)}
      >
        <header className='text-center'>
          <h2 className='text-2xl font-bold'>Login</h2>
        </header>

        <Controller
          name='email'
          control={control}
          render={({ field }) => <FormField label={"email"} {...field} />}
        />
        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <FormField label={"password"} type='password' {...field} />
          )}
        />
        <footer className='flex justify-end items-center mt-3'>
          <Link
            to={ROUTES.signup}
            className='px-3 py-1 bg-white text-blue-500  rounded'
          >
            register
          </Link>
          <button
            type='submit'
            className='px-3 py-1 bg-blue-600  text-white rounded'
          >
            {isLoading ? "loading..." : "Login"}
          </button>
        </footer>
      </form>
    </div>
  );
};

export default Login;
