import type { UsePrepareContractWriteConfig } from "./useCustomContractWrite";
import { useCustomContractWrite } from "./useCustomContractWrite";
/**
 * @package
 */
export const useWriteApproveOrder = (
  args: UsePrepareContractWriteConfig<"approveOrder">["args"]
) => {
  return useCustomContractWrite({ functionName: "approveOrder", args });
};
