"use client";
import { useEffect, useState } from "react";

// Components
import Input from "../ui/input";
import Button from "../ui/button";
import Loader from "../loader";

// Toast
import { toast } from "react-toastify";

// API
import { changePassword, updateProfile, validateLogin } from "@/utils/api";

// Utils
import { validateEmail } from "@/utils/validate-email";

interface BasicInformationFormData {
  name: string;
  email: string;
}

interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
}

const Profile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isChangePasswordLoading, setIsChangePasswordLoading] =
    useState<boolean>(false);

  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Getting user information
  useEffect(() => {
    async function getUserData() {
      try {
        const response = await validateLogin();

        setId(response._id);
        setName(response.name);
        setEmail(response.email);
      } catch (error) {
        console.error(error);
      }
    }
    if (!id) getUserData();
  });

  // Update profile
  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) return toast.error("Name is required"); // checking name is empty or not
    if (!email) return toast.error("Email is required"); // checking email is empty or not
    if (!validateEmail(email)) return toast.error("Your email is invalid"); // checking email is correct or not

    setIsLoading(true);

    try {
      const userData: BasicInformationFormData = {
        name,
        email,
      };
      const response = await updateProfile(userData, id);
      setIsLoading(false);

      toast.success("Your information has been successfully updated");
    } catch (error) {
      toast.error((error as any).response.data.error); // Handle error response
    }

    setIsLoading(false);
  };

  // Change password
  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword)
      return toast.error("Passwords are required"); // checking password is empty or not
    if (
      !currentPassword.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
      ) ||
      !newPassword.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
      ) ||
      !confirmPassword.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
      )
    )
      return toast.error(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
      ); // checking password is correct or not

    if (newPassword !== confirmPassword)
      return toast.error("Passwords must be same"); // checking password and confirm password

    setIsChangePasswordLoading(true);

    try {
      const passwordData: ChangePasswordFormData = {
        currentPassword,
        newPassword,
      };
      const response = await changePassword(passwordData, id);
      setIsChangePasswordLoading(false);

      toast.success("Your password has been successfully changed");
    } catch (error) {
      toast.error((error as any).response.data.error); // Handle error response
    }

    setIsChangePasswordLoading(false);
  };

  return id ? (
    <div className="space-y-5">
      {/* Left */}
      <div className="bg-white p-5 rounded-md w-full">
        <h1 className="text-2xl font-medium">Basic Information</h1>

        <form className="space-y-5 mt-7" onSubmit={handleUpdateProfile}>
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

          <Button isLoading={isLoading} disabled={isLoading}>
            Save Changes
          </Button>
        </form>
      </div>

      {/* Right */}
      <div className="bg-white p-5 rounded-md w-full">
        <h1 className="text-2xl font-medium">Change Password</h1>

        <form className="space-y-5 mt-7" onSubmit={handleChangePassword}>
          <div>
            <Input
              placeholder="Enter current password"
              label="Current Password"
              isPassword={true}
              value={currentPassword}
              onChange={(event) => {
                setCurrentPassword(event.target.value);
              }}
            />
          </div>

          <div>
            <Input
              placeholder="Enter new password"
              label="New Password"
              isPassword={true}
              value={newPassword}
              onChange={(event) => {
                setNewPassword(event.target.value);
              }}
            />
          </div>

          <div>
            <Input
              placeholder="Enter confirm password"
              label="Confirm Password"
              isPassword={true}
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />
          </div>

          <Button
            isLoading={isChangePasswordLoading}
            disabled={isChangePasswordLoading}
          >
            Change Password
          </Button>
        </form>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Profile;
