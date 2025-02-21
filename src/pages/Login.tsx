/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLoginUserMutation } from "@/feature/auth/authSlice"
import { verifyToken } from "@/utils/verfyToken";
import { useState } from "react";

// Define form validation schema
const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

// Define type for form data
type LoginFormValues = z.infer<typeof loginFormSchema>

interface DecodedToken {
  email: string;
  role: 'user' | 'admin';
  id: string;
  iat: number;
  exp: number;
}

export default function Login() {
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation()
  const [error, setError] = useState<string | null>(null);

  // Handle form submission
  async function handleLogin(data: LoginFormValues) {
    try {
      setError(null); // Clear previous errors
      const response = await loginUser(data).unwrap();
      
      if (response.status) {
        toast.success('Login successful!');
        const token = response.data.token;
        const decodedToken = verifyToken(token) as DecodedToken;
        localStorage.setItem('token', token);
        localStorage.setItem('role', decodedToken.role);
        navigate('/', { replace: true });
      }
    } catch (err: any) {
      const errorMessage = err.data?.message || 'Invalid credentials';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  }

   // Initialize form with validation
   const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "isham@gmail.com",
      password: "12345678",
    },
  })

  return (
    <div className="flex h-screen items-center justify-center relative z-0">
      <Card className="w-[400px] bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Boitoi Login</CardTitle>
          {error && (
            <div className="mt-2 p-2 bg-red-50 border border-danger rounded-md">
              <p className="text-danger text-sm text-center">{error}</p>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage className="text-danger"/>
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
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage className="text-danger"/>
                  </FormItem>
                )}
              />
              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full text-white ${
                  isLoading ? 'bg-gray-7' : 'bg-primary hover:bg-secondary'
                } p-2 rounded-lg`}
              >
                {isLoading ? "Processing..." : "Login"}
              </button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
