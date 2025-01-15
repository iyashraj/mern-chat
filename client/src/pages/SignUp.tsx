import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { data, Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import { signUpFormValidator } from "../lib/formValidator";

interface SignUpState {
  fullName: string;
  email: string;
  password: string;
}

const SignUp : React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [signUpData, setSignUpData] = useState<SignUpState>({
    fullName: "",
    email: "",
    password: "",
  });

  const { isSigningUp, signup } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault()
    const isFormValid = signUpFormValidator(data)
    if(isFormValid == true){
      signup(signUpData)
    }
  };

  console.log(signUpData, "data --> ");
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p>Get started with free account</p>
            </div>
          </div>
          <form action="" onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="John Doe"
                  value={signUpData.fullName}
                  onChange={(e) =>
                    setSignUpData((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10"
                  placeholder="johndoe@gmail.com"
                  value={signUpData.email}
                  onChange={(e) =>
                    setSignUpData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="********"
                  value={signUpData.password}
                  onChange={(e) =>
                    setSignUpData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp} onClick={(e)=> handleSubmit(e)}>
              {
                isSigningUp ? (
                  <>
                  <Loader2 className="size-5 animate-spin" /></>
                ) : ("Create Account")
              }
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to={"/login"} className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* <div>right</div> */}
      <AuthImagePattern title="Join our community" subTitle="Connect with friends, share moments, and stay in touch with your loved ones."/>
    </div>
  );
};

export default SignUp;
