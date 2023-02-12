import type { ComponentPropsWithRef, ReactElement } from "react";
import React from "react";

import ConditionalLink from "@/ui/components/ConditionalLink/ConditionalLink";

interface ButtonProps extends ComponentPropsWithRef<"button"> {
  variant?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  submitting?: boolean;
  href?: string;
  target?: "_self" | "_blank";
  icon?: ReactElement;
  iconPosition?: "left" | "right";
  size?: string;
}

interface IButtonFamilyClasses {
  variant: Record<string, Record<string, string>>;
  iconPosition: Record<string, string>;
  loadingIcon: Record<string, "primary" | "white" | "neutral">;
  size: Record<string, string>;
}

const buttonFamilyClasses: IButtonFamilyClasses = {
  variant: {
    primary: {
      base: "bg-blue-600 text-yellow-50 before:border-blue hover:bg-blue-700 before:hover:border-blue-700 before:focus:border-4 before:focus:bg-blue focus:text-yellow-white before:focus:border-blue-200",
      disabled: "bg-yellow-200 text-yellow-400 before:border-0",
      loadingIcon: "white",
    },
    secondary: {
      base: "bg-yellow-50 text-blue-600 before:border-2 before:border-blue-600 before:hover:border-4 before:hover:border-blue-600 before:focus:border-4 before:focus:border-blue-200",
      disabled: "bg-yellow-200 text-yellow-400 before:border-0",
      loadingIcon: "primary",
    },
    tertiary: {
      base: "bg-yellow-50 text-yellow-black before:border-2 before:border-yellow-black before:hover:border-4 before:hover:border-yellow-black before:focus:border-4 before:focus:border-info-500",
      disabled: "bg-yellow-200 text-yellow-400 before:border-0",
      loadingIcon: "neutral",
    },
  },
  iconPosition: {
    left: "[&>span+span]:ml-2 [&>*:first-child]:order-first",
    right: "[&>span+span]:mr-2 [&>*:first-child]:order-last",
  },
  loadingIcon: {
    primary: "white",
    secondary: "primary",
    tertiary: "neutral",
  },
  size: {
    sm: "text-sm py-sm px-sm",
    lg: "text-md py-2.5 px-2.5",
  },
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      disabled,
      submitting,
      href,
      target,
      type = "button",
      icon,
      iconPosition = "right",
      size = "lg",
      ...props
    },
    forwardedRef
  ) => {
    const getState = () => {
      if (disabled) return "disabled";

      return "base";
    };
    return (
      <ConditionalLink href={href} target={target} disabled={disabled}>
        <button
          className={` before:border-1 relative inline-flex items-center justify-center rounded text-base font-bold outline-none transition-colors before:absolute before:top-[0px] before:right-[0px] before:bottom-[0px] before:left-[0px] before:rounded before:border ${
            buttonFamilyClasses["size"][size]
          } ${buttonFamilyClasses["variant"][variant][getState()]}`}
          disabled={disabled}
          type={type}
          ref={forwardedRef}
          {...props}
        >
          <span
            className={`${
              submitting ? "opacity-0" : "opacity-100"
            } z-10 inline-flex items-center justify-center ${
              buttonFamilyClasses["iconPosition"][iconPosition]
            } ${children ? "px-2" : "px-0"}`}
          >
            {icon && <span>{icon}</span>}
            {children && <span>{children}</span>}
          </span>
        </button>
      </ConditionalLink>
    );
  }
);

Button.displayName = "Button";

export default Button;
