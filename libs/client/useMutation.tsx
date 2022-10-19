import { useState } from "react";

interface UseMutationStat<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

type UseMutationResult<T> = [(data: any) => void, UseMutationStat<T>];

export default function useMutation<T = any>(
  url: string
): UseMutationResult<T> {
  const [state, setState] = useState<UseMutationStat<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  const [loading, setLoading] = useState(false);
  // const [data, setData] = useState<undefined | any>(undefined);
  // const [error, setError] = useState<undefined | any>(undefined);

  function mutation(data: any) {
    setState((prev) => ({ ...prev, loading: true }));

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((data) => setState((prev) => ({ ...prev, data })))
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }

  return [mutation, { ...state }];
}
