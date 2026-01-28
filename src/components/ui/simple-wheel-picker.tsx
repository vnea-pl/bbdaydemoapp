"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface WheelPickerOption {
  value: string
  label: React.ReactNode
}

export interface WheelPickerClassNames {
  optionItem?: string
  highlightWrapper?: string
  highlightItem?: string
}

export interface WheelPickerProps {
  options: WheelPickerOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  visibleCount?: number
  optionItemHeight?: number
  classNames?: WheelPickerClassNames
  className?: string
}

export interface WheelPickerWrapperProps {
  className?: string
  children: React.ReactNode
}

const WheelPickerWrapper = React.forwardRef<
  HTMLDivElement,
  WheelPickerWrapperProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-center gap-4", className)}
    {...props}
  >
    {children}
  </div>
))
WheelPickerWrapper.displayName = "WheelPickerWrapper"

const WheelPicker = React.forwardRef<HTMLDivElement, WheelPickerProps>(
  (
    {
      options,
      value,
      defaultValue,
      onValueChange,
      visibleCount = 5,
      optionItemHeight = 40,
      classNames,
      className,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(
      value ?? defaultValue ?? options[0]?.value ?? ""
    )
    
    const currentValue = value ?? internalValue
    const currentIndex = options.findIndex(option => option.value === currentValue)
    
    const handleValueChange = React.useCallback((newValue: string) => {
      setInternalValue(newValue)
      onValueChange?.(newValue)
    }, [onValueChange])

    const handleItemClick = (option: WheelPickerOption) => {
      handleValueChange(option.value)
    }

    // Touch/scroll handling
    const [isDragging, setIsDragging] = React.useState(false)
    const [startY, setStartY] = React.useState(0)
    const [startTime, setStartTime] = React.useState(0)
    const containerRef = React.useRef<HTMLDivElement>(null)

    const changeValueBySteps = React.useCallback((steps: number) => {
      const newIndex = Math.max(0, Math.min(options.length - 1, currentIndex + steps))
      if (newIndex !== currentIndex && options[newIndex]) {
        handleValueChange(options[newIndex].value)
      }
    }, [currentIndex, options, handleValueChange])

    const handleStart = React.useCallback((clientY: number) => {
      setIsDragging(true)
      setStartY(clientY)
      setStartTime(Date.now())
    }, [])

    const handleEnd = React.useCallback((clientY: number) => {
      if (!isDragging) return
      
      setIsDragging(false)
      const deltaY = startY - clientY
      const deltaTime = Date.now() - startTime
      const velocity = Math.abs(deltaY) / deltaTime
      
      // Calculate steps based on distance and velocity
      let steps = 0
      if (Math.abs(deltaY) > 5) { // Minimum threshold
        if (velocity > 1) {
          // Fast gesture - change by more steps
          steps = Math.round(deltaY / (optionItemHeight / 3))
        } else {
          // Slow gesture - change by fewer steps
          steps = Math.round(deltaY / optionItemHeight)
        }
      }
      
      changeValueBySteps(steps)
    }, [isDragging, startY, startTime, optionItemHeight, changeValueBySteps])

    // Mouse events
    const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
      e.preventDefault()
      handleStart(e.clientY)
    }, [handleStart])

    const handleMouseUp = React.useCallback((e: React.MouseEvent) => {
      handleEnd(e.clientY)
    }, [handleEnd])

    // Touch events
    const handleTouchStart = React.useCallback((e: React.TouchEvent) => {
      handleStart(e.touches[0].clientY)
    }, [handleStart])

    const handleTouchEnd = React.useCallback((e: React.TouchEvent) => {
      if (e.changedTouches.length > 0) {
        handleEnd(e.changedTouches[0].clientY)
      }
    }, [handleEnd])

    // Wheel event
    const handleWheel = React.useCallback((e: React.WheelEvent) => {
      e.preventDefault()
      const steps = Math.round(e.deltaY / 100)
      changeValueBySteps(steps)
    }, [changeValueBySteps])

    const wheelHeight = visibleCount * optionItemHeight
    const middleIndex = Math.floor(visibleCount / 2)

    // Generate visible items with padding
    const visibleItems = []
    for (let i = 0; i < visibleCount; i++) {
      const optionIndex = currentIndex - middleIndex + i
      const option = options[optionIndex]
      const isSelected = i === middleIndex
      
      visibleItems.push(
        <div
          key={optionIndex}
          className={cn(
            "flex items-center justify-center cursor-pointer transition-colors",
            isSelected 
              ? cn("text-foreground font-bold", classNames?.highlightItem)
              : "text-muted-foreground",
            classNames?.optionItem
          )}
          style={{ height: optionItemHeight }}
          onClick={() => option && handleItemClick(option)}
        >
          {option?.label || ""}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn("relative select-none touch-none", className)}
        style={{ height: wheelHeight }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        {...props}
      >
        <div className="h-full">
          {visibleItems}
        </div>
      </div>
    )
  }
)
WheelPicker.displayName = "WheelPicker"

export { WheelPicker, WheelPickerWrapper }