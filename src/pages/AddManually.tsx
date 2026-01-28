import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConsumeWithinPicker } from "@/components/ConsumeWithinPicker";
import { Camera, X } from "lucide-react";

export const AddManually = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [selectedTime, setSelectedTime] = useState("14");
  const [selectedUnit, setSelectedUnit] = useState("days");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleBack = () => {
    navigate("/my-products");
  };

  const handleAddPhoto = () => {
    // For demo purposes, simulate adding a photo
    setSelectedImage("/placeholder.svg");
  };

  const handleRemovePhoto = () => {
    setSelectedImage(null);
  };

  const handleSaveAndPrint = () => {
    console.log(`Saving product: ${productName} - ${selectedTime} ${selectedUnit}`);
    // Handle save and print logic
    navigate("/my-products");
  };

  return (
    <div className="h-screen bg-background flex flex-col px-6 py-8 overflow-hidden">
      <div className="flex justify-between items-start mb-8">
        <h1 className="text-lg font-extrabold tracking-wide text-foreground">Add manually</h1>
        <Button
          variant="ghost"
          onClick={handleBack}
          className="text-primary font-normal text-sm p-0 h-auto"
        >
          Back
        </Button>
      </div>

      <div className="flex-1 flex flex-col space-y-6 overflow-hidden">
        {/* Photo section */}
        <div className="flex flex-col items-center space-y-4">
          {!selectedImage ? (
            <>
              <div className="w-32 h-32 flex items-center justify-center">
                <svg width="91" height="99" viewBox="0 0 182 198" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2.5" width="175.598" height="177.692" rx="23.0769" fill="#EBEBEB"/>
                  <rect x="13.7881" y="11.4233" width="153.021" height="154.846" rx="16" fill="white"/>
                  <ellipse cx="44.2807" cy="45.5962" rx="18.187" ry="18.4039" fill="#EBEBEB"/>
                  <path d="M46.281 106.616L85.9285 166.587H6.63349L46.281 106.616Z" fill="#EBEBEB"/>
                  <path d="M115.893 74.8848L172.377 167.221H59.409L115.893 74.8848Z" fill="#EBEBEB"/>
                </svg>
              </div>
              <button
                onClick={handleAddPhoto}
                className="flex items-center space-x-2 text-primary"
              >
                <Camera size={20} />
                <span className="text-sm font-semibold">Add photo (optional)</span>
              </button>
            </>
          ) : (
            <>
              <div className="w-32 h-32 rounded-2xl overflow-hidden">
                <img
                  src={selectedImage}
                  alt="Product"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={handleRemovePhoto}
                className="flex items-center space-x-2 text-primary"
              >
                <X size={20} />
                <span className="text-sm font-semibold">Remove photo</span>
              </button>
            </>
          )}
        </div>

        {/* Product name input */}
        <div className="space-y-4">
          <Input
            placeholder="Product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="h-10 rounded-full border-2 border-border bg-transparent px-6 focus:border-foreground focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        {/* Consume within picker */}
        <ConsumeWithinPicker
          selectedTime={selectedTime}
          selectedUnit={selectedUnit}
          onTimeChange={setSelectedTime}
          onUnitChange={setSelectedUnit}
        />
      </div>

      {/* Fixed Print/Save Button */}
      <div className="fixed bottom-6 left-6 right-6 z-50">
        <Button
          onClick={handleSaveAndPrint}
          className="w-full h-14 bg-gradient-primary text-white font-bold text-lg rounded-full hover:opacity-90"
        >
          Save & print
        </Button>
      </div>
    </div>
  );
};