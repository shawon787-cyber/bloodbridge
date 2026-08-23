"use client";

import { useSession } from "@/lib/auth-client";
import { isBlockedUser } from "@/lib/isBlockedUser";
import CreateDonation from "@/Components/dashboard/donor/CreateDonation";

export default function CreateDonationPage() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const blocked = isBlockedUser(user);

  if (isPending) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#D62839] border-t-transparent" />
      </div>
    );
  }

  if (blocked) {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          </svg>
        </div>
        <h2 className="mt-4 text-lg font-black text-red-800">
          Donation Request Unavailable
        </h2>
        <p className="mt-2 text-sm leading-6 text-red-700">
          Your account is currently blocked, so you cannot create a donation request.
          Please contact an administrator if you believe this is a mistake.
        </p>
      </div>
    );
  }

  return <CreateDonation />;
}
