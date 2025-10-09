
"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface RecentlyViewedState {
  recentlyViewed: string[];
  addRecentlyViewed: (productId: string) => void;
}

export const useRecentlyViewed = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      recentlyViewed: [],
      addRecentlyViewed: (productId: string) => {
        const { recentlyViewed } = get();
        const newRecentlyViewed = [
          productId,
          ...recentlyViewed.filter((id) => id !== productId),
        ].slice(0, 10); // Keep only the last 10 viewed products
        set({ recentlyViewed: newRecentlyViewed });
      },
    }),
    {
      name: "shopstack-recently-viewed",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
