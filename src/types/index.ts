export type ParamNullable<T> = {
  [P in keyof T]: T[P] | null;
};

export type ParamNonNullable<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};
