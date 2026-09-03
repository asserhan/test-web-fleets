// src/icons/ChevronRightIcon.tsx
import type { SVGProps } from "react";

export const ChevronRightIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="12"
      viewBox="0 0 7 12"
      width="7"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.600006 0.600006L5.60001 5.60001L0.600006 10.6"
        stroke="currentColor"
        strokeOpacity="0.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
    </svg>
  );
};