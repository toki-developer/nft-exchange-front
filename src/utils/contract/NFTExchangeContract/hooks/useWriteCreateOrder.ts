import type { UsePrepareContractWriteConfig } from "./useCustomContractWrite";
import { useCustomContractWrite } from "./useCustomContractWrite";

/**
 * @package
 */
export const useWriteCreateOrder = (
  args: UsePrepareContractWriteConfig<"createOrder">["args"]
) => {
  return useCustomContractWrite({ functionName: "createOrder", args });
};
