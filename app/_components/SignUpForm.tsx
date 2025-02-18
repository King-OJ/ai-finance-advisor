"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { CustomFormInputField } from "./FormComponents";
import { SignUpFormType } from "@/utils/types";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const signUpSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

function SignUpForm() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>();

  const { toast } = useToast();

  const onSubmit = async (values: SignUpFormType) => {
    setIsSubmitting(true);
    await axios
      .post("/api/auth/signup", values)
      .then((result) => {
        toast({ title: result.data.message });
      })
      .catch((error) => {
        toast({ variant: "destructive", title: error.response.data.message });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  return (
    <Card className="w-80 sm:w-96 max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <CustomFormInputField
              name={"name"}
              control={form.control}
              placeholder="Enter your fullname"
            />
            <CustomFormInputField
              name={"email"}
              control={form.control}
              placeholder="Enter your email"
            />
            <CustomFormInputField
              name={"password"}
              control={form.control}
              placeholder="Enter your password"
            />
            <div>
              <Button
                disabled={isSubmitting}
                type="submit"
                className="w-full mt-4 text-base"
              >
                {isSubmitting ? "Submitting" : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default SignUpForm;
