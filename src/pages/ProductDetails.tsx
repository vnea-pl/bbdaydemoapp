import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ConsumeWithinPicker } from "@/components/ConsumeWithinPicker";

export const ProductDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const product = location.state?.product || {
    name: "Majonez Dekoracyjny Winiary",
    date: "Mon, 11.08.2025",
    image: "/placeholder.svg"
  };

  const handleBack = () => {
    navigate("/my-products");
  };

  const handleAddManually = () => {
    // Handle add manually
  };

  const handlePrint = () => {
    // Handle print
    console.log(`Printing label: ${selectedTime} ${selectedUnit}`);
  };

  const [selectedTime, setSelectedTime] = useState("14");
  const [selectedUnit, setSelectedUnit] = useState("days");

  return (
    <div className="h-screen bg-background flex flex-col px-6 py-8 overflow-hidden">
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center space-x-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
          <div className="space-y-1">
            <h1 className="text-foreground text-sm font-normal opacity-90">{product.name}</h1>
            <p className="text-foreground text-sm font-extrabold opacity-90">{product.date}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          onClick={handleBack}
          className="text-primary font-normal text-sm p-0 h-auto"
        >
          Back
        </Button>
      </div>

      <div className="flex-1 flex flex-col space-y-4 overflow-hidden">
        <div className="space-y-4">
          <p className="text-foreground text-sm font-normal opacity-90 text-center">
            Wrong product?{" "}
            <button
              onClick={handleAddManually}
              className="text-primary font-semibold"
            >
              Add manually
            </button>
          </p>

          <div 
            className="rounded-2xl"
            style={{ 
              border: '2.5px solid transparent',
              backgroundImage: 'linear-gradient(white, white), linear-gradient(30deg, #FF00BB, #FF9900)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'content-box, border-box'
            }}
          >
            <div className="bg-white p-4 rounded-[calc(1rem-2.5px)]">
              <p className="text-foreground text-sm font-normal opacity-90 text-center">
                Consume within date suggested by bbday.<br />
                Check the product label before printing.
              </p>
            </div>
          </div>
        </div>

        <ConsumeWithinPicker
          selectedTime={selectedTime}
          selectedUnit={selectedUnit}
          onTimeChange={setSelectedTime}
          onUnitChange={setSelectedUnit}
        />
      </div>

      
      {/* Fixed Print Button */}
      <div className="fixed bottom-6 left-6 right-6 z-50">
        <Button
          onClick={handlePrint}
          className="w-full h-14 bg-gradient-primary text-white font-bold text-lg rounded-full hover:opacity-90"
        >
          PRINT
        </Button>
      </div>
    </div>
  );
};