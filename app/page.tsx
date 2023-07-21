"use client"

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { debounce } from "lodash";
import { z } from "zod";

const schema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(8, { message: "Password must have at least 8 characters" }),
});

const debouncedSave = debounce((data) => {
  const validationResult = schema.safeParse(data);
  if (validationResult.success) {
    saveForm(data);
  }
}, 5000);
//@ts-ignore
const saveForm = (data) => {
  console.log("Saving form data:", data);
};

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();

  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, []);
//@ts-ignore
  const handleRegistration = (data) => {
    const validationResult = schema.safeParse(data);
    if (validationResult.success) {
      console.log("Valid form data:", validationResult.data);
      // Perform your form submission here
    } else {
      handleError(validationResult.error.formErrors);
    }
  };
//@ts-ignore
  const handleError = (formErrors) => {
    console.log("Form errors:", formErrors);
    // Handle form errors here
  };

  const handleChange = () => {
    debouncedSave(getValues());
  };

  return (
    <form className="flex flex-col gap-4 p-4 bg-[#202A3C]" onSubmit={handleSubmit(handleRegistration)}>
      <div className="flex flex-col gap-4">
        <label className="text-white font-semibold" htmlFor="name">
          Name
        </label>
        <input
          className="mt-2 w-full rounded bg-white px-2 py-1 text-black"
          //@ts-ignore

          name="name"
          type="text"
          {...register("name", { required: "Name is required" })}
          onChange={handleChange}
        />
        <small className="text-red-700">

          {errors?.name && errors.name.message}
        </small>
      </div>
      <div className="flex flex-col gap-4">
        <label className="text-white font-semibold" htmlFor="email">
          Email
        </label>
        <input
          className="mt-2 w-full rounded bg-white px-2 py-1 text-black"
          //@ts-ignore

          name="email"
          type="email"
          {...register("email", { required: "Email is required" })}
          onChange={handleChange}
        />
        <small className="text-red-700">
          {errors?.email && errors.email.message}
        </small>
      </div>
      <div className="flex flex-col gap-4">
        <label className="text-white font-semibold" htmlFor="password">
          Password
        </label>
        <input
          className="mt-2 w-full rounded bg-white px-2 py-1 text-black"
          //@ts-ignore
          name="password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
          })}
          onChange={handleChange}
        />
        <small className="text-red-700">
          {errors?.password && errors.password.message}
        </small>
      </div>
      <button
        type="submit"
        className="mt-8 flex w-full items-center justify-center space-x-2 rounded-lg bg-primary px-4 py-2 text-lg font-bold text-white hover:bg-white hover:text-primary hover:text-[#202A3C] hover:duration-500 hover:ease-in-out"
      >
        <p>Submit</p>
      </button>
    </form>
  );
};

function page() {
  return (
    <div className="bg-blue-50 p-8">
      <RegisterForm />
    </div>
  );
}

export default page;
