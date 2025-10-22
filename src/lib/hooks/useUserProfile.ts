'use client';

import { useState, useEffect } from 'react';
import { UserProfileAPI, DonationsAPI } from '../api';
import type { AxiosResponse } from 'axios';

export function useUserProfile(userId?: string) {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) { setLoading(false); return; }
    UserProfileAPI.getByUserId(userId)
      .then((res: AxiosResponse) => setData(res.data))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [userId]);

  return { data, loading };
}

export function useUserDonations(userId?: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) { setLoading(false); return; }
    DonationsAPI.getByUser(userId)
      .then((res: AxiosResponse) => setData(res.data))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, [userId]);

  return { data, loading };
}
