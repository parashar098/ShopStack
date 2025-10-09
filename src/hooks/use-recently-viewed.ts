
"use client";

import { useState, useEffect, useCallback } from 'react';

const RECENTLY_VIEWED_KEY = 'shopstack_recently_viewed';
const MAX_RECENTLY_VIEWED = 10;

export const useRecentlyViewed = () => {
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    try {
      const storedIds = localStorage.getItem(RECENTLY_VIEWED_KEY);
      if (storedIds) {
        setRecentlyViewedIds(JSON.parse(storedIds));
      }
    } catch (error) {
      console.error('Failed to parse recently viewed items from localStorage', error);
    }
    setIsInitialLoad(false);
  }, []);

  useEffect(() => {
    if (!isInitialLoad) {
      try {
        localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recentlyViewedIds));
      } catch (error) {
        console.error('Failed to save recently viewed items to localStorage', error);
      }
    }
  }, [recentlyViewedIds, isInitialLoad]);

  const addRecentlyViewed = useCallback((productId: string) => {
    setRecentlyViewedIds(prevIds => {
      const updatedIds = [productId, ...prevIds.filter(id => id !== productId)];
      return updatedIds.slice(0, MAX_RECENTLY_VIEWED);
    });
  }, []);

  return { recentlyViewedIds, addRecentlyViewed };
};
