import type { Metadata } from "next";
import DentalDemoContent from "@/components/demo/DentalDemoContent";

export const metadata: Metadata = {
  title: "Dr. Tooth Dental Clinic | Sales Pitch Flow",
  description: "A premium interactive pitch flow for the Dr. Tooth Dental Clinic demo platform.",
};

export default function DentalDemoPage() {
  return <DentalDemoContent />;
}
