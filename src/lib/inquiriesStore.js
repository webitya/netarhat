// Persistent Inquiries & Bookings Store

if (!globalThis._inquiriesStore) {
  globalThis._inquiriesStore = [
    {
      id: "BK-1082",
      type: "Booking",
      name: "Rajesh Sharma",
      email: "rajesh.sharma@gmail.com",
      phone: "+91 98310 44211",
      package: "Ranchi – Netarhat – Ranchi (2N/3D)",
      travelDate: "2026-11-12",
      guests: "4 Adults",
      status: "Confirmed",
      amount: "₹45,996",
      notes: "Requested sunrise facing rooms and veg food.",
      createdAt: "2026-10-25T10:14:00Z",
    },
    {
      id: "BK-1081",
      type: "Booking",
      name: "Pooja Banerjee",
      email: "pooja.banerjee@outlook.com",
      phone: "+91 94331 87654",
      package: "Ranchi – Betla National Park – Netarhat (3N/4D)",
      travelDate: "2026-11-20",
      guests: "2 Adults, 1 Child",
      status: "Pending",
      amount: "₹39,798",
      notes: "Inquire about elephant safari availability for child.",
      createdAt: "2026-10-26T08:30:00Z",
    },
    {
      id: "BK-1080",
      type: "Inquiry",
      name: "Amitabh Sen",
      email: "amitabh.sen@tcs.com",
      phone: "+91 98200 12345",
      package: "Grand Jharkhand Nature & Safari Expedition (4N/5D)",
      travelDate: "2026-12-05",
      guests: "6 Travelers (Corporate retreat)",
      status: "Contacted",
      amount: "₹89,994",
      notes: "Need customized vehicle and bonfire arrangement.",
      createdAt: "2026-10-24T16:45:00Z",
    },
    {
      id: "BK-1079",
      type: "Contact",
      name: "Vikram Singhania",
      email: "vikram.singhania@yahoo.com",
      phone: "+91 97714 55678",
      package: "General Inquiry",
      travelDate: "2026-11-15",
      guests: "2 Adults",
      status: "Pending",
      amount: "-",
      notes: "Is Dak Bungalow suitable for senior citizens? What is the walking distance to viewpoints?",
      createdAt: "2026-10-26T12:05:00Z",
    },
  ];
}

export function getAllInquiries() {
  return [...globalThis._inquiriesStore];
}

export function addInquiry(data) {
  const newInquiry = {
    id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
    type: data.type || "Booking",
    name: data.name,
    email: data.email,
    phone: data.phone,
    package: data.package || "Custom Tour Inquiry",
    travelDate: data.travelDate || "Flexible",
    guests: data.guests || "1 Guest",
    status: "Pending",
    amount: data.amount || "Quotation Required",
    notes: data.notes || data.message || "No special requests",
    createdAt: new Date().toISOString(),
  };

  globalThis._inquiriesStore.unshift(newInquiry);
  return newInquiry;
}

export function updateInquiryStatus(id, newStatus) {
  const item = globalThis._inquiriesStore.find((i) => i.id === id);
  if (item) {
    item.status = newStatus;
    return item;
  }
  return null;
}

export function deleteInquiry(id) {
  const index = globalThis._inquiriesStore.findIndex((i) => i.id === id);
  if (index !== -1) {
    const deleted = globalThis._inquiriesStore.splice(index, 1);
    return deleted[0];
  }
  return null;
}
