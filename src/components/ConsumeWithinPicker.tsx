import React, { useState } from "react";
import { WheelPicker, WheelPickerWrapper, type WheelPickerOption } from "@/components/ui/simple-wheel-picker";

interface ConsumeWithinPickerProps {
  selectedTime: string;
  selectedUnit: string;
  onTimeChange: (time: string) => void;
  onUnitChange: (unit: string) => void;
}

export const ConsumeWithinPicker: React.FC<ConsumeWithinPickerProps> = ({
  selectedTime,
  selectedUnit,
  onTimeChange,
  onUnitChange
}) => {
  const timeOptions: WheelPickerOption[] = Array.from({ length: 99 }, (_, i) => {
    const value = String(i + 1).padStart(2, '0');
    return { value, label: value };
  });

  const unitOptions: WheelPickerOption[] = [
    { value: "weeks", label: "weeks" },
    { value: "days", label: "days" },
    { value: "months", label: "months" }
  ];

  return (
    <div className="flex-1 flex flex-col space-y-2">
      <h2 className="text-lg font-extrabold tracking-wide text-center text-foreground mt-4">
        Consume within:
      </h2>

      <div className="relative">
        {/* Continuous selection bar across both pickers */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-12 bg-muted rounded-2xl z-0"></div>
        
        <WheelPickerWrapper className="gap-8 relative z-10">
          <WheelPicker
            options={timeOptions}
            value={selectedTime}
            onValueChange={onTimeChange}
            visibleCount={5}
            optionItemHeight={40}
            classNames={{
              highlightWrapper: "hidden",
              highlightItem: "text-foreground font-bold"
            }}
          />
          <WheelPicker
            options={unitOptions}
            value={selectedUnit}
            onValueChange={onUnitChange}
            visibleCount={5}
            optionItemHeight={40}
            classNames={{
              highlightWrapper: "hidden", 
              highlightItem: "text-foreground font-bold"
            }}
          />
        </WheelPickerWrapper>
      </div>
    </div>
  );
};