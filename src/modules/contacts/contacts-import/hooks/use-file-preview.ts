'use client';

import { useEffect, useState } from 'react';
import { readFilePreview, type FilePreview } from '../utils/read-file-preview';

export function useFilePreview(file: File | null) {
  const [preview, setPreview] = useState<FilePreview | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!file) {
      setPreview(null);
      setError('');
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError('');

    readFilePreview(file)
      .then((result) => !cancelled && setPreview(result))
      .catch(() => {
        if (cancelled) return;
        setPreview(null);
        setError('Não foi possível ler o ficheiro.');
      })
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [file]);

  return { preview, loading, error };
}
