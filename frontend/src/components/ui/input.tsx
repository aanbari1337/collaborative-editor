const Input = ({ ...props }) => {
  return (
    <input
      {...props}
      className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm/6 focus-visible:outline-none'
    />
  );
};

export default Input;
