import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

import { useStatusCheck } from "./useStatusCheck";

export type Status = 1 | 2 | 3;
export const STATUS = { APPROVED: 1, NO_APPROVED: 2, ERRPR: 3 } as const;

const StatusContext = createContext<{
  status: Status;
  setStatus: Dispatch<SetStateAction<Status>>;
}>({ status: STATUS.ERRPR, setStatus: () => undefined });

/**
 * @package
 */
export const StatusContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [status, setStatus] = useState<Status>(STATUS.ERRPR);

  return (
    <StatusContext.Provider value={{ status, setStatus }}>
      <StatusCheck />
      {children}
    </StatusContext.Provider>
  );
};

const StatusCheck = () => {
  useStatusCheck();
  return null;
};

export const useStatusContext = () => {
  const { setStatus, status } = useContext(StatusContext);
  return { setStatus, status };
};
