import React from "react";

type Props = { color: string };

export default function Transparent({ color }: Props) {
  return (
    <>
      <svg
        width="100%"
        height="100px"
        viewBox="0 0 1280 140"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill={color}>
          <path d="M0 140h1280C573.08 140 0 0 0 0z"></path>
        </g>
      </svg>
    </>
  );
}
