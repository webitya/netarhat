import { getDatabase } from "./mongodb";
import { tourPackages as initialTourPackages, stays as initialStays } from "./data";
import { getAllInquiries as getInitialInquiries } from "./inquiriesStore";

let isSeeded = false;

/**
 * Ensures MongoDB collections are initialized and seeded with existing content if empty
 */
export async function seedDatabaseIfEmpty() {
  if (isSeeded) return;
  try {
    const db = await getDatabase();

    // 1. Seed Packages
    const packagesCollection = db.collection("packages");
    const packagesCount = await packagesCollection.countDocuments();
    if (packagesCount === 0) {
      console.log("Seeding MongoDB packages collection with initial data...");
      const seeded = initialTourPackages.map((pkg) => ({
        ...pkg,
        _id: undefined, // allow Mongo to assign ObjectId or keep custom id
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      await packagesCollection.insertMany(seeded);
    }

    // 2. Seed Stays
    const staysCollection = db.collection("stays");
    const staysCount = await staysCollection.countDocuments();
    if (staysCount === 0) {
      console.log("Seeding MongoDB stays collection with initial data...");
      const seededStays = initialStays.map((stay) => ({
        ...stay,
        _id: undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      await staysCollection.insertMany(seededStays);
    }

    // 3. Seed Inquiries
    const inquiriesCollection = db.collection("inquiries");
    const inquiriesCount = await inquiriesCollection.countDocuments();
    if (inquiriesCount === 0) {
      console.log("Seeding MongoDB inquiries collection with initial records...");
      const initialList = getInitialInquiries().map((inq) => ({
        ...inq,
        _id: undefined,
      }));
      await inquiriesCollection.insertMany(initialList);
    }

    isSeeded = true;
  } catch (error) {
    console.warn("MongoDB seed check skipped or failed:", error.message);
  }
}

// ==========================================
// INQUIRIES & BOOKINGS CRUD
// ==========================================

export async function getInquiries() {
  try {
    await seedDatabaseIfEmpty();
    const db = await getDatabase();
    const items = await db
      .collection("inquiries")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return items.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));
  } catch (error) {
    console.warn("MongoDB getInquiries fallback to memory:", error.message);
    return getInitialInquiries();
  }
}

export async function createInquiry(data) {
  const newInquiry = {
    id: data.id || `BK-${Math.floor(1000 + Math.random() * 9000)}`,
    type: data.type || "Booking",
    name: data.name,
    email: data.email || "",
    phone: data.phone,
    package: data.package || "Custom Tour Inquiry",
    travelDate: data.travelDate || "Flexible",
    guests: data.guests || "1 Guest",
    status: data.status || "Pending",
    amount: data.amount || "Quotation Required",
    notes: data.notes || data.message || "No special requests",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    const db = await getDatabase();
    const res = await db.collection("inquiries").insertOne(newInquiry);
    return { ...newInquiry, _id: res.insertedId.toString() };
  } catch (error) {
    console.warn("MongoDB createInquiry fallback:", error.message);
    if (!globalThis._inquiriesStore) globalThis._inquiriesStore = [];
    globalThis._inquiriesStore.unshift(newInquiry);
    return newInquiry;
  }
}

export async function updateInquiryStatus(id, newStatus) {
  try {
    const db = await getDatabase();
    const res = await db.collection("inquiries").findOneAndUpdate(
      { id },
      { $set: { status: newStatus, updatedAt: new Date().toISOString() } },
      { returnDocument: "after" }
    );
    if (res && res._id) {
      return { ...res, _id: res._id.toString() };
    }
  } catch (error) {
    console.warn("MongoDB updateInquiryStatus fallback:", error.message);
  }

  // Fallback to in-memory store
  if (globalThis._inquiriesStore) {
    const item = globalThis._inquiriesStore.find((i) => i.id === id);
    if (item) {
      item.status = newStatus;
      return item;
    }
  }
  return { id, status: newStatus };
}

export async function deleteInquiry(id) {
  try {
    const db = await getDatabase();
    await db.collection("inquiries").deleteOne({ id });
  } catch (error) {
    console.warn("MongoDB deleteInquiry fallback:", error.message);
  }

  if (globalThis._inquiriesStore) {
    const idx = globalThis._inquiriesStore.findIndex((i) => i.id === id);
    if (idx !== -1) globalThis._inquiriesStore.splice(idx, 1);
  }
  return true;
}

// ==========================================
// TOUR PACKAGES CRUD
// ==========================================

export async function getTourPackages() {
  try {
    await seedDatabaseIfEmpty();
    const db = await getDatabase();
    const packages = await db.collection("packages").find({}).toArray();
    if (packages.length > 0) {
      return packages.map((pkg) => ({
        ...pkg,
        _id: pkg._id.toString(),
      }));
    }
  } catch (error) {
    console.warn("MongoDB getTourPackages fallback to static:", error.message);
  }
  return initialTourPackages;
}

export async function getTourPackageBySlug(slug) {
  try {
    await seedDatabaseIfEmpty();
    const db = await getDatabase();
    const pkg = await db.collection("packages").findOne({ slug });
    if (pkg) {
      return { ...pkg, _id: pkg._id.toString() };
    }
  } catch (error) {
    console.warn("MongoDB getTourPackageBySlug fallback:", error.message);
  }
  return initialTourPackages.find((p) => p.slug === slug) || null;
}

export async function createTourPackage(pkgData) {
  const newPkg = {
    ...pkgData,
    id: pkgData.slug || `pkg-${Date.now()}`,
    slug: pkgData.slug || (pkgData.title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    startingPrice: Number(pkgData.startingPrice) || 0,
    rating: Number(pkgData.rating) || 4.9,
    reviewsCount: Number(pkgData.reviewsCount) || 1,
    highlights: Array.isArray(pkgData.highlights)
      ? pkgData.highlights
      : (pkgData.highlights || "").split("\n").filter(Boolean),
    itinerary: Array.isArray(pkgData.itinerary) ? pkgData.itinerary : [],
    pricing: Array.isArray(pkgData.pricing) ? pkgData.pricing : [],
    inclusions: Array.isArray(pkgData.inclusions)
      ? pkgData.inclusions
      : (pkgData.inclusions || "").split("\n").filter(Boolean),
    exclusions: Array.isArray(pkgData.exclusions)
      ? pkgData.exclusions
      : (pkgData.exclusions || "").split("\n").filter(Boolean),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    const db = await getDatabase();
    const res = await db.collection("packages").insertOne(newPkg);
    return { ...newPkg, _id: res.insertedId.toString() };
  } catch (error) {
    console.error("MongoDB createTourPackage error:", error.message);
    throw error;
  }
}

export async function updateTourPackage(idOrSlug, updateData) {
  try {
    const db = await getDatabase();
    const updatePayload = {
      ...updateData,
      startingPrice: updateData.startingPrice !== undefined ? Number(updateData.startingPrice) : undefined,
      rating: updateData.rating !== undefined ? Number(updateData.rating) : undefined,
      reviewsCount: updateData.reviewsCount !== undefined ? Number(updateData.reviewsCount) : undefined,
      updatedAt: new Date().toISOString(),
    };

    // Clean undefined fields
    Object.keys(updatePayload).forEach(
      (key) => updatePayload[key] === undefined && delete updatePayload[key]
    );

    const res = await db.collection("packages").findOneAndUpdate(
      { $or: [{ id: idOrSlug }, { slug: idOrSlug }] },
      { $set: updatePayload },
      { returnDocument: "after" }
    );

    if (res && res._id) {
      return { ...res, _id: res._id.toString() };
    }
    return { id: idOrSlug, ...updatePayload };
  } catch (error) {
    console.error("MongoDB updateTourPackage error:", error.message);
    throw error;
  }
}

export async function deleteTourPackage(idOrSlug) {
  try {
    const db = await getDatabase();
    await db.collection("packages").deleteOne({
      $or: [{ id: idOrSlug }, { slug: idOrSlug }],
    });
    return true;
  } catch (error) {
    console.error("MongoDB deleteTourPackage error:", error.message);
    throw error;
  }
}

// ==========================================
// STAYS / ACCOMMODATIONS CRUD
// ==========================================

export async function getStays() {
  try {
    await seedDatabaseIfEmpty();
    const db = await getDatabase();
    const stayList = await db.collection("stays").find({}).toArray();
    if (stayList.length > 0) {
      return stayList.map((s) => ({
        ...s,
        _id: s._id.toString(),
      }));
    }
  } catch (error) {
    console.warn("MongoDB getStays fallback to static:", error.message);
  }
  return initialStays;
}

export async function createStay(stayData) {
  const newStay = {
    ...stayData,
    id: stayData.id || `stay-${Date.now()}`,
    rating: Number(stayData.rating) || 4.8,
    reviews: Number(stayData.reviews) || 1,
    amenities: Array.isArray(stayData.amenities)
      ? stayData.amenities
      : (stayData.amenities || "").split(",").map((a) => a.trim()).filter(Boolean),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    const db = await getDatabase();
    const res = await db.collection("stays").insertOne(newStay);
    return { ...newStay, _id: res.insertedId.toString() };
  } catch (error) {
    console.error("MongoDB createStay error:", error.message);
    throw error;
  }
}

export async function updateStay(id, updateData) {
  try {
    const db = await getDatabase();
    const updatePayload = {
      ...updateData,
      rating: updateData.rating !== undefined ? Number(updateData.rating) : undefined,
      reviews: updateData.reviews !== undefined ? Number(updateData.reviews) : undefined,
      updatedAt: new Date().toISOString(),
    };

    if (typeof updatePayload.amenities === "string") {
      updatePayload.amenities = updatePayload.amenities.split(",").map((a) => a.trim()).filter(Boolean);
    }

    Object.keys(updatePayload).forEach(
      (key) => updatePayload[key] === undefined && delete updatePayload[key]
    );

    const res = await db.collection("stays").findOneAndUpdate(
      { id },
      { $set: updatePayload },
      { returnDocument: "after" }
    );

    if (res && res._id) {
      return { ...res, _id: res._id.toString() };
    }
    return { id, ...updatePayload };
  } catch (error) {
    console.error("MongoDB updateStay error:", error.message);
    throw error;
  }
}

export async function deleteStay(id) {
  try {
    const db = await getDatabase();
    await db.collection("stays").deleteOne({ id });
    return true;
  } catch (error) {
    console.error("MongoDB deleteStay error:", error.message);
    throw error;
  }
}

