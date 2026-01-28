import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, ChevronDown } from "lucide-react";

export const Settings = () => {
  const [formData, setFormData] = useState({
    fullName: "John Wick",
    phone: "",
    password: "",
    repeatPassword: "",
    dateFormat: "Day, dd.mm.yyyy"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleConfirm = () => {
    console.log("Settings saved:", formData);
    navigate("/my-products");
  };

  const handleBack = () => {
    navigate("/my-products");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-lg font-extrabold tracking-wide text-foreground">Settings</h1>
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
          Update your profile
        </p>

        <div className="space-y-4">
          <Input
            placeholder="John Wick"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
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

          <Select value={formData.dateFormat} onValueChange={(value) => handleInputChange("dateFormat", value)}>
            <SelectTrigger className="h-10 rounded-full border-2 border-border bg-transparent px-6 focus:border-foreground focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder="Day, dd.mm.yyyy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Day, dd.mm.yyyy">Day, dd.mm.yyyy</SelectItem>
              <SelectItem value="mm/dd/yyyy">mm/dd/yyyy</SelectItem>
              <SelectItem value="yyyy-mm-dd">yyyy-mm-dd</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-6 mt-6">
        <Button
          onClick={handleConfirm}
          className="w-full h-14 bg-gradient-primary text-white font-bold text-lg rounded-full hover:opacity-90"
        >
          CONFIRM
        </Button>

        <div className="text-center space-y-2">
          <p className="text-foreground text-sm font-normal">
            <span className="font-bold">Product license:</span> QWJD-4G7J-87CB
          </p>
          
          <button 
            onClick={() => navigate("/share")}
            className="text-sm"
          >
            <span className="text-primary font-bold">Share</span>{" "}
            <span className="text-foreground font-normal">your printer and product</span>
            <br />
            <span className="text-foreground font-normal">with family members</span>
          </button>
        </div>
      </div>
    </div>
  );
};