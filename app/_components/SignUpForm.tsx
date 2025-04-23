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
import { CustomFormInputField } from "./FormComponents";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { signUpSchema, SignUpSchemaType } from "@/utils/formSchemas/auth";

function SignUpForm({ toggleLogin }: { toggleLogin: () => void }) {
  const form = useForm<SignUpSchemaType>({
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

  const onSubmit = async (values: SignUpSchemaType) => {
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
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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
          <Button
            onClick={toggleLogin}
            className="rounded-none"
            variant={"outline"}
            size={"sm"}
          >
            Login
          </Button>
        </p>
      </CardContent>
    </Card>
  );
}

export default SignUpForm;
