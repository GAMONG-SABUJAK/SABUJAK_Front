import React from "react";
import Deals from "./Deals";
import StoreScore from "./StoreScore";
import Weather from "./Weather";

export default function Main() {
  return (
    <div className="px-6 w-full space-y-4 h-screen overflow-y-auto">
      <Weather />
      <Deals />
      <StoreScore />
    </div>
  );
}
