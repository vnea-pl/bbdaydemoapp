import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Flashlight } from "lucide-react";

export const ScanProduct = () => {
  const [flashlightOn, setFlashlightOn] = useState(false);
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/my-products");
  };

  const toggleFlashlight = () => {
    setFlashlightOn(!flashlightOn);
  };

  const handleScanComplete = () => {
    // Simulate successful scan
    navigate("/product-details", {
      state: {
        product: {
          id: "scanned",
          name: "Majonez Dekoracyjny Winiary",
          date: "Mon, 11.08.2025",
          image: "/placeholder.svg"
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* Camera view - simulated with black background */}
      <div className="absolute inset-0 bg-black">
        {/* Scanning overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-80 h-60 border-2 border-primary bg-primary/10 rounded-lg relative">
            {/* Scanning line */}
            <div className="absolute inset-x-0 top-1/2 h-0.5 bg-primary animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Top controls */}
      <div className="absolute top-0 left-0 right-0 p-6 z-10">
        <div className="flex justify-end">
          <Button
            variant="ghost"
            onClick={handleCancel}
            className="text-white font-normal text-sm p-0 h-auto"
          >
            Cancel
          </Button>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFlashlight}
            className={`w-16 h-16 rounded-full ${
              flashlightOn 
                ? "bg-yellow-400 text-black" 
                : "bg-white/20 text-white"
            }`}
          >
            <Flashlight 
              size={24} 
              fill={flashlightOn ? "currentColor" : "none"}
            />
          </Button>
        </div>
      </div>

      {/* Simulate scanning by clicking anywhere */}
      <div 
        className="absolute inset-0 z-5"
        onClick={handleScanComplete}
      />
    </div>
  );
};