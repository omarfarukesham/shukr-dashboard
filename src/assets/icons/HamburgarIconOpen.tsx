import React from "react";

type HamburgerIconProps = {
  className?: string;
};
export const HamburgerIconOpen: React.FC<HamburgerIconProps> = ({ className }) => {
    return (
      <svg
        className={className || "h-6 w-6"}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={"M4 6h16M4 12h16M4 18h7"} />
      </svg>
    );
  };