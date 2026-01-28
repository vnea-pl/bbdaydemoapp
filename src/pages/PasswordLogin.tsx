import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SocialIcons } from "@/components/SocialIcons";

export const PasswordLogin = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "youremail@email.com";

  const handleSignIn = () => {
    if (password) {
      navigate("/my-products");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex flex-col items-center justify-center px-6 text-white pt-20 pb-32">
      <div className="flex flex-col items-center w-full max-w-sm space-y-6 -mt-16">
        <Logo />
        
        <div className="text-center space-y-2">
          <h1 className="text-lg font-extrabold tracking-wide">WELCOME</h1>
          <div className="space-y-1">
            <p className="text-sm opacity-90">Enter your password for:</p>
            <p className="text-sm opacity-90">{email}</p>
          </div>
        </div>

        <div className="w-full space-y-4">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-10 bg-transparent border-2 border-white rounded-full px-4 text-white placeholder:text-white/70 text-base focus:border-white focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          
          <Button
            onClick={handleSignIn}
            className="w-full h-10 bg-white text-primary font-extrabold text-lg rounded-full hover:bg-white/90"
          >
            SIGN IN
          </Button>
        </div>

        <SocialIcons />
      </div>
    </div>
  );
};