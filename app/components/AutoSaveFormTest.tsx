"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/Button";
import { Loader2, Send } from "lucide-react";
import { useDebounce } from "usehooks-ts";

const formSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  message: z.string().nonempty({ message: "Message is required" }),
});

export const AutoSaveFormTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isDirty, dirtyFields },
    watch,
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const debouncedValue = useDebounce(watch(), 3000);
  const JSONifiedDebouncedValue = JSON.stringify(debouncedValue);

  useEffect(() => {
    console.log("save is triggered, checking if isDirty is true");
    const debouncedSave = (values: z.infer<typeof formSchema>) => {
      if (isDirty) {
        console.log("isDirty is true, saving form data");
        setIsLoading(true);
        //simulate API call and wait 2 seconds
        setTimeout(() => {
          toast.info(
            `Autosaving form state: ${JSON.stringify(values, null, 2)}`,
            {
              autoClose: 2000,
            }
          );
          reset({ ...values });
          setIsLoading(false);
        }, 2000);
      }
    };
    debouncedSave(debouncedValue);
  }, [JSONifiedDebouncedValue]);

  return (
    <div className="p-4">
      <div className="flex flex-col gap-2 text-white font-semibold">
        <span>isDirty: {isDirty ? "yes" : "no"}</span>
        <span>Dirty Fields: {JSON.stringify(dirtyFields, null, 2)}</span>
        <span>Touched Fields: {JSON.stringify(touchedFields, null, 2)}</span>
        <span>Debounced Value: {JSON.stringify(debouncedValue, null, 2)}</span>
      </div>

      <form
        className="flex flex-col gap-4 py-4"
        // onSubmit={handleSubmit(handleRegistration)}
      >
        <div className="flex flex-col gap-4">
          <label className="text-white font-semibold" htmlFor="name">
            Name
          </label>
          <input
            className="mt-2 w-full rounded bg-white px-2 py-1 text-black"
            type="text"
            {...register("name")}
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
    </div>
  );
};
