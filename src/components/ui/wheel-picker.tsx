"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface WheelPickerOption {
  /** Value that will be returned when this option is selected */
  value: string
  /** The content displayed for this option */
  label: React.ReactNode
}

export interface WheelPickerClassNames {
  /** Class name for individual option items */
  optionItem?: string
  /** Class name for the wrapper of the highlighted area */
  highlightWrapper?: string
  /** Class name for the highlighted item */
  highlightItem?: string
}

export interface WheelPickerProps {
  /** Array of options to display in the wheel */
  options: WheelPickerOption[]
  /** Current value of the picker (controlled mode) */
  value?: string
  /** Default value of the picker (uncontrolled mode) */
  defaultValue?: string
  /** Callback fired when the selected value changes */
  onValueChange?: (value: string) => void
  /** Enable infinite scrolling */
  infinite?: boolean
  /** Number of options visible on the wheel (must be multiple of 4) */
  visibleCount?: number
  /** Sensitivity of the drag interaction (higher = more sensitive) */
  dragSensitivity?: number
  /** Height (in pixels) of each item in the picker list */
  optionItemHeight?: number
  /** Custom class names for styling */
  classNames?: WheelPickerClassNames
  /** CSS class name for the wheel */
  className?: string
}

export interface WheelPickerWrapperProps {
  /** CSS class name for wrapper */
  className?: string
  /** WheelPicker components */
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
      infinite = false,
      visibleCount = 20,
      dragSensitivity = 3,
      optionItemHeight = 30,
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
    const containerRef = React.useRef<HTMLDivElement>(null)
    const isDragging = React.useRef(false)
    const lastY = React.useRef(0)
    const velocity = React.useRef(0)
    const animationId = React.useRef<number>()

    // Find current index
    const currentIndex = options.findIndex(option => option.value === currentValue)
    
    const handleValueChange = React.useCallback((newValue: string) => {
      setInternalValue(newValue)
      onValueChange?.(newValue)
    }, [onValueChange])

    // Handle scroll to center selected item
    const scrollToIndex = React.useCallback((index: number) => {
      if (!containerRef.current) return
      
      const container = containerRef.current
      const targetY = index * optionItemHeight
      container.scrollTop = targetY
    }, [optionItemHeight])

    // Handle item selection
    const handleItemClick = React.useCallback((option: WheelPickerOption) => {
      handleValueChange(option.value)
    }, [handleValueChange])

    // Initialize scroll position
    React.useEffect(() => {
      if (currentIndex >= 0) {
        scrollToIndex(currentIndex)
      }
    }, [currentIndex, scrollToIndex])

    // Handle scroll events to update selection
    const handleScroll = React.useCallback(() => {
      if (!containerRef.current || isDragging.current) return
      
      const container = containerRef.current
      const scrollTop = container.scrollTop
      const newIndex = Math.round(scrollTop / optionItemHeight)
      
      if (newIndex >= 0 && newIndex < options.length) {
        const newOption = options[newIndex]
        if (newOption && newOption.value !== currentValue) {
          handleValueChange(newOption.value)
        }
      }
    }, [currentValue, handleValueChange, optionItemHeight, options])

    // Handle mouse/touch events for smooth scrolling
    const startDrag = React.useCallback((clientY: number) => {
      isDragging.current = true
      lastY.current = clientY
      velocity.current = 0
      
      if (animationId.current) {
        cancelAnimationFrame(animationId.current)
      }
    }, [])

    const updateDrag = React.useCallback((clientY: number) => {
      if (!isDragging.current || !containerRef.current) return
      
      const deltaY = lastY.current - clientY
      velocity.current = deltaY * dragSensitivity
      lastY.current = clientY
      
      containerRef.current.scrollTop += deltaY
    }, [dragSensitivity])

