"use client";

import React from "react";
import Image from "next/image";

export function Logo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <img src="/CypherTechlogo.png" alt="Logo" className={className} />
  );
}
