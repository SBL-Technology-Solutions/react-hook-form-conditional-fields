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
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleRegistration)}>
      <div className="flex-col gap-4">
        <label>Name</label>
        <input
          className="text-black"
          //@ts-ignore
          name="name"
          type="text"
          {...register('name', { required: "Name is required" })}
          onChange={handleChange}
        />
        <small className="text-danger">
          {errors?.name && errors.name.message}
        </small>
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          className="text-black"
          //@ts-ignore
          name="email"
          {...register('email', { required: "Email is required" })}
          onChange={handleChange}
        />
        <small className="text-danger">
          {errors?.email && errors.email.message}
        </small>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          className="text-black"
          //@ts-ignore
          name="password"
          {...register('password', {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters"
            }
          })}
          onChange={handleChange}
        />
        <small className="text-danger">
          {errors?.password && errors.password.message}
        </small>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

function page() {
  return (
    <div><RegisterForm /></div>
  )
}

export default page;