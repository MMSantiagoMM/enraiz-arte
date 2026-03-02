import { db } from '../firebase/config';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy
} from 'firebase/firestore';

// Get all workshop registrations
export const getWorkshopRegistrations = async () => {
    const q = query(collection(db, "workshop_registrations"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Add a new registration
export const addWorkshopRegistration = async (data) => {
    return await addDoc(collection(db, "workshop_registrations"), {
        ...data,
        createdAt: new Date().toISOString()
    });
};

// Get all tourism bookings
export const getTourismBookings = async () => {
    const q = query(collection(db, "tourism_bookings"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Add a new booking
export const addTourismBooking = async (data) => {
    return await addDoc(collection(db, "tourism_bookings"), {
        ...data,
        createdAt: new Date().toISOString()
    });
};

// Content Management Services
export const getMultimediaContent = async () => {
    const querySnapshot = await getDocs(collection(db, "content_multimedia"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateMultimediaItem = async (id, data) => {
    return await updateDoc(doc(db, "content_multimedia", id), data);
};

export const getTourismContent = async () => {
    const querySnapshot = await getDocs(collection(db, "content_tourism"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateTourismRoute = async (id, data) => {
    return await updateDoc(doc(db, "content_tourism", id), data);
};

export const addTourismRoute = async (data) => {
    return await addDoc(collection(db, "content_tourism"), data);
};

export const deleteTourismRoute = async (id) => {
    return await deleteDoc(doc(db, "content_tourism", id));
};

// Multimedia Items by Type
export const getMultimediaItems = async (type) => {
    const q = query(collection(db, "multimedia_items")); // Simplified for now, or use where() if needed
    const querySnapshot = await getDocs(q);
    const allItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return allItems.filter(item => item.type === type);
};
