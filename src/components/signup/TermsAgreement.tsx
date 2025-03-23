
import { Link } from "react-router-dom";
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { SignupFormValues } from "@/schemas/signupSchema";
import { useAuth } from "@/contexts/auth";

interface TermsAgreementProps {
  form: UseFormReturn<SignupFormValues>;
}

export const TermsAgreement = ({ form }: TermsAgreementProps) => {
  const { isLoading } = useAuth();
  
  return (
    <FormField
      control={form.control}
      name="termsAccepted"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={isLoading}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel className="text-sm text-gray-600">
              I agree to the{" "}
              <Link to="/terms" className="text-agri-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-agri-primary hover:underline">
                Privacy Policy
              </Link>
            </FormLabel>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};
