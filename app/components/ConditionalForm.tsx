"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Send } from 'lucide-react';
import { z } from 'zod';

const formSchema = z.object({
  hasPet: z.boolean(),
  petType: z.string().nonempty({ message: 'Pet type is required' }),
  hasPetToy: z.boolean(),
  petToyName: z.string().nonempty({ message: 'Pet toy name is required' }),
  hasPetFood: z.boolean(),
  petFoodName: z.string().nonempty({ message: 'Pet food name is required' }),
});

const mockedAPICall = async (timeout: number = 2000) => {
  console.log('mocking an API request');
  await new Promise((resolve) => setTimeout(resolve, timeout));
};

export const ConditionalForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'all',
    defaultValues: {
      hasPet: false,
      petType: '',
      hasPetToy: false,
      petToyName: '',
      hasPetFood: false,
      petFoodName: '',
    },
  });

  const hasPet = watch('hasPet');
  const hasPetToy = watch('hasPetToy');
  const hasPetFood = watch('hasPetFood');

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log('submitting form data:', data);
    setIsLoading(true);
    await mockedAPICall(2000);
    reset();
    setIsLoading(false);
  };

  return (
    <div className="p-4">
      <form
        className="flex flex-col gap-4 py-8"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className={`flex flex-col gap-2 animate-in slide-in-from-left ${hasPet === true ? 'animate-out slide-out-from-left' : ''}`}>
          <label className="text-white font-semibold" htmlFor="hasPet">
            Do you have a pet?
          </label>
          <select
            className="mt-2 w-full rounded bg-white px-2 py-1 text-black"
            {...register('hasPet')}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        {hasPet === true && (
          <div className={`flex flex-col gap-2 animate-in slide-in-from-left ${hasPetToy === true ? 'animate-out slide-out-from-left' : ''}`}>
            <label className="text-white font-semibold" htmlFor="petType">
              What type of pet do you have?
            </label>
            <input
              className="mt-2 w-full rounded bg-white px-2 py-1 text-black"
              type="text"
              {...register('petType', {
                required: 'Pet type is required',
              })}
            />
            {errors.petType && (
              <span className="text-red-600 text-sm">{errors.petType.message}</span>
            )}
          </div>
        )}

        {hasPet === true && (
          <div className={`flex flex-col gap-2 animate-in slide-in-from-left ${hasPetToy === true ? 'animate-out slide-out-from-left' : ''}`}>
            <label className="text-white font-semibold" htmlFor="hasPetToy">
              Do you have a pet toy?
            </label>
            <select
              className="mt-2 w-full rounded bg-white px-2 py-1 text-black"
              {...register('hasPetToy')}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        )}

        {hasPetToy === true && (
          <div className={`flex flex-col gap-2 animate-in slide-in-from-left ${hasPetFood === true ? 'animate-out slide-out-from-left' : ''}`}>
            <label className="text-white font-semibold" htmlFor="petToyName">
              What is the name of your pet&apos;s toy?
            </label>
            <input
              className="mt-2 w-full rounded bg-white px-2 py-1 text-black"
              type="text"
              {...register('petToyName', {
                required: 'Pet toy name is required',
              })}
            />
            {errors.petToyName && (
              <span className="text-red-600 text-sm">{errors.petToyName.message}</span>
            )}
          </div>
        )}

        {hasPetToy === true && (
          <div className={`flex flex-col gap-2 animate-in slide-in-from-left ${hasPetFood === true ? 'animate-out slide-out-from-left' : ''}`}>
            <label className="text-white font-semibold" htmlFor="hasPetFood">
              Do you have pet food?
            </label>
            <select
              className="mt-2 w-full rounded bg-white px-2 py-1 text-black"
              {...register('hasPetFood')}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        )}

        {hasPetFood === true && (
          <div className={`flex flex-col gap-2 animate-in slide-in-from-left`}>
            <label className="text-white font-semibold" htmlFor="petFoodName">
              What is the name of your pet&apos;s food?
            </label>
            <input
              className="mt-2 w-full rounded bg-white px-2 py-1 text-black"
              type="text"
              {...register('petFoodName', {
                required: 'Pet food name is required',
              })}
            />
            {errors.petFoodName && (
              <span className="text-red-600 text-sm">{errors.petFoodName.message}</span>
            )}
          </div>
        )}

        <Button
          variant="default"
          type="submit"
          className="my-8 text-base hover:scale-105 transition-transform duration-200 active:scale-95 focus-visible:scale-95"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" />{' '}
              <span className="px-2">Submitting...</span>
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
