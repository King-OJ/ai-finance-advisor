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
import { SignInFormType } from "@/utils/types/types";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInFormType) => {
    setIsSubmitting(true);
    const response = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (response?.error) {
      toast({
        variant: "destructive",
        title: response.error,
      });
      setIsSubmitting(false);
      return;
    }

    toast({
      title: "Login successful!",
      className: "text-green-500",
    });
    form.reset();
    setTimeout(() => {
      router.push("/dashboard");
      router.refresh();
    }, 200);
  };

  return (
    <Card className="w-80 sm:w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
        <CardDescription>Welcome Back</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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
            <div className="space-y-4">
              <Button
                disabled={isSubmitting}
                type="submit"
                className="w-full mt-4 text-base rounded-none h-10 md:h-12 font-semibold"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>

              <Button
                type="button"
                className="w-full h-10 md:h-12 rounded-none bg-white text-black font-semibold"
                disabled={isSubmitting}
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              >
                Login with Google
              </Button>
            </div>
          </form>
        </Form>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Button asChild variant={"ghost"} size={"sm"}>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </p>
      </CardContent>
    </Card>
  );
}

export default LoginForm;
