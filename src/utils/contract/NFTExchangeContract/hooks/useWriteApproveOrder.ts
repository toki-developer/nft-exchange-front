import { useCustomContractWrite } from "./useCustomContractWrite";

/**
 * @package
 */
export const useWriteApproveOrder = () => {
  return useCustomContractWrite("createOrder");
};
