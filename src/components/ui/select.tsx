"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import * as React from "react";
import { cn } from "@/src/lib/utils";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center gap-2 bg-transparent p-0 text-start text-3xl md:text-4xl font-semibold text-white outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground/70 [&>span]:min-w-0 group",
      className,
    )}
    {...props}
  >
    <span
      className="
        relative inline-block font-semibold
        bg-gradient-to-r from-[#00D26A] to-blue-500
        bg-clip-text text-transparent
        
        after:content-['']
        after:absolute
        after:left-0
        after:-bottom-1
        after:h-[3px]
        after:w-full
        after:bg-gradient-to-r
        after:from-[#00D26A]
        after:to-blue-500
        after:opacity-70
        after:transition-opacity
        after:duration-300
        
        group-hover:after:opacity-100
        group-focus:after:opacity-100
        transition-all duration-300
      "
    >
      {children}
    </span>
    <SelectPrimitive.Icon asChild>
      <ChevronDownIcon 
        width={24} 
        height={24} 
        className="shrink-0 text-blue-500 transition-transform duration-300 group-data-[state=open]:rotate-180" 
      />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1 hover:bg-zinc-800 transition-colors duration-200 text-zinc-400",
      className
    )}
    {...props}
  >
    <ChevronUpIcon width={16} height={16} />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1 hover:bg-zinc-800 transition-colors duration-200 text-zinc-400",
      className
    )}
    {...props}
  >
    <ChevronDownIcon width={16} height={16} />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-[min(24rem,var(--radix-select-content-available-height))] min-w-[8rem] overflow-hidden rounded-md border border-white/10 bg-zinc-950 backdrop-blur-md text-white shadow-xl shadow-black/50",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:duration-200 data-[state=open]:duration-300",
        "data-[side=bottom]:slide-in-from-top-3",
        "data-[side=left]:slide-in-from-right-3",
        "data-[side=right]:slide-in-from-left-3",
        "data-[side=top]:slide-in-from-bottom-3",
        "[&_[role=group]]:py-1",
        position === "popper" &&
          "w-full min-w-[var(--radix-select-trigger-width)] data-[side=bottom]:translate-y-2 data-[side=left]:-translate-x-2 data-[side=right]:translate-x-2 data-[side=top]:-translate-y-2",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn("p-2", position === "popper" && "h-[var(--radix-select-trigger-height)]")}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pe-2 ps-8 text-xs font-medium text-zinc-500", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 pe-2 ps-8 text-sm outline-none transition-all duration-200",
      "hover:bg-zinc-800 hover:text-white",
      "focus:bg-zinc-800 focus:text-white",
      "data-[state=checked]:bg-[#00D26A]/10 data-[state=checked]:text-[#00D26A]",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute start-2 flex size-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon width={16} height={16} className="text-[#00D26A]" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-white/10", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};