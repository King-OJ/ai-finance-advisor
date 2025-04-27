"use client";
import { useToast } from "@/hooks/use-toast";
import { SignUpFormType } from "@/utils/types/auth";
import { useMutation } from "@tanstack/react-query";

export const useSignUp = () => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: (newUserInfo: SignUpFormType) =>
      fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(newUserInfo),
      }).then((res) => res.json()),
    onSuccess: (data) => {
      toast({
        title: data.message,
        description: "Login below to continue",
        className: "text-green",
      });
    },
    onError: (error) => {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
