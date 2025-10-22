'use client';

import { useState, useEffect } from 'react';
import type { AxiosRequestConfig } from 'axios';
import API from '../api/client';

export function useApi<T = any>(endpoint: string, config?: AxiosRequestConfig) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let cancel = false;

    const fetchData = async () => {
      try {
        const res = await API.request<T>({ url: endpoint, ...config });
        if (!cancel) setData(res.data);
      } catch (err) {
        if (!cancel) setError(err);
      } finally {
        if (!cancel) setLoading(false);
      }
    };

    fetchData();
    return () => { cancel = true; };
  }, [endpoint]);

  return { data, loading, error };
}
