"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "lodash";
import { z } from "zod";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/Button";
import { Loader2, Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  message: z.string().nonempty({ message: "Message is required" }),
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
        <label className="text-white font-semibold" htmlFor="message">
          Message
        </label>
        <textarea
          className="mt-2 w-full rounded bg-white px-2 py-1 text-black"
          {...register("message")}
          onChange={handleChange}
        />
        <small className="text-red-700">
          {errors?.message && errors.message.message}
        </small>
      </div>
      <Button type="submit" className="text-base" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" />{" "}
            <span className="px-2">Saving...</span>
          </>
        ) : (
          <>
            <Send />
            <span className="font-bold px-2">Submit</span>
          </>
        )}
      </Button>
    </form>
  );
};
