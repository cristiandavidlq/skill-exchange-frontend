import * as React from "react";
import { cn } from "@/lib/utils";

const stylesByVariant = {
  category: [
    "bg-lime-400 py-4 text-center gap-4 ring-1 ring-foreground/10",
    "data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0",
    "hover:bg-lime-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-lime-900/20 hover:ring-foreground/20",
  ],

  skill: [
    "!bg-white !text-gray-900 border border-gray-200",
    "!ring-0 shadow-sm",

    // Layout propio
    "text-left p-5 gap-1",

    // Hover independiente
    "hover:!bg-white hover:shadow-md hover:-translate-y-0.5",
  ],
};

const Card = React.forwardRef(function Card(
  { className, size = "", variant = "category", ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="card"
      data-size={size}
      data-variant={variant}
      className={cn(
        // Base compartida
        "group/card flex flex-col overflow-hidden text-sm",
        "cursor-pointer transition-all duration-300 ease-out",

        // Helpers estructurales
        "has-data-[slot=card-footer]:pb-0",
        "has-[>img:first-child]:pt-0",
        "*:[img:first-child]:rounded-t-xl",
        "*:[img:last-child]:rounded-b-xl",

        // Variante visual
        stylesByVariant[variant] || stylesByVariant.category,

        className,
      )}
      {...props}
    />
  );
});

function CardHeader({ className, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        // Base
        "group/card-header @container/card-header grid auto-rows-min items-start",
        "gap-1 px-4",
        "group-data-[size=sm]/card:px-3",
        "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        "has-data-[slot=card-description]:grid-rows-[auto_auto]",
        "[.border-b]:pb-4",
        "group-data-[size=sm]/card:[.border-b]:pb-3",

        // Skill variant
        "group-data-[variant=skill]/card:p-0",
        "group-data-[variant=skill]/card:grid-cols-1",
        "group-data-[variant=skill]/card:gap-0.5",

        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-base leading-snug font-medium",
        "group-data-[size=sm]/card:text-sm",

        // Skill variant
        "group-data-[variant=skill]/card:text-gray-900",
        "group-data-[variant=skill]/card:font-bold",
        "group-data-[variant=skill]/card:tracking-tight",

        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "text-sm text-muted-foreground",

        // Skill variant
        "group-data-[variant=skill]/card:text-gray-400",
        "group-data-[variant=skill]/card:font-medium",
        "group-data-[variant=skill]/card:mt-0.5",

        className,
      )}
      {...props}
    />
  );
}

function CardAction({ className, ...props }) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "px-4 group-data-[size=sm]/card:px-3",

        // Skill variant
        "group-data-[variant=skill]/card:p-0",

        className,
      )}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-4",
        "group-data-[size=sm]/card:p-3",

        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
