"use client";

import { DonationRequestProvider } from "@/context/DonationRequestContext";
import { DonorProvider } from "@/context/DonorContext";

export default function Providers({ children }) {
  return (
    <DonationRequestProvider>
      <DonorProvider>
        {children}
      </DonorProvider>
    </DonationRequestProvider>
  );
}
