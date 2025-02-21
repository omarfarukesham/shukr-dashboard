import React from "react";

type HamburgerIconProps = {
  className?: string;
};

const HamburgerIcon: React.FC<HamburgerIconProps> = ({ className }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || "fill-white"}
    >
      <path d="M4 24V22H19.1111V24H4ZM4 17V15H27.5556V17H4ZM4 10V8H28V10H4Z" fill="inherit" 
      
      />
    </svg>
  );
};

export default HamburgerIcon;