import { Toaster } from "react-hot-toast";
import tailwindConfig from "tailwind.config";

/**
 * @package
 */
export const CustomToast = () => {
  const colors = tailwindConfig.theme?.extend?.colors as any;

  const primaryColor = colors?.primary as string;
  const textColor = colors.textcolor.main;

  return (
    <Toaster
      position="top-right"
      toastOptions={{ style: { background: primaryColor, color: textColor } }}
    />
  );
};
