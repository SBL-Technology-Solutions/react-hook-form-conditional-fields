"use client";

import { useDebounce } from "usehooks-ts";
import { useEffect } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

export const useAutoSave = <T extends FieldValues>(
  useFormReturn: UseFormReturn<T>,
  debounceTime: number,
  callback: () => void | Promise<void>
) => {
  const {
    watch,
    reset,
    formState: { isDirty },
  } = useFormReturn;

  const debouncedValue = useDebounce(watch(), debounceTime);
  const DebouncedValueStringified = JSON.stringify(debouncedValue);

  useEffect(() => {
    console.log("save is triggered, checking if isDirty is true");
    const debouncedSave = async () => {
      if (!isDirty) {
        console.log("autosave not triggered because form is not dirty");
        return;
      }
      console.log("isDirty is true, saving form data");
      await callback();
      reset({ ...debouncedValue });
    };

    debouncedSave();
    // We are explicitly using only the debouncedValue as a dependency because we only want this useEffect to run when the debouncedValue changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DebouncedValueStringified]);

  return debouncedValue;
};
