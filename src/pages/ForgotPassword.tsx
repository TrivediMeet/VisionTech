
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassMorphismCard } from "@/components/ui/GlassMorphismCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/auth";
import { Loader2, Mail, ArrowLeft, CheckCircle } from "lucide-react";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Must be a valid email" }),
});

type FormValues = z.infer<typeof formSchema>;

const ForgotPassword = () => {
  const { forgotPassword, isLoading } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setError(null);
    try {
      await forgotPassword(values.email);
      setSubmitted(true);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16 px-6 bg-gradient-to-b from-green-50 to-white">
        <div className="w-full max-w-md">
          <GlassMorphismCard className="px-8 py-10">
            {!submitted ? (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-agri-primary mb-2">Reset Password</h1>
                  <p className="text-gray-600">Enter your email to receive a password reset link</p>
                </div>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {error && (
                      <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">
                        {error}
                      </div>
                    )}
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input 
                                placeholder="you@example.com" 
                                className="pl-10" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full rounded-full h-11" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : null}
                      Send Reset Link
                    </Button>
                    
                    <div className="text-center">
                      <Link 
                        to="/login" 
                        className="text-sm text-agri-primary hover:underline inline-flex items-center"
                      >
                        <ArrowLeft className="h-3 w-3 mr-1" />
                        Back to login
                      </Link>
                    </div>
                  </form>
                </Form>
              </>
            ) : (
              <div className="text-center space-y-6 py-6">
                <div className="flex justify-center">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-agri-primary">Check your email</h2>
                <p className="text-gray-600">
                  We've sent a password reset link to <span className="font-medium">{form.getValues().email}</span>
                </p>
                <Alert className="bg-blue-50 border-blue-100 text-blue-800">
                  <AlertDescription>
                    If you don't see the email, please check your spam folder
                  </AlertDescription>
                </Alert>
                <div className="pt-4">
                  <Link 
                    to="/login" 
                    className="text-agri-primary hover:underline inline-flex items-center"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to login
                  </Link>
                </div>
              </div>
            )}
          </GlassMorphismCard>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForgotPassword;
