'use server'
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getDonationRequests = async () => {
    const res = await fetch(`${baseUrl}/api/donation-requests`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });
    if (!res.ok) {
        throw new Error('Failed to fetch donation requests');
    }
    return res.json();
};

export const createDonationRequest = async (donationRequestData) => {
    const res = await fetch(`${baseUrl}/api/donation-requests`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationRequestData),
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${res.status}: Failed to create donation request`);
    }
    return res.json();
};
