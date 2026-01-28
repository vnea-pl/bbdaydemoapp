import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export const CreateAccount = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    repeatPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUp = () => {
    navigate("/my-products");
  };

  const handleBack = () => {
    navigate("/license-code");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-lg font-extrabold tracking-wide text-foreground">Create your account</h1>
        <Button
          variant="ghost"
          onClick={handleBack}
          className="text-primary font-normal text-sm p-0 h-auto"
        >
          Back
        </Button>
      </div>

      <div className="space-y-6 mb-8">
        <p className="text-foreground text-sm font-normal opacity-90">
          Complete your profile to get started<br />
          and unlock all the amazing features
        </p>

        <div className="space-y-4">
          <Input
            placeholder="Full name"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            className="h-10 rounded-full border-2 border-border bg-transparent px-6 focus:border-foreground focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />

          <Input
            type="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="h-10 rounded-full border-2 border-border bg-transparent px-6 focus:border-foreground focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />

          <Input
            type="tel"
            placeholder="Phone number (optional)"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="h-10 rounded-full border-2 border-border bg-transparent px-6 focus:border-foreground focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="h-10 rounded-full border-2 border-border bg-transparent px-6 pr-14 focus:border-foreground focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </Button>
          </div>

          <div className="relative">
            <Input
              type={showRepeatPassword ? "text" : "password"}
              placeholder="Repeat password"
              value={formData.repeatPassword}
              onChange={(e) => handleInputChange("repeatPassword", e.target.value)}
              className="h-10 rounded-full border-2 border-border bg-transparent px-6 pr-14 focus:border-foreground focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground"
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
            >
              {showRepeatPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </Button>
          </div>
      </div>

      <div className="space-y-6 mt-6">
        <Button
          onClick={handleSignUp}
          className="w-full h-10 bg-gradient-primary text-white font-extrabold text-lg rounded-full hover:opacity-90"
        >
          SIGN UP
        </Button>

        <p className="text-center text-sm text-foreground font-normal opacity-90">
          By clicking the button, you agree to our<br />
          <span className="underline">Terms of Service</span> and{" "}
          <span className="underline">Privacy Policy</span>
        </p>
      </div>
    </div>
    </div>
  );
};