"use client";
import { useState } from "react";

// Next components
import Image from "next/image";
import Link from "next/link";

// Next imports
import { useRouter } from "next/navigation";

// Components
import Input from "../ui/input";
import Button from "../ui/button";

// API Call
import { loginUser } from "@/utils/api";

// Toast
import { toast } from "react-toastify";
import { validateEmail } from "@/utils/validate-email";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) return toast.error("Email is required"); // checking email is empty or not
    if (!validateEmail(email)) return toast.error("Your email is invalid"); // checking email is correct or not
    if (!password) return toast.error("Password is required"); // checking password is empty or not
    if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))
      return toast.error(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
      ); // checking password is correct or not

    setIsLoading(true);

    try {
      const userData: LoginFormData = {
        email,
        password,
      };
      const response = await loginUser(userData);
     

      localStorage.setItem("token", response.token);

      router.push(response.user.role == "customer" ? "profile" : "/dashboard");
    } catch (error) {
         setIsLoading(false);
      toast.error((error as any).response.data.error); // Handle error response
    }

 
  };

  return (
    <div className="my-10">
      <div className="container">
        <div className="max-w-[450px] w-full mx-auto">
          {/* Logo */}
          <Image
            src="/logo.png"
            width={130}
            height={57}
            alt=""
            className="mx-auto mb-5"
          />

          <div className="bg-white p-5 rounded-md w-full">
            <h1 className="text-2xl font-medium">Login to your account</h1>
            <p className="text-left text-gray-500 mt-4 border-t pt-4">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary">
                Register
              </Link>
            </p>

            <form className="space-y-5 mt-7" onSubmit={handleSubmit}>
              <div>
                <Input
                  type="text"
                  placeholder="Enter your email"
                  label="Email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>

              <div>
                <Input
                  placeholder="Enter your password"
                  label="Password"
                  isPassword={true}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>

              <Button
                className="w-full"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Login
              </Button>
            </form>

            <p className="text-center text-gray-500 mt-4 border-t  pt-4">
              Forgot your password?
              <Link href="/user/reset-password" className="text-primary ml-1">
                Reset
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
