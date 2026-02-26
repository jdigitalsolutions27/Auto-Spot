"use client";

import { create } from "zustand";

interface BookingDraft {
  serviceId?: string;
  packageId?: string;
  vehicleType?: string;
  make?: string;
  model?: string;
  year?: string;
  date?: string;
  slot?: string;
  name?: string;
  phone?: string;
  email?: string;
  notes?: string;
}

interface AppState {
  favorites: string[];
  comparisons: string[];
  bookingDraft: BookingDraft;
  toggleFavorite: (serviceId: string) => void;
  toggleComparison: (serviceId: string) => void;
  setBookingDraft: (data: Partial<BookingDraft>) => void;
  clearBookingDraft: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  favorites: [],
  comparisons: [],
  bookingDraft: {},
  toggleFavorite: (serviceId) =>
    set((state) => ({
      favorites: state.favorites.includes(serviceId)
        ? state.favorites.filter((id) => id !== serviceId)
        : [...state.favorites, serviceId],
    })),
  toggleComparison: (serviceId) =>
    set((state) => {
      const exists = state.comparisons.includes(serviceId);
      if (exists) {
        return { comparisons: state.comparisons.filter((id) => id !== serviceId) };
      }
      if (state.comparisons.length >= 3) {
        return { comparisons: [...state.comparisons.slice(1), serviceId] };
      }
      return { comparisons: [...state.comparisons, serviceId] };
    }),
  setBookingDraft: (data) =>
    set((state) => ({
      bookingDraft: {
        ...state.bookingDraft,
        ...data,
      },
    })),
  clearBookingDraft: () => set({ bookingDraft: {} }),
}));

