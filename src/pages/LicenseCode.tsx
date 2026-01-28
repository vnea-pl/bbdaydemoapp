import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const LicenseCode = () => {
  const [licenseCode, setLicenseCode] = useState("");
  const navigate = useNavigate();

  const handleSignIn = () => {
    if (licenseCode) {
      navigate("/create-account");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex flex-col items-center justify-center px-6 text-white">
      <div className="flex flex-col items-center w-full max-w-sm space-y-6">
        <Logo />
        
        <div className="text-center space-y-2">
          <h1 className="text-lg font-extrabold tracking-wide">WELCOME</h1>
          <div className="space-y-1">
            <p className="text-sm opacity-90">Enter the license code you received</p>
            <p className="text-sm opacity-90">when you purchased your printer:</p>
          </div>
        </div>

        <div className="w-full space-y-4">
          <Input
            type="text"
            placeholder="Licence code"
            value={licenseCode}
            onChange={(e) => setLicenseCode(e.target.value)}
            className="h-10 bg-transparent border-2 border-white rounded-full px-4 text-white placeholder:text-white/70 text-base focus:border-white focus:ring-0 focus:ring-offset-0"
          />
          
          <Button
            onClick={handleSignIn}
            className="w-full h-10 bg-white text-primary font-extrabold text-lg rounded-full hover:bg-white/90"
          >
            SIGN IN
          </Button>
        </div>
      </div>
    </div>
  );
};