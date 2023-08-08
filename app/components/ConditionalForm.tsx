"use client";

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Send } from 'lucide-react';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  email: z.string().email({ message: 'Email is required' }),
  message: z.string().nonempty({ message: 'Message is required' }),
  hasFavoriteColor: z.boolean(),
  favoriteColor: z.string().nonempty({ message: 'Favorite color is required' }),
});

const mockedAPICall = async (timeout: number = 2000) => {
  console.log('mocking an API request');
  await new Promise((resolve) => setTimeout(resolve, timeout));
};

export const ConditionalForm = () => {
  const { toast } = useToast();
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
      name: '',
      email: '',
      message: '',
      hasFavoriteColor: false, 
      favoriteColor: '', 
    },
  });

  const [isFavoriteColorVisible, setIsFavoriteColorVisible] = useState(false);

  useEffect(() => {
    if (watch('hasFavoriteColor')) {
      setIsFavoriteColorVisible(true);
    } else {
      setIsFavoriteColorVisible(false);
    }
  }, [watch('hasFavoriteColor')]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log('submitting form data:', data);
    setIsLoading(true);
    await mockedAPICall(2000);
    toast({
      variant: 'success',
      title: 'Form Submitted Successfully!',
    });
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
        <div className="flex flex-col gap-2">
          <label className="text-white font-semibold" htmlFor="name">
            Name
          </label>
          <input
            className="mt-2 w-full rounded bg-white px-2 py-1 text-black"
            type="text"
            {...register('name')}
          />
          {errors.name && (
            <span className="text-red-600 text-sm">{errors.name.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white font-semibold" htmlFor="email">
            Email
          </label>
          <input
            className="mt-2 w-full rounded bg-white px-2 py-1 text-black"
            type="email"
            {...register('email')}
          />
          {errors.email && (
            <span className="text-red-600 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white font-semibold" htmlFor="message">
            Message
          </label>
          <textarea
            className="mt-2 w-full rounded bg-white px-2 py-1 text-black"
            {...register('message')}
          />
          {errors.message && (
            <span className="text-red-600 text-sm">
              {errors.message.message}
            </span>
          )}
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-white font-semibold" htmlFor="hasFavoriteColor">
            Do you have a favorite color?
          </label>
          <select
            className="mt-2 w-full rounded bg-white px-2 py-1 text-black"
            {...register('hasFavoriteColor')}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {isFavoriteColorVisible && (
            <div className="flex flex-col gap-2">
              <label className="text-white font-semibold" htmlFor="favoriteColor">
                Favorite Color
              </label>
              <input
                className="mt-2 w-full rounded bg-white px-2 py-1 text-black"
                type="text"
                {...register('favoriteColor', {
                  required: 'Favorite color is required',
                })}
              />
              {errors.favoriteColor && (
                <span className="text-red-600 text-sm">
                  {errors.favoriteColor.message}
                </span>
              )}
            </div>
          )}
        </div>
        
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
