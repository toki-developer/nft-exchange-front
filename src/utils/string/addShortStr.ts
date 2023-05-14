/**
 * @package
 */
export const addShortStr = (address: string) => {
  return address.replace(/(.{7}).*(.{7})/, "$1...$2");
};
