"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "lodash";
import { z } from "zod";
import { toast } from "react-toastify";

const formSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must have at least 8 characters" }),
});

//@ts-ignore
const saveForm = (data) => {
  console.log("Saving form data:", data);
};

export const AutoSaveForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
  });

  const debouncedSave = debounce((data) => {
    const validationResult = formSchema.safeParse(data);
    if (validationResult.success) {
      saveForm(data);
      setIsLoading(false);
      toast.success(
        `Autosaved successfully! Autosaved form state: ${JSON.stringify(
          data,
          null,
          2
        )}`,
        {
          autoClose: 2000,
        }
      );
    } else {
      handleError(validationResult.error.formErrors);
    }
  }, 5000);

  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, []);
  //@ts-ignore
  const handleRegistration = (data) => {
    const validationResult = formSchema.safeParse(data);
    if (validationResult.success) {
      console.log("Valid form data:", validationResult.data);
      setIsLoading(true);
      setTimeout(() => {
        saveForm(data);
        setIsLoading(false);
        toast.success(
          `Saved successfully! Form state: ${JSON.stringify(data, null, 2)}`,
          {
            autoClose: 3000,
          }
        );
      }, 1000);
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
    <form
      className="flex flex-col gap-4 p-4 bg-[#202A3C]"
      onSubmit={handleSubmit(handleRegistration)}
    >
      <div className="flex flex-col gap-4">
        <label className="text-white font-semibold" htmlFor="name">
          Name
        </label>
        <input
          className="mt-2 w-full rounded bg-white px-2 py-1 text-black"
          type="text"
          {...register("name")}
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
          type="email"
          {...register("email")}
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
          type="password"
          {...register("password")}
          onChange={handleChange}
        />
        <small className="text-red-700">
          {errors?.password && errors.password.message}
        </small>
      </div>
      <button
        type="submit"
        className={`mt-8 flex w-full items-center justify-center space-x-2 rounded-lg bg-primary px-4 py-2 text-lg font-bold text-white hover:bg-white hover:text-primary hover:text-[#202A3C] hover:duration-500 hover:ease-in-out ${
          isLoading ? "cursor-wait" : ""
        }`}
      >
        {isLoading ? (
          <>
            <span>Loading...</span>
            {}
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v4c6.627 0 12-5.373 12-12h-4zm-2-5.291A7.962 7.962 0 0120 12h4c0-3.042-1.135-5.824-3-7.938l-3 2.647z"
              />
            </svg>
          </>
        ) : (
          <p>Submit</p>
        )}
      </button>
    </form>
  );
};
