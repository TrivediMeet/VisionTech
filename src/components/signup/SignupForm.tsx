
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/auth";
import { PersonalInfoFields } from "./PersonalInfoFields";
import { PasswordFields } from "./PasswordFields";
import { RoleSelection } from "./RoleSelection";
import { TermsAgreement } from "./TermsAgreement";
import { AuthError } from "./AuthError";
import { signupFormSchema, SignupFormValues } from "@/schemas/signupSchema";

export const SignupForm = () => {
  const { signup, isLoading } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "consumer",
      termsAccepted: false
    },
    mode: "onChange" // This will validate fields as they change
  });

  const onSubmit = async (values: SignupFormValues) => {
    setAuthError(null);
    try {
      await signup(
        values.email, 
        values.password, 
        values.role, 
        values.name
      );
    } catch (error) {
      if (error instanceof Error) {
        setAuthError(error.message);
      } else {
        setAuthError("An unknown error occurred");
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <AuthError error={authError} />
        
        <PersonalInfoFields form={form} />
        <PasswordFields form={form} />
        <RoleSelection form={form} />
        <TermsAgreement form={form} />
        
        <Button 
          type="submit" 
          className="w-full rounded-full h-11" 
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : null}
          Create Account
        </Button>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-agri-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};
