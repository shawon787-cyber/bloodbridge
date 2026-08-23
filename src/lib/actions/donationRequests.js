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
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data?.success) {
        return data;
    }
    return data;
};

export const updateDonationRequestStatus = async (requestId, status) => {
    const res = await fetch(`${baseUrl}/api/donation-requests/${requestId}/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
        cache: 'no-store',
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${res.status}: Failed to update donation request status`);
    }
    return res.json();
};
