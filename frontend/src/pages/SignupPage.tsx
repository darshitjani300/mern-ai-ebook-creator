import { BookOpen, Mail, Lock, PersonStandingIcon } from "lucide-react";
import InputField from "../components/ui/InputField";
import React, { useState } from "react";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import { API_PATH } from "../utils/apiPath";
import { useAuth } from "../context/AuthContext";

interface IformData {
  name: string;
  email: string;
  password: string;
}

const SignupPage = () => {
  const [formData, setFormData] = useState<IformData>({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login }: any = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(
        API_PATH.AUTH.REGISTER,
        formData
      );

      const { token } = response.data;

      // FEtch profile to get user Details
      const profileResponse = await axiosInstance.get(
        API_PATH.AUTH.GET_PROFILE,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      login(profileResponse?.data?.data, token);

      toast.success("Account created successfully");

      navigate("/dashboard");
    } catch (error: any) {
      localStorage.clear();
      toast.error(
        error.response.data.message || "Signup failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 ">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 bg-linear-to-r from-violet-500 to-purple-500 rounded-full items-center justify-center shadow-lg mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-slate-900 font-bold text-3xl">
            Create an Account
          </h1>
          <p className="text-slate-600 mt-2">
            Start your journey of creating amazing eBooks today.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              Icon={PersonStandingIcon}
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required={true}
              type="text"
            />
            <InputField
              Icon={Mail}
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="johndoe@gmail.com"
              required={true}
              type="text"
            />
            <InputField
              Icon={Lock}
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required={true}
              type="password"
            />
            <Button type="submit" className="w-full" isLoading={isLoading}>
              Create Account
            </Button>
          </form>
          <p className="text-center text-sm text-slate-600 mt-8">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="font-medium text-violet-600 hover:text-violet-700"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
