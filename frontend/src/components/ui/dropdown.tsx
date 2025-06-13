import * as React from "react";
import { cn } from "../../lib/utils";

const Dropdown = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("relative", className)} {...props} />
));
Dropdown.displayName = "Dropdown";

const DropdownTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex items-center justify-between w-full px-3 py-2 border border-zinc-700 bg-zinc-800 text-zinc-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-600",
      className
    )}
    {...props}
  />
));
DropdownTrigger.displayName = "DropdownTrigger";

const DropdownContent = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      "absolute left-0 right-0 mt-1 bg-zinc-900 border border-zinc-700 rounded shadow-lg z-10",
      className
    )}
    {...props}
  />
));
DropdownContent.displayName = "DropdownContent";

const DropdownItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn(
      "px-3 py-2 cursor-pointer hover:bg-zinc-800 text-zinc-100",
      className
    )}
    {...props}
  />
));
DropdownItem.displayName = "DropdownItem";

export { Dropdown, DropdownTrigger, DropdownContent, DropdownItem };
