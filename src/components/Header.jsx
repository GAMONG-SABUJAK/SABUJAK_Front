import React from "react";

export default function Header({
  left,
  center,
  right,
  fixed = false, // fixed 여부 (기본 false)
  className = "",
}) {
  return (
    <div
      className={`flex items-center justify-between px-6 ${
        fixed ? "fixed top-12 left-0 right-0 z-50" : ""
      } ${className}`}
    >
      <div className="flex items-center">{left}</div>
      <div className="flex items-center">{center}</div>
      <div className="flex items-center">{right}</div>
    </div>
  );
}
