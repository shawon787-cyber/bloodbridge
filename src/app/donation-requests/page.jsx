import DonationRequestHero from "@/Components/DonationRequestHero";
import RequestCard from "@/Components/shared/RequestCard";

const requests = [
  {
    id: "BB-1024",
    bloodGroup: "O+",
    name: "Md. Rakib Hasan",
    location: "Dhanmondi, Dhaka",
    hospital: "Dhaka Medical College Hospital",
    units: "2 units required",
    date: "Aug 12, 2026",
    time: "10:30 AM",
    status: "Urgent",
  },
  {
    id: "BB-1023",
    bloodGroup: "A+",
    name: "Ayesha Siddiqua",
    location: "Pahartali, Chattogram",
    hospital: "Chattogram Medical College",
    units: "1 unit required",
    date: "Aug 13, 2026",
    time: "02:00 PM",
    status: "Active",
  },
  {
    id: "BB-1021",
    bloodGroup: "AB+",
    name: "Shirin Akter",
    location: "Paba, Rajshahi",
    hospital: "Rajshahi Medical College Hospital",
    units: "2 units required",
    date: "Aug 16, 2026",
    time: "11:15 AM",
    status: "Active",
  },
];

export default function DonationRequestsPage() {
  return (
    <main>
      <DonationRequestHero />

      <div className="relative bg-[#FFF9FA] pb-12">

        <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#FDECEF] blur-3xl" />

        <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#FBE5E9] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {requests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
              />
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}
