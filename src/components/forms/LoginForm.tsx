"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { loginUser } from "@/services/auth";
import { useUser } from "@/context/UserContext";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, User, Shield } from "lucide-react";
import { useState } from "react";

export type TLoginFormValues = {
  email: string;
  password: string;
};

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginForm() {
  const { setIsLoading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const [isDemoLoading, setIsDemoLoading] = useState<'user' | 'admin' | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await loginUser(values);
      setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message);
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      toast.error(error);
    }
  }

  const handleDemoLogin = async (type: 'user' | 'admin') => {
    setIsDemoLoading(type);
    
    const credentials = {
      user: {
        email: "ayanakd112@gmail.com",
        password: "user123"
      },
      admin: {
        email: "admin@mail.com",
        password: "admin123"
      }
    };

    try {
      const res = await loginUser(credentials[type]);
      setIsLoading(true);
      if (res?.success) {
        toast.success(`Logged in as demo ${type}!`);
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      toast.error(error);
    } finally {
      setIsDemoLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-3xl mx-auto"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email..."
                    type="email"
                    {...field}
                  />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Enter your password..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full cursor-pointer"
            effect={"shine"}
            type="submit"
            disabled={isSubmitting || isDemoLoading !== null}
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>

      {/* Demo Login Section */}
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or try demo accounts
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
          {/* Demo User Button */}
          <Button
            variant="outline"
            onClick={() => handleDemoLogin('user')}
            disabled={isSubmitting || isDemoLoading !== null}
            className="w-full h-auto p-4 flex flex-col items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-950 border-blue-200 dark:border-blue-800"
          >
            {isDemoLoading === 'user' ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            )}
            <div className="text-center">
              <div className="font-medium text-sm">Demo User</div>
              <div className="text-xs text-muted-foreground">
                Regular customer access
              </div>
            </div>
          </Button>

          {/* Demo Admin Button */}
          <Button
            variant="outline"
            onClick={() => handleDemoLogin('admin')}
            disabled={isSubmitting || isDemoLoading !== null}
            className="w-full h-auto p-4 flex flex-col items-center gap-2 hover:bg-purple-50 dark:hover:bg-purple-950 border-purple-200 dark:border-purple-800"
          >
            {isDemoLoading === 'admin' ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            )}
            <div className="text-center">
              <div className="font-medium text-sm">Demo Admin</div>
              <div className="text-xs text-muted-foreground">
                Full admin dashboard
              </div>
            </div>
          </Button>
        </div>

        {/* Demo Credentials Info */}
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            Demo accounts are pre-configured for testing purposes. 
            Click the buttons above for instant access.
          </p>
        </div>
      </div>
    </div>
  );
}