    const endDrag = React.useCallback(() => {
      isDragging.current = false
      
      if (!containerRef.current) return
      
      // Simplified velocity handling
      const absVelocity = Math.abs(velocity.current)
      
      if (absVelocity > 3) {
        // Apply simple inertia
        const applyInertia = () => {
          if (!containerRef.current || Math.abs(velocity.current) < 0.1) {
            handleScroll()
            return
          }
          
          containerRef.current.scrollTop += velocity.current
          velocity.current *= 0.9 // Friction
          
          animationId.current = requestAnimationFrame(applyInertia)
        }
        applyInertia()
      } else {
        // Just snap to nearest
        handleScroll()
      }
    }, [handleScroll])

    // Mouse events
    const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
      e.preventDefault()
      startDrag(e.clientY)
    }, [startDrag])

    const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
      if (isDragging.current) {
        updateDrag(e.clientY)
      }
    }, [updateDrag])

    const handleMouseUp = React.useCallback(() => {
      if (isDragging.current) {
        endDrag()
      }
    }, [endDrag])

    // Touch events
    const handleTouchStart = React.useCallback((e: React.TouchEvent) => {
      e.preventDefault()
      startDrag(e.touches[0].clientY)
    }, [startDrag])

    const handleTouchMove = React.useCallback((e: React.TouchEvent) => {
      e.preventDefault()
      if (e.touches.length > 0) {
        updateDrag(e.touches[0].clientY)
      }
    }, [updateDrag])

    const handleTouchEnd = React.useCallback((e: React.TouchEvent) => {
      e.preventDefault()
      endDrag()
    }, [endDrag])

    // Add global touch events for mobile
    React.useEffect(() => {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        if (isDragging.current) {
          updateDrag(e.clientY)
        }
      }
      
      const handleGlobalMouseUp = () => {
        if (isDragging.current) {
          endDrag()
        }
      }

      const handleGlobalTouchMove = (e: TouchEvent) => {
        if (isDragging.current && e.touches.length > 0) {
          e.preventDefault()
          updateDrag(e.touches[0].clientY)
        }
      }

      const handleGlobalTouchEnd = () => {
        if (isDragging.current) {
          endDrag()
        }
      }

      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('mouseup', handleGlobalMouseUp)
      document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false })
      document.addEventListener('touchend', handleGlobalTouchEnd)
      
      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove)
        document.removeEventListener('mouseup', handleGlobalMouseUp)
        document.removeEventListener('touchmove', handleGlobalTouchMove)
        document.removeEventListener('touchend', handleGlobalTouchEnd)
        if (animationId.current) {
          cancelAnimationFrame(animationId.current)
        }
      }
    }, [updateDrag, endDrag])

    const wheelHeight = visibleCount * optionItemHeight
    const middleIndex = Math.floor(visibleCount / 2)

    return (
      <div
        ref={ref}
        className={cn("relative select-none", className)}
        style={{ height: wheelHeight }}
        {...props}
      >
        {/* Highlight area */}
        <div
          className={cn(
            "absolute inset-x-0 z-10 bg-muted rounded-lg",
            classNames?.highlightWrapper
          )}
          style={{
            top: middleIndex * optionItemHeight,
            height: optionItemHeight,
          }}
        />
        
        {/* Fade masks */}
        <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-background to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
        
        {/* Options container */}
        <div
          ref={containerRef}
          className="h-full overflow-hidden scroll-smooth"
          style={{ 
            paddingTop: middleIndex * optionItemHeight,
            paddingBottom: middleIndex * optionItemHeight,
            touchAction: 'none'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onScroll={handleScroll}
        >
          {options.map((option, index) => {
            const isSelected = option.value === currentValue
            return (
              <div
                key={option.value}
                className={cn(
                  "flex items-center justify-center cursor-pointer transition-colors",
                  isSelected 
                    ? cn("text-foreground font-semibold", classNames?.highlightItem)
                    : "text-muted-foreground",
                  classNames?.optionItem
                )}
                style={{ height: optionItemHeight }}
                onClick={() => handleItemClick(option)}
              >
                {option.label}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
WheelPicker.displayName = "WheelPicker"

export { WheelPicker, WheelPickerWrapper }