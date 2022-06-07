import { useState } from "react";

interface UseMutationState {
  loading: boolean;
  userData?: object;
  error?: object;
}

type UseMutationResult = [(data: object | undefined) => void, UseMutationState];

export default function useMutation(url: string): UseMutationResult {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(undefined);
  const [error, setError] = useState(undefined);

  function mutate(loginData: any) {
    setLoading(true);
    setUserData(loginData);
  }
  return [mutate, { loading, userData, error }];
}
