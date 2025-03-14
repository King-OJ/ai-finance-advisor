"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { CustomFormInputField } from "./FormComponents";
import { SignUpFormType } from "@/utils/types/types";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (values: SignUpFormType) => {
    setIsSubmitting(true);
    await axios
      .post("/api/auth/signup", values)
      .then((result) => {
        if (result.data.id) {
          toast({
            title: "Account created Successfully!",
            description: "Login to get started",
            className: "text-green-500",
          });
          setTimeout(() => {
            router.push("/login");
          }, 200);
        }
      })
      .catch((error) => {
        console.log(error);
        toast({
          variant: "destructive",
          description: "Try again!",
          title: error.response.data.message,
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  return (
    <Card className="w-full sm:w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
        <CardDescription>Start your financial journey today</CardDescription>
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
                className="w-full mt-4 text-base rounded-none h-10 md:h-12 font-semibold"
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </Button>
            </div>
          </form>
        </Form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Button asChild variant={"ghost"} size={"sm"}>
            <Link href="/login">Login</Link>
          </Button>
        </p>
      </CardContent>
    </Card>
  );
}

export default SignUpForm;
