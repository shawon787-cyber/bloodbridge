"use client";

import { DonationRequestProvider } from "@/context/DonationRequestContext";
import { DonorProvider } from "@/context/DonorContext";
import { UserProvider } from "@/context/UserContext";

export default function Providers({ children }) {
  return (
    <UserProvider>
      <DonationRequestProvider>
        <DonorProvider>
          {children}
        </DonorProvider>
      </DonationRequestProvider>
    </UserProvider>
  );
}
