/**
 * @package
 */
export const logalert = (message: string | Record<string, string>) => {
  const body = { message, ...moreInfo() };
  fetch("/api/logalert", { method: "POST", body: JSON.stringify(body) });
};

const moreInfo = () => {
  try {
    return { userAgent: navigator.userAgent };
  } catch {
    return {};
  }
};
