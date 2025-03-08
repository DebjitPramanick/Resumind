import { useState } from "react";

type RequestStatus = "idle" | "pending" | "fulfilled" | "rejected";

export interface RequestState<T> {
  status: RequestStatus;
  data: T | null;
  error: Error | string | null;
  isIdle: boolean;
  isPending: boolean;
  isFulfilled: boolean;
  isRejected: boolean;
}

interface RequestStateHandler<T> {
  idle: () => void;
  pending: () => void;
  fulfilled: (data: T) => void;
  rejected: (error: Error | string) => void;
}

const useRequestState = <T = any>(): [
  RequestState<T>,
  RequestStateHandler<T>
] => {
  const [state, setState] = useState<RequestState<T>>({
    status: "idle",
    data: null,
    error: null,
    isIdle: true,
    isPending: false,
    isFulfilled: false,
    isRejected: false,
  });

  const handler: RequestStateHandler<T> = {
    idle: () => {
      setState({
        status: "idle",
        data: null,
        error: null,
        isIdle: true,
        isPending: false,
        isFulfilled: false,
        isRejected: false,
      });
    },

    pending: () => {
      setState({
        status: "pending",
        data: null,
        error: null,
        isIdle: false,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      });
    },

    fulfilled: (data: T) => {
      setState({
        status: "fulfilled",
        data,
        error: null,
        isIdle: false,
        isPending: false,
        isFulfilled: true,
        isRejected: false,
      });
    },

    rejected: (error: Error | string) => {
      setState({
        status: "rejected",
        data: null,
        error: error,
        isIdle: false,
        isPending: false,
        isFulfilled: false,
        isRejected: true,
      });
    },
  };

  return [state, handler];
};

export default useRequestState;
