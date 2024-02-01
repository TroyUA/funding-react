export type Nullable<T> = T | null | undefined;
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & unknown;
