
import { Tractor, UserPlus } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { SignupFormValues } from "@/schemas/signupSchema";

interface RoleSelectionProps {
  form: UseFormReturn<SignupFormValues>;
}

export const RoleSelection = ({ form }: RoleSelectionProps) => {
  return (
    <FormField
      control={form.control}
      name="role"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>I am joining as a</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <RadioGroupItem value="farmer" id="farmer" />
                <label htmlFor="farmer" className="cursor-pointer flex items-center">
                  <Tractor className="h-5 w-5 mr-2 text-agri-primary" />
                  <div>
                    <span className="font-medium">Farmer</span>
                    <p className="text-xs text-gray-500">I sell sustainable produce</p>
                  </div>
                </label>
              </div>
              
              <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <RadioGroupItem value="consumer" id="consumer" />
                <label htmlFor="consumer" className="cursor-pointer flex items-center">
                  <UserPlus className="h-5 w-5 mr-2 text-agri-secondary" />
                  <div>
                    <span className="font-medium">Consumer</span>
                    <p className="text-xs text-gray-500">I want to buy fresh produce</p>
                  </div>
                </label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
