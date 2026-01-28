import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SocialIcons } from "@/components/SocialIcons";

export const EmailLogin = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (email) {
      navigate("/password-login", { state: { email } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex flex-col items-center justify-center px-6 text-white pt-20 pb-32">
      <div className="flex flex-col items-center w-full max-w-sm space-y-6 -mt-16">
        <Logo />
        
        <div className="text-center space-y-2">
          <h1 className="text-lg font-extrabold tracking-wide">WELCOME</h1>
          <p className="text-sm font-normal opacity-90">Enter your e-mail to get started</p>
        </div>

        <div className="w-full space-y-4">
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 bg-transparent border-2 border-white rounded-full px-4 text-white placeholder:text-white/70 text-base focus:border-white focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          
          <Button
            onClick={handleContinue}
            className="w-full h-10 bg-white text-primary font-extrabold text-lg rounded-full hover:bg-white/90"
          >
            CONTINUE
          </Button>
        </div>

        <SocialIcons />
      </div>
    </div>
  );
};