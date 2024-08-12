"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { RegisterSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { startTransition, useState } from "react";
import { register } from "@/actions/register";
import FormTitle from "./form-title";
import FormFooter from "./form-footer";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    startTransition(() => {
      register(values)
        .then((res) => {
          setError(res?.error)
          setSuccess(res?.success)
        })
    })
  };

  // TODO 2: error message

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormTitle title="Create an account"/>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input {...field} id="email" placeholder="12345678@student.westernsydney.edu.au" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    id="password"
                    placeholder="********"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error}/>
        <FormSuccess message={success}/>
        <Button
          type="submit"
          className="w-full"
        >
          Register
        </Button>
        <FormFooter text="Already have an account?" backBtnHref="/auth/login" backBtnLabel="Sign in"/>
      </form>
    </Form>
  );
};
