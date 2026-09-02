"use client";

import React from "react";
import Image from "next/image";

export function Logo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <img src="/hexagon-alien.png" alt="CypherTech Logo" className={className} />
  );
}
