declare type Nullable<T> = T | null

declare type Recordable<T> = Record<string, T>

declare type Partible<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

declare type ObjToKeyValArray<T> = { [K in keyof T]: [K, T[K]] }[keyof T]
