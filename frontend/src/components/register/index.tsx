"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Input from "../ui/input";
import Button from "../ui/button";
import Select from "../ui/select";
import { registerUser } from "@/utils/api";
import { get } from "@/utils/apiClient";
import { toast } from "react-toastify";
import { validateEmail } from "@/utils/validate-email";
import { useQuery, useMutation } from "react-query";

interface RegisterFormData {
	name: string;
	password: string;
	email: string;
	role: string;
}

// Account type options
const options = [
	{ value: "customer", label: "Customer" },
	{ value: "seller", label: "Seller" },
];

const Register = () => {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [selectedOption, setSelectedOption] = useState<string>("customer");
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");



  // 
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!name) return toast.error("Name is required"); // checking name is empty or not
		if (!email) return toast.error("Email is required"); // checking email is empty or not
		if (!validateEmail(email)) return toast.error("Your email is invalid"); // checking email is correct or not
		if (!password) return toast.error("Password is required"); // checking password is empty or not
		if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))
			return toast.error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."); // checking password is correct or not

		setIsLoading(true);

		try {
			const userData: RegisterFormData = {
				name,
				email,
				password,
				role: selectedOption,
			};
			const response = await registerUser(userData);
			console.log(response);
			setIsLoading(false);

			setSelectedOption("customer");
			setName("");
			setEmail("");
			setPassword("");

			toast.success(
        "An instructions has been to your email address to proceed... "
      );
      // router.push(response.link)
      	setIsLoading(false);
		} catch (error) {
			toast.error((error as any).response.data.error); // Handle error response
		}
setIsLoading(false)
	
	};

	return (
    <div className="my-3 md:my-10">
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
            <h1 className="text-2xl font-medium">Create a account</h1>

            <form className="space-y-5 mt-7" onSubmit={handleSubmit}>
              <div>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  label="Name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </div>

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

              <div>
                <Select
                  label="Account Type"
                  options={options}
                  value={selectedOption}
                  onChange={(value) => {
                    setSelectedOption(value);
                  }}
                />
              </div>

              <Button
                className="w-full"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Create Account
              </Button>
            </form>
            <p className="text-center  text-gray-500 mt-4 border-t pt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
