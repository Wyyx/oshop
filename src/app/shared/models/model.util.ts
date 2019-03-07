export interface UpdateStr<T> {
  id: string
  changes: Partial<T>
}

export interface UpdateNum<T> {
  id: number
  changes: Partial<T>
}

export declare type Update<T> = UpdateStr<T> | UpdateNum<T>
