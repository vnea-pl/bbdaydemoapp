import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Share = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleShare = () => {
    console.log("Sharing with email:", email);
    // Handle share logic here
  };

  const handleBack = () => {
    navigate("/settings");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-lg font-extrabold tracking-wide text-foreground">Share</h1>
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
          Enter your family member's e-mail to share your printer and products!
        </p>

        <div className="space-y-4">
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 rounded-full border-2 border-border bg-transparent px-6 focus:border-foreground focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>

      <div className="mt-6">
        <Button
          onClick={handleShare}
          className="w-full h-14 bg-gradient-primary text-white font-bold text-lg rounded-full hover:opacity-90"
        >
          SHARE
        </Button>
      </div>
    </div>
  );
};