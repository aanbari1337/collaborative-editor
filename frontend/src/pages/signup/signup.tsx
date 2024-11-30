import { Controller, useForm } from "react-hook-form";
import FormField from "@/components/ui/form-field";
import { Link, useNavigate } from "react-router-dom";
import useRegister from "./api/signup";
import { ROUTES } from "../../routes/constants";
import { SignupFormValues } from "../../types";

const Signup = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<SignupFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const { mutate: signup, isLoading } = useRegister({
    onSuccess: () => navigate(ROUTES.login),
  });

  const onSubmit = (values: SignupFormValues) => {
    signup({
      firstName: values.firstName,
      lastName: values.lastName,
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
          <h2 className='text-2xl font-bold'>Register</h2>
        </header>
        <Controller
          name='firstName'
          control={control}
          render={({ field }) => <FormField label={"first name"} {...field} />}
        />

        <Controller
          name='lastName'
          control={control}
          render={({ field }) => <FormField label={"last name"} {...field} />}
        />
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <FormField label={"email"} type='email' {...field} />
          )}
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
            to={ROUTES.login}
            className='px-3 py-1 bg-white text-blue-500  rounded'
          >
            login
          </Link>
          <button
            type='submit'
            className='px-3 py-1 bg-blue-600  text-white rounded'
          >
            {isLoading ? "loading..." : "Register"}
          </button>
        </footer>
      </form>
    </div>
  );
};

export default Signup;
